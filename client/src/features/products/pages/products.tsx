import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import ProductList from "../components/product-list";

const Products = () => {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Products" },
        ]}
        title="Products"
        description="Manage your product catalog and stock levels."
        actions={
          <Button asChild>
            <Link to="/products/new">
              <Plus />
              New Product
            </Link>
          </Button>
        }
      />
      <div className="flex grow flex-col p-4 lg:p-6">
        <ProductList />
      </div>
    </>
  );
};

export default Products;
