import Error from "@/components/error";
import Loading from "@/components/loading";
import Searchbar from "@/components/searchbar";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../columns.tsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useFetchSalesOrderList } from "../services/queries.ts";

const SalesOrderList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { isLoading, isPending, isError, error, data } =
    useFetchSalesOrderList();

  if (isError && error) {
    return <Error message={error.message} />;
  }

  if (isLoading || isPending) {
    return <Loading feature="sales orders" />;
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Searchbar
          feature="sales order"
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <Button asChild>
          <Link to="/sales/orders/new">
            <Plus />
            New Sales Order
          </Link>
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={data.salesOrders}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </>
  );
};

export default SalesOrderList;
