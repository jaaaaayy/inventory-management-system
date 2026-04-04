import Error from "@/components/error";
import Loading from "@/components/loading";
import Searchbar from "@/components/searchbar";
import { DataTable } from "@/components/ui/data-table";
import { useState } from "react";
import { columns } from "../columns";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useFetchCustomerList } from "../services/queries";

const CustomerList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { isLoading, isPending, isError, error, data } = useFetchCustomerList();

  if (isError && error) {
    return <Error message={error.message} />;
  }

  if (isLoading || isPending) {
    return <Loading feature="customers" />;
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Searchbar
          feature="customer"
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <Button asChild>
          <Link to="/sales/customers/new">
            <Plus />
            New Customer
          </Link>
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={data.customers}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </>
  );
};

export default CustomerList;
