import { Link } from "react-router-dom";
import TableContainer from "@/components/table-container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { purchaseOrderFormSchema } from "../../schemas";
import { TPurchaseOrderFormSchema } from "../../types";
import { useCreatePurchaseOrder } from "../../services/mutations";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { TVendor } from "@/features/vendors/types";
import { useFetchVendorList } from "@/features/vendors/services/queries";
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
import { Textarea } from "@/components/ui/textarea";
import { TFormError } from "@/types";
import InputError from "@/components/input-error";
import { getImageUrl } from "@/lib/images";

const CreatePurchaseOrderForm = () => {
  const [formError, setFormError] = useState<TFormError | null>(null);
  const [openExpectedDatePicker, setOpenExpectedDatePicker] = useState(false);
  const [openOrderDatePicker, setOpenOrderDatePicker] = useState(false);
  const [openProductDropdownIndex, setOpenProductDropdownIndex] = useState<
    number | null
  >(null);
  const [openVendorDropdown, setOpenVendorDropdown] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<TVendor | null>(null);

  const { data: productData, isLoading: productIsLoading } =
    useFetchProductList();
  const { data: vendorData, isLoading: vendorIsLoading } = useFetchVendorList();

  const form = useForm<TPurchaseOrderFormSchema>({
    resolver: zodResolver(purchaseOrderFormSchema),
    defaultValues: {
      vendor: "",
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

  const { mutateAsync: createPurchaseOrderMutation, isPending } =
    useCreatePurchaseOrder(form.reset, setFormError, form.setFocus);

  const onSubmit = async (values: TPurchaseOrderFormSchema) => {
    await createPurchaseOrderMutation(values);
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
      const price = product?.costPrice ?? 0;
      return accumulator + Number(item?.quantity || 0) * Number(price);
    },
    0
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>
              Vendor, dates, and notes for this order.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid items-start gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="vendor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor</FormLabel>
                <FormControl>
                  <Popover
                    open={openVendorDropdown}
                    onOpenChange={setOpenVendorDropdown}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openVendorDropdown}
                        className="justify-between"
                      >
                        {selectedVendor
                          ? selectedVendor.name
                          : "Select vendor..."}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                      <Command>
                        <CommandInput placeholder="Search vendor..." />
                        <CommandList>
                          <CommandEmpty>
                            {vendorIsLoading
                              ? "Loading vendors..."
                              : "No vendor found."}
                          </CommandEmpty>
                          <CommandGroup>
                            {vendorData?.vendors?.map((vendor: TVendor) => (
                              <CommandItem
                                key={vendor._id}
                                value={vendor.name}
                                onSelect={(currentValue) => {
                                  setSelectedVendor(
                                    currentValue === selectedVendor?._id
                                      ? null
                                      : vendor
                                  );
                                  setOpenVendorDropdown(false);
                                  field.onChange(vendor._id);
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedVendor?.name === vendor.name
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {vendor.name}
                              </CommandItem>
                            ))}
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
            name="expectedDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expected Date</FormLabel>
                <FormControl>
                  <Popover
                    open={openExpectedDatePicker}
                    onOpenChange={setOpenExpectedDatePicker}
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
                          setOpenExpectedDatePicker(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
                <InputError message={formError?.errors?.expectedDate} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Optional notes for this purchase order..."
                    className="resize-none"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
                <InputError message={formError?.errors?.notes} />
              </FormItem>
            )}
          />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Line Items</CardTitle>
            <CardDescription>
              Products included in this order.
            </CardDescription>
            <CardAction>
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ product: "", quantity: 1 })}
              >
                <Plus />
                Add New Row
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-4">
          <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Amount</TableHead>
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
                  quantity * Number(selectedProduct?.costPrice ?? 0);

                return (
                  <TableRow key={fieldItem.id}>
                    <TableCell className="p-0">
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
                                          src={getImageUrl(
                                            selectedProduct.imageUrl
                                          )}
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
                                              value={product.name}
                                              onSelect={() => {
                                                field.onChange(product._id);
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
                    <TableCell className="p-0">
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
                    <TableCell className="p-0">
                      <div className="p-2 text-right tabular-nums">
                        {amount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="p-0">
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
          </TableContainer>
          <div className="ml-auto flex w-full max-w-xs items-center justify-between font-medium">
            <span className="flex items-center gap-1">
              Total (<PhilippinePeso className="size-4" />)
            </span>
            <span className="tabular-nums">
              {subtotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          </CardContent>
        </Card>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" asChild>
            <Link to="/purchase/orders">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePurchaseOrderForm;
