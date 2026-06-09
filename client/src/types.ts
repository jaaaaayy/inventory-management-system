export type TFormError = {
  message: string;
  errors?: Partial<
    Record<
      | "email"
      | "username"
      | "mobileNumber"
      | "stockKeepingUnit"
      | "costPrice"
      | "sellingPrice"
      | "category"
      | "vendor"
      | "orderDate"
      | "deliveryDate"
      | "expectedDate"
      | "notes",
      string
    >
  >;
};
