import PageHeader from "@/components/page-header";
import CreateCustomerForm from "../components/form/create-customer-form";

const CreateCustomer = () => {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Customers", to: "/sales/customers" },
          { label: "New Customer" },
        ]}
        title="New Customer"
        description="Add a customer to your records."
      />
      <div className="p-4 lg:p-6 grow">
        <CreateCustomerForm />
      </div>
    </>
  );
};

export default CreateCustomer;
