import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <header className="bg-background sticky top-0 z-10 min-h-14 lg:min-h-16 border-b flex items-center p-4 lg:px-6">
      <SidebarTrigger />
      <Separator
        orientation="vertical"
        className="mx-2 data-[orientation=vertical]:h-4"
      />
      {children}
    </header>
  );
};

export default Header;
