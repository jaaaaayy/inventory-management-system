import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { ReactNode } from "react";

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <header className="min-h-14 lg:min-h-16 border-b flex items-center justify-between p-2 lg:px-4">
      <div className="flex items-center">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {children}
      </div>
      <ModeToggle />
    </header>
  );
};

export default Header;
