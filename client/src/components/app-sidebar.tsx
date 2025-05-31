import {
  ChevronDown,
  ChevronUp,
  Folder,
  Home,
  Package,
  Package2,
  ShoppingCart,
  Store,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { NavUser } from "./nav-user";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "./ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Products",
      url: "/products",
      icon: Package,
    },
    {
      title: "Sales",
      url: "/sales",
      icon: ShoppingCart,
      items: [
        {
          title: "Customers",
          url: "/sales/customers",
        },
        {
          title: "Sales Orders",
          url: "/sales/orders",
        },
      ],
    },
    {
      title: "Categories",
      url: "/categories",
      icon: Folder,
    },
    {
      title: "Vendors",
      url: "/vendors",
      icon: Store,
    },
  ],
};

const AppSidebar = () => {
  const location = useLocation();
  const { state } = useSidebar();

  const isActive = (url: string) => location.pathname.startsWith(url);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 px-3 justify-center">
        <Link to={"/dashboard"} className="flex items-center gap-2">
          <Package2 className="shrink-0" />
          {state !== "collapsed" && (
            <span className="text-2xl font-bold overflow-hidden">IMS</span>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) =>
                item.items?.length ? (
                  <Collapsible key={item.title} className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon />
                          {item.title}
                          <ChevronDown className="ml-auto group-data-[state=open]/collapsible:hidden" />
                          <ChevronUp className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((item) => (
                            <SidebarMenuSubItem key={item.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActive(item.url)}
                              >
                                <Link to={item.url}>{item.title}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenu key={item.title}>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive(item.url)}>
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
