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
import UpdateCategoryForm from "../components/form/update-category-form";
import { useFetchCategory } from "../services/queries";

const UpdateCategory = () => {
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
              <BreadcrumbPage>Update Category</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-4 lg:p-6 grow flex flex-col min-h-0 gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Update Category</h1>
          <Button variant="ghost" onClick={() => navigate("/categories")}>
            <ArrowLeft />
            Back to Categories
          </Button>
        </div>
        {isLoading || isPending ? (
          <Loading feature="category" />
        ) : isError && error ? (
          <Error message={error.message} />
        ) : (
          <UpdateCategoryForm category={data.category} />
        )}
      </div>
    </>
  );
};

export default UpdateCategory;
