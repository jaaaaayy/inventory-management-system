import PageHeader from "@/components/page-header";
import CreateSalesOrderForm from "../components/form/create-sales-order-form";

const CreateSalesOrder = () => {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Sales Orders", to: "/sales/orders" },
          { label: "New Sales Order" },
        ]}
        title="New Sales Order"
        description="Create an order for a customer."
      />
      <div className="p-4 lg:p-6 grow">
        <CreateSalesOrderForm />
      </div>
    </>
  );
};

export default CreateSalesOrder;
