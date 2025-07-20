import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { useState } from "react";
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

  const { data: categoryData, isLoading: categoryIsLoading } =
    useFetchCategoryList();
  const { data: vendorData, isLoading: vendorIsLoading } = useFetchVendorList();

  const form = useForm<TProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      stockKeepingUnit: "",
      costPrice: 0,
      sellingPrice: 0,
      unit: "",
      category: "",
      quantity: 0,
      vendor: "",
      image: null,
    },
  });

  const handleImageChange = (file: File | null) => {
    if (file) {
      // Update form field
      form.setValue("image", file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      form.setValue("image", null);
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

      // Update the file input
      const fileInput = document.getElementById(
        "file-upload"
      ) as HTMLInputElement;
      if (fileInput) {
        // Create a new FileList-like object
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
    formData.append("costPrice", values.costPrice.toString());
    formData.append("sellingPrice", values.sellingPrice.toString());
    formData.append("unit", values.unit);
    formData.append("quantity", values.quantity.toString());
    formData.append("category", values.category);
    formData.append("vendor", values.vendor);

    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      formData.append("image", fileInput.files[0]);
    }

    await createproductMutation(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-6 items-start">
          <div className="space-y-6">
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
                    />
                  </FormControl>
                  <FormMessage />
                  <InputError message={formError?.errors?.stockKeepingUnit} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="costPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter the cost price"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sellingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selling Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter the selling price"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <div
                    className={cn(
                      "size-60 border-2 border-dashed transition-colors rounded-md flex items-center justify-center cursor-pointer",
                      isDragOver
                        ? "border-primary bg-primary/5"
                        : "hover:border-ring/50"
                    )}
                    onClick={() => {
                      const fileInput = document.getElementById(
                        "file-upload"
                      ) as HTMLInputElement;
                      fileInput?.click();
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    {imagePreview ? (
                      <div className="relative size-full">
                        <img
                          src={imagePreview}
                          alt="Product preview"
                          className="size-full object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImageChange(null);
                            const fileInput = document.getElementById(
                              "file-upload"
                            ) as HTMLInputElement;
                            if (fileInput) {
                              fileInput.value = "";
                            }
                          }}
                        >
                          <X />
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center">
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
                          Supports: JPG, PNG, GIF, WebP (max 5MB)
                        </p>
                      </div>
                    )}
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
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
        </div>
        <div className="grid grid-cols-2 gap-6">
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
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
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
                        className="justify-between"
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
                                  value={category._id}
                                  onSelect={(currentValue) => {
                                    setSelectedCategory(
                                      currentValue === selectedCategory?._id
                                        ? null
                                        : category
                                    );
                                    setOpenCategoryDropdown(false);
                                    field.onChange(currentValue);
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      selectedCategory?.name === category.name
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
              </FormItem>
            )}
          />
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
                                value={vendor._id}
                                onSelect={(currentValue) => {
                                  setSelectedVendor(
                                    currentValue === selectedVendor?._id
                                      ? null
                                      : vendor
                                  );
                                  setOpenVendorDropdown(false);
                                  field.onChange(currentValue);
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
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateProductForm;
