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
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/sales/orders">Sales Orders</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {isLoading || isPending
                  ? "Loading..."
                  : data?.salesOrder?.customer
                  ? `Order for ${
                      typeof data.salesOrder.customer === "string"
                        ? data.salesOrder.customer
                        : `${data.salesOrder.customer.firstName} ${data.salesOrder.customer.lastName}`
                    }`
                  : "View Sales Order"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-4 lg:p-6 grow min-h-0 space-y-6">
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
