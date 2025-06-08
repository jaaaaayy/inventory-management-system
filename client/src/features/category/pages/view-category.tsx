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
import { useNavigate, useParams } from "react-router";
import CategoryDetails from "../components/category-details";
import { useFetchCategory } from "../services/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ViewCategory = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { isLoading, isPending, isError, error, data } = useFetchCategory(
    params.id
  );

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
              <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>View Category</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-2 lg:p-4 grow min-h-0 space-y-4">
        <Button variant="ghost" onClick={() => navigate("/categories")}>
          <ArrowLeft />
          Back to Categories
        </Button>
        {isLoading || isPending ? (
          <Loading feature="category" />
        ) : isError && error ? (
          <Error message={error.message} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Category Details</CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryDetails category={data.category} />
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default ViewCategory;
