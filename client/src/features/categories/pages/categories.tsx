import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import CategoryList from "../components/category-list";

const Categories = () => {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Categories" },
        ]}
        title="Categories"
        description="Organize your products into categories."
        actions={
          <Button asChild>
            <Link to="/categories/new">
              <Plus />
              New Category
            </Link>
          </Button>
        }
      />
      <div className="flex grow flex-col p-4 lg:p-6">
        <CategoryList />
      </div>
    </>
  );
};

export default Categories;
