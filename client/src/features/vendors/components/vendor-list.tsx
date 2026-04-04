import Error from "@/components/error";
import Loading from "@/components/loading";
import Searchbar from "@/components/searchbar";
import { DataTable } from "@/components/ui/data-table";
import { useState } from "react";
import { columns } from "../columns";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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

  return (
    <>
      <div className="flex items-center gap-2">
        <Searchbar
          feature="vendor"
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <Button asChild>
          <Link to="/vendors/new">
            <Plus />
            New Vendor
          </Link>
        </Button>
      </div>
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
