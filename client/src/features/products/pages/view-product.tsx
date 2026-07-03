import Error from "@/components/error";
import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { useFetchProduct } from "../services/queries";
import ProductDetails from "../components/product-details";
import ProductViewActions from "../components/product-view-actions";
import StockMovements from "../components/stock-movements";

const ViewProduct = () => {
  const params = useParams();
  const { isLoading, isPending, isError, error, data } = useFetchProduct(
    params.id
  );

  const product = data?.product;
  const isLowStock =
    !!product && Number(product.quantity) <= Number(product.reorderPoint);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Products", to: "/products" },
          { label: product?.name ?? "Product" },
        ]}
        title={product?.name ?? "Product"}
        titleExtra={
          isLowStock && (
            <Badge
              variant="outline"
              className="border-transparent bg-amber-500/15 text-amber-500 dark:bg-amber-500/10"
            >
              Low stock
            </Badge>
          )
        }
        actions={product && <ProductViewActions product={product} />}
      />
      <div className="p-4 lg:p-6 grow min-h-0 space-y-6">
        {isLoading || isPending ? (
          <Loading feature="product" />
        ) : isError && error ? (
          <Error message={error.message} />
        ) : (
          <div className="space-y-6">
            <ProductDetails product={data.product} />
            <StockMovements productId={data.product._id} />
          </div>
        )}
      </div>
    </>
  );
};

export default ViewProduct;
