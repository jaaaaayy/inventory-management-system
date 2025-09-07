import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { salesOrderFormSchema } from "../../schemas";
import { TSalesOrderFormSchema } from "../../types";
import { useCreateSalesOrder } from "../../services/mutations";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { TCustomer } from "@/features/customers/types";
import { useFetchCustomerList } from "@/features/customers/services/queries";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  PhilippinePeso,
  Plus,
  Trash,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TProduct } from "@/features/products/types";
import { useFetchProductList } from "@/features/products/services/queries";
import { Input } from "@/components/ui/input";
import { TFormError } from "@/types";
import InputError from "@/components/input-error";

const API_URL = import.meta.env.VITE_API_URL;

const CreateSalesOrderForm = () => {
  const [formError, setFormError] = useState<TFormError | null>(null);
  const [openDeliveryDatePicker, setOpenDeliveryDatePicker] = useState(false);
  const [openOrderDatePicker, setOpenOrderDatePicker] = useState(false);
  const [openProductDropdownIndex, setOpenProductDropdownIndex] = useState<
    number | null
  >(null);
  const [openCustomerDropdown, setOpenCustomerDropdown] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<TCustomer | null>(
    null
  );

  const { data: productData, isLoading: productIsLoading } =
    useFetchProductList();
  const { data: customerData, isLoading: customerIsLoading } =
    useFetchCustomerList();

  const form = useForm<TSalesOrderFormSchema>({
    resolver: zodResolver(salesOrderFormSchema),
    defaultValues: {
      customer: "",
      items: [
        {
          product: "",
          quantity: 1,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const { mutateAsync: createSalesOrderMutation, isPending } =
    useCreateSalesOrder(form.reset, setFormError, form.setFocus);

  const onSubmit = async (values: TSalesOrderFormSchema) => {
    await createSalesOrderMutation(values);
  };

  const watchedItems = form.watch("items") || [];
  const subtotal = watchedItems.reduce(
    (
      accumulator: number,
      item: {
        product: string;
        quantity: number;
      }
    ) => {
      const product = productData?.products?.find(
        (p: TProduct) => p._id === item.product
      );
      const price = product?.sellingPrice ?? 0;
      return accumulator + Number(item?.quantity || 0) * Number(price);
    },
    0
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="w-1/2 mr-6 space-y-6">
          <FormField
            control={form.control}
            name="customer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customer</FormLabel>
                <FormControl>
                  <Popover
                    open={openCustomerDropdown}
                    onOpenChange={setOpenCustomerDropdown}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openCustomerDropdown}
                        className="justify-between"
                      >
                        {selectedCustomer
                          ? selectedCustomer.firstName +
                            " " +
                            selectedCustomer.lastName
                          : "Select customer..."}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                      <Command>
                        <CommandInput placeholder="Search customer..." />
                        <CommandList>
                          <CommandEmpty>
                            {customerIsLoading
                              ? "Loading customers..."
                              : "No customer found."}
                          </CommandEmpty>
                          <CommandGroup>
                            {customerData?.customers?.map(
                              (customer: TCustomer) => (
                                <CommandItem
                                  key={customer._id}
                                  value={customer._id}
                                  onSelect={(currentValue) => {
                                    setSelectedCustomer(
                                      currentValue === selectedCustomer?._id
                                        ? null
                                        : customer
                                    );
                                    setOpenCustomerDropdown(false);
                                    field.onChange(currentValue);
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      selectedCustomer?.firstName ===
                                        customer.firstName &&
                                        selectedCustomer?.lastName ===
                                          customer.lastName
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {customer.firstName} {customer.lastName}
                                </CommandItem>
                              )
                            )}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="orderDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order Date</FormLabel>
                <FormControl>
                  <Popover
                    open={openOrderDatePicker}
                    onOpenChange={setOpenOrderDatePicker}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="justify-between font-normal"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpenOrderDatePicker(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
                <InputError message={formError?.errors?.orderDate} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deliveryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Date</FormLabel>
                <FormControl>
                  <Popover
                    open={openDeliveryDatePicker}
                    onOpenChange={setOpenDeliveryDatePicker}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="justify-between font-normal"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpenDeliveryDatePicker(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
                <InputError message={formError?.errors?.deliveryDate} />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="font-medium">Line Items</h1>
            <Button
              type="button"
              variant="secondary"
              onClick={() => append({ product: "", quantity: 1 })}
            >
              <Plus />
              Add New Row
            </Button>
          </div>
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead className="border">Item</TableHead>
                <TableHead className="border">Quantity</TableHead>
                <TableHead className="border">Amount</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((fieldItem, index) => {
                const productFieldName = `items.${index}.product` as const;
                const quantityFieldName = `items.${index}.quantity` as const;

                const productId = form.watch(productFieldName);
                const selectedProduct = productData?.products?.find(
                  (p: TProduct) => p._id === productId
                );
                const quantity = Number(form.watch(quantityFieldName) || 0);
                const amount =
                  quantity * Number(selectedProduct?.sellingPrice ?? 0);

                return (
                  <TableRow key={fieldItem.id}>
                    <TableCell className="p-0 border">
                      <FormField
                        control={form.control}
                        name={productFieldName}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Popover
                                open={openProductDropdownIndex === index}
                                onOpenChange={(open) =>
                                  setOpenProductDropdownIndex(
                                    open ? index : null
                                  )
                                }
                              >
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={
                                      openProductDropdownIndex === index
                                    }
                                    className="justify-between border-none shadow-none !px-2 h-auto !bg-transparent hover:!bg-transparent"
                                  >
                                    {selectedProduct ? (
                                      <div className="flex items-center gap-2">
                                        <img
                                          className="size-8 rounded object-cover"
                                          src={`${API_URL}${selectedProduct.imageUrl}`}
                                          alt={selectedProduct.name}
                                        />
                                        <span>{selectedProduct.name}</span>
                                      </div>
                                    ) : (
                                      "Select product..."
                                    )}
                                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                                  <Command>
                                    <CommandInput placeholder="Search product..." />
                                    <CommandList>
                                      <CommandEmpty>
                                        {productIsLoading
                                          ? "Loading products..."
                                          : "No product found."}
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {productData?.products?.map(
                                          (product: TProduct) => (
                                            <CommandItem
                                              key={product._id}
                                              value={product._id}
                                              onSelect={(currentValue) => {
                                                field.onChange(currentValue);
                                                setOpenProductDropdownIndex(
                                                  null
                                                );
                                              }}
                                            >
                                              <CheckIcon
                                                className={cn(
                                                  "mr-2 h-4 w-4",
                                                  selectedProduct?.name ===
                                                    product.name
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                                )}
                                              />
                                              {product.name}
                                            </CommandItem>
                                          )
                                        )}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell className="p-0 border">
                      <FormField
                        control={form.control}
                        name={quantityFieldName}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                className="border-none focus-visible:ring-0 shadow-none p-2 !bg-transparent hover:!bg-transparent"
                                {...field}
                                autoComplete="off"
                                required
                                min={1}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell className="p-0 border">
                      <div className="p-2 text-right tabular-nums">
                        {amount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="p-0 border">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => remove(index)}
                          disabled={fields.length === 1}
                        >
                          <Trash
                            className={`!disabled:pointer-events-none disabled:opacity-50 size-4 text-muted-foreground ${
                              fields.length !== 1 && "hover:text-destructive/90"
                            }`}
                          />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="text-sm font-medium flex gap-2">
            <span className="flex items-center">
              Total (<PhilippinePeso className="size-4" />
              ):{" "}
            </span>
            <span className="tabular-nums">
              {subtotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateSalesOrderForm;
