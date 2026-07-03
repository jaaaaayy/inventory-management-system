import Error from "@/components/error";
import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import { useParams } from "react-router-dom";
import { useFetchProduct } from "../services/queries";
import EditProductForm from "../components/form/edit-product-form";

const EditProduct = () => {
  const params = useParams();
  const { isLoading, isPending, isError, error, data } = useFetchProduct(
    params.id
  );

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Products", to: "/products" },
          { label: "Edit Product" },
        ]}
        title="Edit Product"
        description="Update this product's details."
      />
      <div className="p-4 lg:p-6 grow min-h-0 flex flex-col">
        {isLoading || isPending ? (
          <Loading feature="product" />
        ) : isError && error ? (
          <Error message={error.message} />
        ) : (
          <EditProductForm product={data.product} />
        )}
      </div>
    </>
  );
};

export default EditProduct;
