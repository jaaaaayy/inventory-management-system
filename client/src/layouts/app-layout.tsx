import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="grow flex flex-col h-screen">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default AppLayout;
