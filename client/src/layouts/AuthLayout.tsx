import Logo from "@/features/auth/components/logo";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  maxWidth?: string;
}

const AuthLayout = ({ children, maxWidth }: AuthLayoutProps) => {
  return (
    <div className="flex h-svh items-center justify-center p-2">
      <div className={`w-full ${maxWidth} flex flex-col gap-6`}>
        <Logo />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
