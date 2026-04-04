import Error from "@/components/error";
import Loading from "@/components/loading";
import Searchbar from "@/components/searchbar";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../columns";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useFetchCategoryList } from "../services/queries";
import { useState } from "react";

const CategoryList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { isLoading, isPending, isError, error, data } = useFetchCategoryList();

  if (isError && error) {
    return <Error message={error.message} />;
  }

  if (isLoading || isPending) {
    return <Loading feature="categories" />;
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Searchbar
          feature="category"
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <Button asChild>
          <Link to="/categories/new">
            <Plus />
            New Category
          </Link>
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={data.categories}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </>
  );
};

export default CategoryList;
