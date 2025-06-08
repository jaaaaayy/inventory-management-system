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
import { vendorFormSchema } from "../../schemas";
import { TVendor, TVendorFormSchema } from "../../types";
import { useUpdateVendor } from "../../services/mutations";
import { Textarea } from "@/components/ui/textarea";

const EditVendorForm = ({ vendor }: { vendor: TVendor }) => {
  const form = useForm<TVendorFormSchema>({
    resolver: zodResolver(vendorFormSchema),
    defaultValues: {
      name: vendor.name,
      email: vendor.email,
      mobileNumber: vendor.mobileNumber,
      address: {
        addressLine1: vendor.address.addressLine1,
        addressLine2: vendor.address.addressLine2,
        city: vendor.address.city,
        province: vendor.address.province,
        postalCode: vendor.address.postalCode,
      },
    },
  });

  const { mutateAsync: updateVendorMutation, isPending } = useUpdateVendor(
    form.reset,
    vendor._id
  );

  const onSubmit = async (values: TVendorFormSchema) => {
    await updateVendorMutation(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6 items-start"
      >
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the email"
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
          name="mobileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the mobile number"
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
          name="address.addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address line 1</FormLabel>
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
              <FormLabel>Address line 2 (optional)</FormLabel>
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
              <FormLabel>Postal code</FormLabel>
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
        <div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditVendorForm;
