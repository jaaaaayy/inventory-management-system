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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div className="p-2 lg:p-4 grow">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-2xl">Sales Orders</CardTitle>
            <Button onClick={() => navigate("/salesOrders/new")}>
              <Plus />
              New Sales Order
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <SalesOrderList />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SalesOrders;
