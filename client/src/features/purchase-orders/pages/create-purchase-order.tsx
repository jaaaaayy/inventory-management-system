import PageHeader from "@/components/page-header";
import CreatePurchaseOrderForm from "../components/form/create-purchase-order-form";

const CreatePurchaseOrder = () => {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Purchase Orders", to: "/purchase/orders" },
          { label: "New Purchase Order" },
        ]}
        title="New Purchase Order"
        description="Order stock from a vendor."
      />
      <div className="p-4 lg:p-6 grow">
        <CreatePurchaseOrderForm />
      </div>
    </>
  );
};

export default CreatePurchaseOrder;
