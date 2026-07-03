import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import PurchaseOrderList from "../components/purchase-order-list";

const PurchaseOrders = () => {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Purchase Orders" },
        ]}
        title="Purchase Orders"
        description="Track incoming stock from your vendors."
        actions={
          <Button asChild>
            <Link to="/purchase/orders/new">
              <Plus />
              New Purchase Order
            </Link>
          </Button>
        }
      />
      <div className="flex grow flex-col p-4 lg:p-6">
        <PurchaseOrderList />
      </div>
    </>
  );
};

export default PurchaseOrders;
