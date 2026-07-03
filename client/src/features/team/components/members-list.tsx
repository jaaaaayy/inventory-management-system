import { useState } from "react";
import Error from "@/components/error";
import Searchbar from "@/components/searchbar";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../columns";
import { useFetchMembers } from "../services/queries";

const MembersList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { isLoading, isPending, isError, error, data } = useFetchMembers();

  if (isError && error) {
    return <Error message={error.message} />;
  }

  return (
    <DataTable
      columns={columns}
      data={data?.members ?? []}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      isLoading={isLoading || isPending}
      toolbar={
        <Searchbar
          feature="member"
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      }
    />
  );
};

export default MembersList;
