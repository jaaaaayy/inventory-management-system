import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { LoaderCircle, SearchIcon } from "lucide-react";
import { columns } from "../columns";
import { useFetchCategoryList } from "../server/queries";

const CategoryList = () => {
  const { isLoading, isPending, isError, error, data } = useFetchCategoryList();

  if (isError && error) {
    <p>{error.message}</p>;
  }

  if (isLoading || isPending) {
    return (
      <div className="p-4 flex flex-col gap-2 items-center justify-center">
        <LoaderCircle className="animate-spin" />
        <p>Loading categories...</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-xs">
        <SearchIcon className="size-4 absolute left-2.5 top-1/2 -translate-y-1/2" />
        <Input className="pl-8" placeholder="Search category..." />
      </div>
      <DataTable columns={columns} data={data.categories} />
    </>
  );
};

export default CategoryList;
