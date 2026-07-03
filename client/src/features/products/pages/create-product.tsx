import PageHeader from "@/components/page-header";
import CreateProductForm from "../components/form/create-product-form";

const CreateProduct = () => {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Products", to: "/products" },
          { label: "New Product" },
        ]}
        title="New Product"
        description="Add a new product to your catalog."
      />
      <div className="p-4 lg:p-6 grow">
        <CreateProductForm />
      </div>
    </>
  );
};

export default CreateProduct;
