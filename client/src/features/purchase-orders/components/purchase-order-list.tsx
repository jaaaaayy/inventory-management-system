import Error from "@/components/error";
import Searchbar from "@/components/searchbar";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../columns.tsx";
import { useState } from "react";
import { useFetchPurchaseOrderList } from "../services/queries.ts";

const PurchaseOrderList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { isLoading, isPending, isError, error, data } =
    useFetchPurchaseOrderList();

  if (isError && error) {
    return <Error message={error.message} />;
  }

  return (
    <DataTable
      columns={columns}
      data={data?.purchaseOrders ?? []}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      isLoading={isLoading || isPending}
      toolbar={
        <Searchbar
          feature="purchase order"
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      }
    />
  );
};

export default PurchaseOrderList;
