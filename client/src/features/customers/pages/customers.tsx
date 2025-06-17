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
import CustomerList from "../components/customer-list";

const Customers = () => {
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
              <BreadcrumbPage>Customers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-2 lg:p-4 grow space-y-4">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-2xl">Customers</CardTitle>
            <Button onClick={() => navigate("/sales/customers/new")}>
              <Plus />
              New Customer
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <CustomerList />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Customers;
