import Error from "@/components/error";
import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import { useParams } from "react-router-dom";
import { useFetchPurchaseOrder } from "../services/queries";
import PurchaseOrderDetails from "../components/purchase-order-details";
import PurchaseOrderStatusBadge from "../components/status-badge";
import PurchaseOrderViewActions from "../components/purchase-order-view-actions";

const ViewPurchaseOrder = () => {
  const params = useParams();
  const { isLoading, isPending, isError, error, data } = useFetchPurchaseOrder(
    params.id
  );

  const purchaseOrder = data?.purchaseOrder;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Purchase Orders", to: "/purchase/orders" },
          { label: purchaseOrder?.orderNumber ?? "Purchase Order" },
        ]}
        title={purchaseOrder?.orderNumber ?? "Purchase Order"}
        titleExtra={
          purchaseOrder && (
            <PurchaseOrderStatusBadge status={purchaseOrder.status} />
          )
        }
        actions={
          purchaseOrder && (
            <PurchaseOrderViewActions
              id={purchaseOrder._id}
              status={purchaseOrder.status}
            />
          )
        }
      />
      <div className="p-4 lg:p-6 grow min-h-0 space-y-6">
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
