import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import CustomerList from "../components/customer-list";

const Customers = () => {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Customers" },
        ]}
        title="Customers"
        description="Manage your customer records and contact details."
        actions={
          <Button asChild>
            <Link to="/sales/customers/new">
              <Plus />
              New Customer
            </Link>
          </Button>
        }
      />
      <div className="flex grow flex-col p-4 lg:p-6">
        <CustomerList />
      </div>
    </>
  );
};

export default Customers;
