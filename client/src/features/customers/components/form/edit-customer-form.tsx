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
import { customerFormSchema } from "../../schemas";
import { useUpdateCustomer } from "../../services/mutations";
import { TCustomer, TCustomerFormSchema } from "../../types";
import { useState } from "react";
import { TFormError } from "@/types";
import InputError from "@/components/input-error";

const EditCustomerForm = ({ customer }: { customer: TCustomer }) => {
  const [formError, setFormError] = useState<TFormError | null>(null);
  const form = useForm<TCustomerFormSchema>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      mobileNumber: customer.mobileNumber,
      address: {
        addressLine1: customer.address.addressLine1,
        addressLine2: customer.address.addressLine2,
        city: customer.address.city,
        province: customer.address.province,
        postalCode: customer.address.postalCode,
      },
    },
  });

  const { mutateAsync: updateCustomerMutation, isPending } = useUpdateCustomer(
    form.reset,
    setFormError,
    form.setFocus,
    customer._id
  );

  const onSubmit = async (values: TCustomerFormSchema) => {
    await updateCustomerMutation(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 items-start gap-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the first name"
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the last name"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel data-error={!!formError?.errors?.email}>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    autoComplete="off"
                    required
                    aria-invalid={!!formError?.errors?.email}
                  />
                </FormControl>
                <FormMessage />
                <InputError message={formError?.errors?.email} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel data-error={!!formError?.errors?.mobileNumber}>
                  Mobile Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your mobile number"
                    {...field}
                    autoComplete="off"
                    required
                    aria-invalid={!!formError?.errors?.mobileNumber}
                  />
                </FormControl>
                <FormMessage />
                <InputError message={formError?.errors?.mobileNumber} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address.addressLine1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the address line 1"
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
            name="address.addressLine2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 2 (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the address line 2"
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
            name="address.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the city"
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
            name="address.province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the province"
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
            name="address.postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the postal code"
                    {...field}
                    autoComplete="off"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditCustomerForm;
