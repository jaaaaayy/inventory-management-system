import { useForm } from "react-hook-form";
import { TRegisterFormSchema } from "../../types";
import { registerFormSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../../server/mutations";

const RegisterForm = () => {
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

  const { mutateAsync: registerMutation, isPending } = useRegister(form.reset);

  const onSubmit = async (values: TRegisterFormSchema) => {
    await registerMutation(values);
  };

  return <div>RegisterForm</div>;
};

export default RegisterForm;
