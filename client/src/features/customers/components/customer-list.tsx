import Error from "@/components/error";
import Searchbar from "@/components/searchbar";
import { DataTable } from "@/components/ui/data-table";
import { useState } from "react";
import { columns } from "../columns";
import { useFetchCustomerList } from "../services/queries";

const CustomerList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { isLoading, isPending, isError, error, data } = useFetchCustomerList();

  if (isError && error) {
    return <Error message={error.message} />;
  }

  return (
    <DataTable
      columns={columns}
      data={data?.customers ?? []}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      isLoading={isLoading || isPending}
      toolbar={
        <Searchbar
          feature="customer"
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      }
    />
  );
};

export default CustomerList;
