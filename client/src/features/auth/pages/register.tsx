import AuthLayout from "@/layouts/auth-layout";
import RegisterForm from "../components/form/register-form";

const Register = () => {
  return (
    <AuthLayout maxWidth="max-w-[800px]">
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
