import { useForm } from "react-hook-form";
import { TRegisterFormSchema } from "../../types";
import { registerFormSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../../services/mutations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Link } from "react-router";
import { TFormError } from "@/types";
import { useState } from "react";
import InputError from "@/components/input-error";

const RegisterForm = () => {
  const [formError, setFormError] = useState<TFormError | null>(null);
  const form = useForm<TRegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      username: "",
      password: "",
    },
  });

  const { mutateAsync: registerMutation, isPending } = useRegister(
    form.reset,
    setFormError,
    form.setFocus
  );

  const onSubmit = async (values: TRegisterFormSchema) => {
    await registerMutation(values);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid gap-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                  <FormItem>
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
            <Button type="submit" disabled={isPending}>
              {isPending ? "Registering..." : "Register"}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
