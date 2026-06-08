import Error from "@/components/error";
import Loading from "@/components/loading";
import Searchbar from "@/components/searchbar";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "../columns.tsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useFetchPurchaseOrderList } from "../services/queries.ts";

const PurchaseOrderList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { isLoading, isPending, isError, error, data } =
    useFetchPurchaseOrderList();

  if (isError && error) {
    return <Error message={error.message} />;
  }

  if (isLoading || isPending) {
    return <Loading feature="purchase orders" />;
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Searchbar
          feature="purchase order"
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <Button asChild>
          <Link to="/purchase/orders/new">
            <Plus />
            New Purchase Order
          </Link>
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={data.purchaseOrders}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </>
  );
};

export default PurchaseOrderList;
