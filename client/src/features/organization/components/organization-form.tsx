import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Error from "@/components/error";
import Loading from "@/components/loading";
import { usePermissions } from "@/hooks/use-has-permission";
import { useFetchOrganization } from "../services/queries";
import { useUpdateOrganization } from "../services/mutations";
import { organizationFormSchema } from "../schemas";
import { TOrganizationFormSchema } from "../types";

const OrganizationForm = () => {
  const { can } = usePermissions();
  const canEdit = can("organization:update");
  const { isLoading, isPending, isError, error, data } = useFetchOrganization();
  const { mutateAsync: updateOrganizationMutation, isPending: isSaving } =
    useUpdateOrganization();

  const form = useForm<TOrganizationFormSchema>({
    resolver: zodResolver(organizationFormSchema),
    values: { name: data?.organization?.name ?? "" },
  });

  if (isError && error) {
    return <Error message={error.message} />;
  }

  if (isLoading || isPending) {
    return <Loading feature="organization" />;
  }

  const onSubmit = async (values: TOrganizationFormSchema) => {
    await updateOrganizationMutation(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid max-w-md gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization name</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="off" disabled={!canEdit} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {canEdit && (
          <div>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};

export default OrganizationForm;
