import Error from "@/components/error";
import Loading from "@/components/loading";
import PageHeader from "@/components/page-header";
import { useParams } from "react-router-dom";
import CategoryDetails from "../components/category-details";
import CategoryViewActions from "../components/category-view-actions";
import { useFetchCategory } from "../services/queries";

const ViewCategory = () => {
  const params = useParams();
  const { isLoading, isPending, isError, error, data } = useFetchCategory(
    params.id
  );

  const category = data?.category;

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Categories", to: "/categories" },
          { label: category?.name ?? "Category" },
        ]}
        title={category?.name ?? "Category"}
        actions={category && <CategoryViewActions id={category._id} />}
      />
      <div className="p-4 lg:p-6 grow min-h-0 space-y-6">
        {isLoading || isPending ? (
          <Loading feature="category" />
        ) : isError && error ? (
          <Error message={error.message} />
        ) : (
          <CategoryDetails category={data.category} />
        )}
      </div>
    </>
  );
};

export default ViewCategory;
