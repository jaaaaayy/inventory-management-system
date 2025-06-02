import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router";
import CategoryList from "../components/category-list";
import { Plus } from "lucide-react";

const Categories = () => {
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
      <div className="p-2 lg:p-4 grow flex flex-col min-h-0 gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Categories</h1>
          <Link
            to="/categories/new"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus />
            New Category
          </Link>
        </div>
        <CategoryList />
      </div>
    </>
  );
};

export default Categories;
