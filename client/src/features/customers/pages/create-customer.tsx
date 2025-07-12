import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateCustomerForm from "../components/form/create-customer-form";

const CreateCustomer = () => {
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
              <BreadcrumbLink href="/sales/customers">Customers</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New Customer</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-2 lg:p-4 grow space-y-4">
        <Button variant="ghost" onClick={() => navigate("/sales/customers")}>
          <ArrowLeft />
          Back to Customers
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">New Customer</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateCustomerForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CreateCustomer;
