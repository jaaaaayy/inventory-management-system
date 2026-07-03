import Error from "@/components/error";
import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import { useParams } from "react-router-dom";
import { useFetchSalesOrder } from "../services/queries";
import SalesOrderDetails from "../components/sales-order-details";
import SalesOrderStatusBadge from "../components/status-badge";
import SalesOrderViewActions from "../components/sales-order-view-actions";

const ViewSalesOrder = () => {
  const params = useParams();
  const { isLoading, isPending, isError, error, data } = useFetchSalesOrder(
    params.id
  );

  const salesOrder = data?.salesOrder;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Sales Orders", to: "/sales/orders" },
          { label: salesOrder?.orderNumber ?? "Sales Order" },
        ]}
        title={salesOrder?.orderNumber ?? "Sales Order"}
        titleExtra={
          salesOrder && <SalesOrderStatusBadge status={salesOrder.status} />
        }
        actions={
          salesOrder && (
            <SalesOrderViewActions
              id={salesOrder._id}
              status={salesOrder.status}
            />
          )
        }
      />
      <div className="p-4 lg:p-6 grow min-h-0 space-y-6">
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
