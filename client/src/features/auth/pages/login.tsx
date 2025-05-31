import AuthLayout from "@/layouts/auth-layout";
import LoginForm from "../components/form/login-form";

const Login = () => {
  return (
    <AuthLayout maxWidth="max-w-[400px]">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
