import PageHeader from "@/components/page-header";
import CreateCategoryForm from "../components/form/create-category-form";

const CreateCategory = () => {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Categories", to: "/categories" },
          { label: "New Category" },
        ]}
        title="New Category"
        description="Add a category to organize your products."
      />
      <div className="p-4 lg:p-6 grow">
        <CreateCategoryForm />
      </div>
    </>
  );
};

export default CreateCategory;
