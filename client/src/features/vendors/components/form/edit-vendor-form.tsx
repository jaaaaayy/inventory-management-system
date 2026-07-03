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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { vendorFormSchema } from "../../schemas";
import { useUpdateVendor } from "../../services/mutations";
import { TVendor, TVendorFormSchema } from "../../types";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Vendor Information</CardTitle>
            <CardDescription>
              How to reach this supplier.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid items-start gap-6 md:grid-cols-2">
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
                <Input
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
              <FormLabel>Mobile Number</FormLabel>
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
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
            <CardDescription>
              Where this vendor is located.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid items-start gap-6 md:grid-cols-2">
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
          </CardContent>
        </Card>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" asChild>
            <Link to="/vendors">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditVendorForm;
