import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import SalesOrderList from "../components/sales-order-list";

const SalesOrders = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Sales Orders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-4 lg:p-6 grow space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Sales Orders</h1>
          <Button onClick={() => navigate("/sales/orders/new")}>
            <Plus />
            New Sales Order
          </Button>
        </div>
        <div className="space-y-6">
          <SalesOrderList />
        </div>
      </div>
    </>
  );
};

export default SalesOrders;
