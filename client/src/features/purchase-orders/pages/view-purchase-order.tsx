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
import { useFetchPurchaseOrder } from "../services/queries";
import PurchaseOrderDetails from "../components/purchase-order-details";

const ViewPurchaseOrder = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading, isPending, isError, error, data } = useFetchPurchaseOrder(
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
                <Link to="/purchase/orders">Purchase Orders</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {isLoading || isPending
                  ? "Loading..."
                  : data?.purchaseOrder?.vendor
                  ? `Order from ${
                      typeof data.purchaseOrder.vendor === "string"
                        ? data.purchaseOrder.vendor
                        : data.purchaseOrder.vendor.name
                    }`
                  : "View Purchase Order"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-4 lg:p-6 grow min-h-0 space-y-6">
        <Button variant="ghost" onClick={() => navigate("/purchase/orders")}>
          <ArrowLeft />
          Back to Purchase Orders
        </Button>
        {isLoading || isPending ? (
          <Loading feature="purchase order" />
        ) : isError && error ? (
          <Error message={error.message} />
        ) : (
          <PurchaseOrderDetails purchaseOrder={data.purchaseOrder} />
        )}
      </div>
    </>
  );
};

export default ViewPurchaseOrder;
