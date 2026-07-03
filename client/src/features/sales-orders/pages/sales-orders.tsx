import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import SalesOrderList from "../components/sales-order-list";

const SalesOrders = () => {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Sales Orders" },
        ]}
        title="Sales Orders"
        description="Track and fulfill your customer orders."
        actions={
          <Button asChild>
            <Link to="/sales/orders/new">
              <Plus />
              New Sales Order
            </Link>
          </Button>
        }
      />
      <div className="flex grow flex-col p-4 lg:p-6">
        <SalesOrderList />
      </div>
    </>
  );
};

export default SalesOrders;
