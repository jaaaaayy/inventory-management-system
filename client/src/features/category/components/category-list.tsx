import { DataTable } from "@/components/ui/data-table";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { columns } from "../columns";
import { useFetchCategoryList } from "../server/queries";

const CategoryList = () => {
  const { data } = useFetchCategoryList();

  return (
    <div className="p-4 space-y-4">
      <div className="relative w-xs">
        <SearchIcon className="size-4 absolute left-2.5 top-1/2 -translate-y-1/2" />
        <Input className="pl-8" placeholder="Search category..." />
      </div>
      {data && <DataTable columns={columns} data={data.categories} />}
    </div>
  );
};

export default CategoryList;
