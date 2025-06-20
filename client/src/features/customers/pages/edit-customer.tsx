import Error from "@/components/error";
import Header from "@/components/header";
import Loading from "@/components/loading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import EditCustomerForm from "../components/form/edit-customer-form";
import { useFetchCustomer } from "../services/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EditCustomer = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading, isPending, isError, error, data } = useFetchCustomer(
    params.id
  );

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
              <BreadcrumbPage>Edit Customer</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-2 lg:p-4 grow min-h-0 space-y-4">
        <Button variant="ghost" onClick={() => navigate("/sales/customers")}>
          <ArrowLeft />
          Back to Customers
        </Button>
        {isLoading || isPending ? (
          <Loading feature="customer" />
        ) : isError && error ? (
          <Error message={error.message} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Edit Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <EditCustomerForm customer={data.customer} />
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default EditCustomer;
