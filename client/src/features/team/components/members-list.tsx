import { useState } from "react";
import Error from "@/components/error";
import Loading from "@/components/loading";
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

  if (isLoading || isPending) {
    return <Loading feature="members" />;
  }

  return (
    <div className="space-y-4">
      <Searchbar
        feature="member"
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <DataTable
        columns={columns}
        data={data.members}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
};

export default MembersList;
