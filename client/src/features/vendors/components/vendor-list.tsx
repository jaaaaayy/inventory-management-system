import Error from "@/components/error";
import Loading from "@/components/loading";
import Searchbar from "@/components/searchbar";
import { DataTable } from "@/components/ui/data-table";
import { useState } from "react";
import { columns } from "../columns";
import { useFetchVendorList } from "../services/queries";

const VendorList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { isLoading, isPending, isError, error, data } = useFetchVendorList();

  if (isError && error) {
    return <Error message={error.message} />;
  }

  if (isLoading || isPending) {
    return <Loading feature="vendors" />;
  }

  console.log(data);

  return (
    <>
      <Searchbar
        feature="vendor"
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <DataTable
        columns={columns}
        data={data.vendors}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </>
  );
};

export default VendorList;
