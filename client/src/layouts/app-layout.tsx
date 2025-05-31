import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default AppLayout;
