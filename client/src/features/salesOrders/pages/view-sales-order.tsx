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
import { useFetchSalesOrder } from "../services/queries";
import SalesOrderDetails from "../components/sales-order-details";

const ViewSalesOrder = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading, isPending, isError, error, data } = useFetchSalesOrder(
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
              <BreadcrumbLink href="/sales/orders">Sales Orders</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>View Sales Order</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-2 lg:p-4 grow min-h-0 space-y-4">
        <Button variant="ghost" onClick={() => navigate("/sales/orders")}>
          <ArrowLeft />
          Back to Sales Orders
        </Button>
        {isLoading || isPending ? (
          <Loading feature="sales order" />
        ) : isError && error ? (
          <Error message={error.message} />
        ) : (
          <SalesOrderDetails salesOrder={data.salesOrder} />
        )}
      </div>
    </>
  );
};

export default ViewSalesOrder;
