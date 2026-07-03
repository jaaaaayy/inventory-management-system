import Error from "@/components/error";
import Searchbar from "@/components/searchbar";
import { DataTable } from "@/components/ui/data-table";
import { useState } from "react";
import { useFetchProductList } from "../services/queries";
import { columns } from "../column";

const ProductList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { isLoading, isPending, isError, error, data } = useFetchProductList();

  if (isError && error) {
    return <Error message={error.message} />;
  }

  return (
    <DataTable
      columns={columns}
      data={data?.products ?? []}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      isLoading={isLoading || isPending}
      toolbar={
        <Searchbar
          feature="product"
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      }
    />
  );
};

export default ProductList;
