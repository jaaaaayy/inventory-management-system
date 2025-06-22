import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import ProductList from "../components/product-list";

const Products = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Products</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-2 lg:p-4 grow">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-2xl">Products</CardTitle>
            <Button onClick={() => navigate("/products/new")}>
              <Plus />
              New Product
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProductList />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Products;
