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
import CustomerDetails from "../components/customer-details";
import { useFetchCustomer } from "../services/queries";

const ViewCustomer = () => {
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
              <BreadcrumbPage>{data?.customer._id}</BreadcrumbPage>
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
          <CustomerDetails customer={data.customer} />
        )}
      </div>
    </>
  );
};

export default ViewCustomer;
