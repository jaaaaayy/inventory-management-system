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
import { Link, useNavigate, useParams } from "react-router-dom";
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
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/sales/customers">Customers</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data?.customer?.firstName} {data?.customer?.lastName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-4 lg:p-6 grow min-h-0 space-y-6">
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
