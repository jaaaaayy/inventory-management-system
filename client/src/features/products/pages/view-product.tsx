import Error from "@/components/error";
import Header from "@/components/header";
import Loading from "@/components/loading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFetchProduct } from "../services/queries";
import ProductDetails from "../components/product-details";

const ViewProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading, isPending, isError, error, data } = useFetchProduct(
    params.id
  );

  return (
    <>
      <Header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/products">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data?.product?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-4 lg:p-6 grow min-h-0 space-y-6">
        <Button variant="ghost" onClick={() => navigate("/products")}>
          <ArrowLeft />
          Back to Products
        </Button>
        {isLoading || isPending ? (
          <Loading feature="product" />
        ) : isError && error ? (
          <Error message={error.message} />
        ) : (
          <ProductDetails product={data.product} />
        )}
      </div>
    </>
  );
};

export default ViewProduct;
