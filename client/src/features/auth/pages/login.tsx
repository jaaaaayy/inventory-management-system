import AuthLayout from "@/layouts/AuthLayout";
import LoginForm from "../components/login-form";

const Login = () => {
  return (
    <AuthLayout maxWidth="max-w-sm">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
