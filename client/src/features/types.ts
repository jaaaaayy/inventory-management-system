export type TFormError = {
  message: string;
  errors?: {
    [key: string]: string;
  };
};
