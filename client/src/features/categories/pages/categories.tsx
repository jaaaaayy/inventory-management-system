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
import CategoryList from "../components/category-list";

const Categories = () => {
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
              <BreadcrumbPage>Categories</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-2 lg:p-4 grow space-y-4">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-2xl">Categories</CardTitle>
            <Button onClick={() => navigate("/categories/new")}>
              <Plus />
              New Category
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            <CategoryList />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Categories;
