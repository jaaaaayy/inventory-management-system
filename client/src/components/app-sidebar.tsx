import {
  ChevronDown,
  ChevronUp,
  Folder,
  Home,
  Package,
  Package2,
  ShoppingCart,
  ShoppingBag,
  FileText,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { NavUser } from "./nav-user";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
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
  SidebarRail,
  useSidebar,
} from "./ui/sidebar";
import { useUser } from "@/hooks/use-user";
import { usePermissions } from "@/hooks/use-has-permission";

type NavSubItem = { title: string; url: string; permission?: string };

type NavItem = {
  title: string;
  url: string;
  icon: typeof Home;
  permission?: string;
  items?: NavSubItem[];
};

const navMain: NavItem[] = [
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
    title: "Categories",
    url: "/categories",
    icon: Folder,
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
    title: "Purchases",
    url: "/purchase",
    icon: ShoppingBag,
    items: [
      {
        title: "Vendors",
        url: "/vendors",
      },
      {
        title: "Purchase Orders",
        url: "/purchase/orders",
      },
    ],
  },
  {
    title: "Reports",
    url: "/reports",
    icon: FileText,
  },
];

const AppSidebar = () => {
  const { user } = useUser();
  const { can } = usePermissions();
  const location = useLocation();
  const { state } = useSidebar();

  const isActive = (url: string) => location.pathname.startsWith(url);

  const navItems = navMain
    .map((item) =>
      item.items
        ? {
            ...item,
            items: item.items.filter(
              (subItem) => !subItem.permission || can(subItem.permission)
            ),
          }
        : item
    )
    .filter((item) =>
      item.items
        ? item.items.length > 0
        : !item.permission || can(item.permission)
    );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 lg:h-16 px-3 justify-center">
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
              {navItems.map((item) =>
                item.items?.length ? (
                  state === "collapsed" ? (
                    <SidebarMenuItem key={item.title}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            isActive={item.items.some((subItem) =>
                              isActive(subItem.url)
                            )}
                            className="w-full"
                          >
                            <item.icon />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          side="right"
                          align="start"
                          className="w-48 space-y-1"
                        >
                          {item.items.map((subItem) => (
                            <DropdownMenuItem key={subItem.title} asChild>
                              <Link
                                to={subItem.url}
                                className={`w-full ${
                                  isActive(subItem.url) ? "bg-accent" : ""
                                }`}
                              >
                                {subItem.title}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </SidebarMenuItem>
                  ) : (
                    <Collapsible
                      key={item.title}
                      defaultOpen={item.items.some((subItem) =>
                        isActive(subItem.url)
                      )}
                      className="group/collapsible"
                    >
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
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isActive(subItem.url)}
                                >
                                  <Link to={subItem.url}>{subItem.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={state === "collapsed" ? item.title : undefined}
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
