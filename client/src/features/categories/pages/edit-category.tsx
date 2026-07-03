import Error from "@/components/error";
import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import { useParams } from "react-router-dom";
import EditCategoryForm from "../components/form/edit-category-form";
import { useFetchCategory } from "../services/queries";

const EditCategory = () => {
  const params = useParams();
  const { isLoading, isPending, isError, error, data } = useFetchCategory(
    params.id
  );

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Categories", to: "/categories" },
          { label: "Edit Category" },
        ]}
        title="Edit Category"
        description="Update this category's details."
      />
      <div className="p-4 lg:p-6 grow min-h-0 flex flex-col">
        {isLoading || isPending ? (
          <Loading feature="category" />
        ) : isError && error ? (
          <Error message={error.message} />
        ) : (
          <EditCategoryForm category={data.category} />
        )}
      </div>
    </>
  );
};

export default EditCategory;
