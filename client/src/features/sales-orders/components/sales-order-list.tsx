import Error from "@/components/error";
import Searchbar from "@/components/searchbar";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../columns.tsx";
import { useState } from "react";
import { useFetchSalesOrderList } from "../services/queries.ts";

const SalesOrderList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { isLoading, isPending, isError, error, data } =
    useFetchSalesOrderList();

  if (isError && error) {
    return <Error message={error.message} />;
  }

  return (
    <DataTable
      columns={columns}
      data={data?.salesOrders ?? []}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      isLoading={isLoading || isPending}
      toolbar={
        <Searchbar
          feature="sales order"
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      }
    />
  );
};

export default SalesOrderList;
