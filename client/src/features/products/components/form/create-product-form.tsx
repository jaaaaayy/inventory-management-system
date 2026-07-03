import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productFormSchema } from "../../schemas";
import { TProductFormSchema } from "../../types";
import { useCreateProduct } from "../../services/mutations";
import { CheckIcon, ChevronsUpDownIcon, UploadIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRef, useState } from "react";
import { useFetchCategoryList } from "@/features/categories/services/queries";
import { useFetchVendorList } from "@/features/vendors/services/queries";
import { TCategory } from "@/features/categories/types";
import { TVendor } from "@/features/vendors/types";
import { TFormError } from "@/types";
import InputError from "@/components/input-error";

const CreateProductForm = () => {
  const [formError, setFormError] = useState<TFormError | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
  const [openVendorDropdown, setOpenVendorDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null
  );
  const [selectedVendor, setSelectedVendor] = useState<TVendor | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: categoryData, isLoading: categoryIsLoading } =
    useFetchCategoryList();
  const { data: vendorData, isLoading: vendorIsLoading } = useFetchVendorList();

  const form = useForm<TProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      stockKeepingUnit: "",
      description: "",
      costPrice: 0,
      sellingPrice: 0,
      unit: "",
      reorderPoint: 10,
      category: "",
      quantity: 0,
      vendor: "",
    },
  });

  const handleImageChange = (file: File | null) => {
    if (file) {
      form.setValue("image", file, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      void form.trigger("image");

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      form.setValue("image", undefined as unknown as File, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      void form.trigger("image");
      setImagePreview(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      handleImageChange(file);

      const fileInput = fileInputRef.current;
      if (fileInput) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;
      }
    }
  };

  const { mutateAsync: createproductMutation, isPending } = useCreateProduct(
    form.reset,
    setFormError,
    form.setFocus
  );

  const onSubmit = async (values: TProductFormSchema) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("stockKeepingUnit", values.stockKeepingUnit);
    formData.append("description", values.description ?? "");
    formData.append("costPrice", values.costPrice.toString());
    formData.append("sellingPrice", values.sellingPrice.toString());
    formData.append("unit", values.unit);
    formData.append("reorderPoint", values.reorderPoint.toString());
    formData.append("quantity", values.quantity.toString());
    formData.append("category", values.category);
    formData.append("vendor", values.vendor);

    const fileInput = fileInputRef.current;
    if (fileInput?.files?.[0]) {
      formData.append("image", fileInput.files[0]);
    }

    await createproductMutation(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid items-start gap-4 xl:grid-cols-3">
          <div className="space-y-4 xl:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>General</CardTitle>
                <CardDescription>
                  Basic details that identify this product.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid items-start gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the name"
                            {...field}
                            autoComplete="off"
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stockKeepingUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Keeping Unit</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter the stock keeping unit"
                            {...field}
                            autoComplete="off"
                            required
                          />
                        </FormControl>
                        <FormMessage />
                        <InputError
                          message={formError?.errors?.stockKeepingUnit}
                        />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter the description"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>
                  What this product costs and sells for.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid items-start gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="costPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel data-error={!!formError?.errors?.costPrice}>
                        Cost Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter the cost price"
                          {...field}
                          autoComplete="off"
                          required
                          aria-invalid={!!formError?.errors?.costPrice}
                        />
                      </FormControl>
                      <FormMessage />
                      <InputError message={formError?.errors?.costPrice} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sellingPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel data-error={!!formError?.errors?.sellingPrice}>
                        Selling Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter the selling price"
                          {...field}
                          autoComplete="off"
                          required
                          aria-invalid={!!formError?.errors?.sellingPrice}
                        />
                      </FormControl>
                      <FormMessage />
                      <InputError message={formError?.errors?.sellingPrice} />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
                <CardDescription>
                  Stock levels and reorder settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid items-start gap-6 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the unit"
                          {...field}
                          autoComplete="off"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter the quantity"
                          {...field}
                          autoComplete="off"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reorderPoint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reorder Point</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter the reorder point"
                          {...field}
                          autoComplete="off"
                          required
                          min={0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Image</CardTitle>
                <CardDescription>
                  A photo shown in lists and detail pages.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <div
                          className={cn(
                            "flex aspect-square w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed transition-colors",
                            isDragOver
                              ? "border-primary bg-primary/5"
                              : "hover:border-ring/50"
                          )}
                          onClick={() => fileInputRef.current?.click()}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                        >
                          {imagePreview ? (
                            <div className="relative size-full">
                              <img
                                src={imagePreview}
                                alt="Product preview"
                                className="size-full rounded-md object-cover"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleImageChange(null);
                                  if (fileInputRef.current) {
                                    fileInputRef.current.value = "";
                                  }
                                }}
                              >
                                <X />
                              </Button>
                            </div>
                          ) : (
                            <div className="p-4 text-center">
                              <UploadIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                              <div className="mt-4 font-medium">
                                {isDragOver
                                  ? "Drop your image here"
                                  : "Drop files to upload"}
                              </div>
                              <p className="mt-2 text-sm text-muted-foreground">
                                or click to select files
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                Supports: JPG, PNG (max 5MB)
                              </p>
                            </div>
                          )}
                          <input
                            ref={fileInputRef}
                            id="file-upload"
                            type="file"
                            accept="image/jpeg,image/jpg,image/png"
                            className="sr-only"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              handleImageChange(file || null);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Associations</CardTitle>
                <CardDescription>
                  Category and vendor for this product.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel data-error={!!formError?.errors?.category}>
                        Category
                      </FormLabel>
                      <FormControl>
                        <Popover
                          open={openCategoryDropdown}
                          onOpenChange={setOpenCategoryDropdown}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openCategoryDropdown}
                              className="w-full justify-between"
                            >
                              {selectedCategory
                                ? selectedCategory.name
                                : "Select category..."}
                              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                            <Command>
                              <CommandInput placeholder="Search category..." />
                              <CommandList>
                                <CommandEmpty>
                                  {categoryIsLoading
                                    ? "Loading categories..."
                                    : "No category found."}
                                </CommandEmpty>
                                <CommandGroup>
                                  {categoryData?.categories?.map(
                                    (category: TCategory) => (
                                      <CommandItem
                                        key={category._id}
                                        value={category.name}
                                        onSelect={(currentValue) => {
                                          setSelectedCategory(
                                            currentValue ===
                                              selectedCategory?._id
                                              ? null
                                              : category
                                          );
                                          field.onChange(category._id);
                                          setOpenCategoryDropdown(false);
                                          void form.trigger("category");
                                        }}
                                      >
                                        <CheckIcon
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedCategory?.name ===
                                              category.name
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                        {category.name}
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
                      <InputError message={formError?.errors?.category} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vendor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel data-error={!!formError?.errors?.vendor}>
                        Vendor
                      </FormLabel>
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
                              className="w-full justify-between"
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
                                  {vendorData?.vendors?.map(
                                    (vendor: TVendor) => (
                                      <CommandItem
                                        key={vendor._id}
                                        value={vendor.name}
                                        onSelect={(currentValue) => {
                                          setSelectedVendor(
                                            currentValue ===
                                              selectedVendor?._id
                                              ? null
                                              : vendor
                                          );
                                          field.onChange(vendor._id);
                                          setOpenVendorDropdown(false);
                                          void form.trigger("vendor");
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
                                    )
                                  )}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                      <InputError message={formError?.errors?.vendor} />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" asChild>
            <Link to="/products">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateProductForm;
