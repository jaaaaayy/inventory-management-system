import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import CreateCategoryForm from "../components/form/create-category-form";
import { Button } from "@/components/ui/button";

const CreateCategory = () => {
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
              <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New Category</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-2 lg:p-4 grow flex flex-col min-h-0 gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">New Category</h1>
          <Button variant="ghost" onClick={() => navigate("/categories")}>
            <ArrowLeft />
            Back to Categories
          </Button>
        </div>
        <CreateCategoryForm />
      </div>
    </>
  );
};

export default CreateCategory;
