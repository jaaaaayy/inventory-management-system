import PageHeader from "@/components/page-header";
import CreateVendorForm from "../components/form/create-vendor-form";

const CreateVendor = () => {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Vendors", to: "/vendors" },
          { label: "New Vendor" },
        ]}
        title="New Vendor"
        description="Add a supplier to your records."
      />
      <div className="p-4 lg:p-6 grow">
        <CreateVendorForm />
      </div>
    </>
  );
};

export default CreateVendor;
