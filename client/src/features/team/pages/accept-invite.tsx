import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "@/layouts/auth-layout";
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
import { Button } from "@/components/ui/button";
import InputError from "@/components/input-error";
import Loading from "@/components/loading";
import { acceptInviteFormSchema } from "../schemas";
import { TAcceptInviteFormSchema, TTeamFormError } from "../types";
import { useFetchInvitationByToken } from "../services/queries";
import { useAcceptInvitation } from "../services/mutations";

const AcceptInvite = () => {
  const { token } = useParams();
  const [formError, setFormError] = useState<TTeamFormError | null>(null);

  const {
    isLoading,
    isPending,
    isError,
    error,
    data,
  } = useFetchInvitationByToken(token);

  const form = useForm<TAcceptInviteFormSchema>({
    resolver: zodResolver(acceptInviteFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      username: "",
      password: "",
    },
  });

  const { mutateAsync: acceptMutation, isPending: isAccepting } =
    useAcceptInvitation(token, setFormError);

  const onSubmit = async (values: TAcceptInviteFormSchema) => {
    setFormError(null);
    await acceptMutation(values);
  };

  if (isLoading || isPending) {
    return (
      <AuthLayout maxWidth="max-w-[500px]">
        <div className="flex justify-center">
          <Loading />
        </div>
      </AuthLayout>
    );
  }

  if (isError) {
    return (
      <AuthLayout maxWidth="max-w-[500px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Invitation unavailable</CardTitle>
            <CardDescription>
              {(error as TTeamFormError)?.message ??
                "This invitation is invalid or has expired."}
            </CardDescription>
          </CardHeader>
        </Card>
      </AuthLayout>
    );
  }

  const invitation = data.invitation;

  return (
    <AuthLayout maxWidth="max-w-[600px]">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Join {invitation.organization}
          </CardTitle>
          <CardDescription>
            You were invited as {invitation.position} ({invitation.email}). Set
            up your account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="grid gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="grid md:grid-cols-2 items-start gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your first name"
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
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your last name"
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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel data-error={!!formError?.errors?.username}>
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your username"
                          {...field}
                          autoComplete="off"
                          required
                          aria-invalid={!!formError?.errors?.username}
                        />
                      </FormControl>
                      <FormMessage />
                      <InputError message={formError?.errors?.username} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isAccepting}>
                {isAccepting ? "Joining..." : "Join organization"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default AcceptInvite;
