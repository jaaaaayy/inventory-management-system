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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <div className="p-2 lg:p-4 grow min-h-0 space-y-4">
        <Button variant="ghost" onClick={() => navigate("/categories")}>
          <ArrowLeft />
          Back to Categories
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">New Category</CardTitle>
          </CardHeader>
          <CardContent>
            <CreateCategoryForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CreateCategory;
