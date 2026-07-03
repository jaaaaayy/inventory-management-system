import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import VendorList from "../components/vendor-list";

const Vendors = () => {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Vendors" },
        ]}
        title="Vendors"
        description="Manage your suppliers and their contact details."
        actions={
          <Button asChild>
            <Link to="/vendors/new">
              <Plus />
              New Vendor
            </Link>
          </Button>
        }
      />
      <div className="flex grow flex-col p-4 lg:p-6">
        <VendorList />
      </div>
    </>
  );
};

export default Vendors;
