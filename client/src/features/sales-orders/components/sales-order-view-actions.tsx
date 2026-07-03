import { useState } from "react";
import { ChevronDown, PackageCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUpdateSalesOrderStatus } from "../services/mutations";
import CancelSalesOrderDialog from "./cancel-sales-order-dialog";

const SalesOrderViewActions = ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openActionsDropdown, setOpenActionsDropdown] = useState(false);
  const { mutateAsync: updateStatusMutation, isPending } =
    useUpdateSalesOrderStatus(id);

  const canCancel = status === "Pending" || status === "Shipped";
  if (!canCancel) return null;

  return (
    <>
      {status === "Pending" && (
        <Button
          disabled={isPending}
          onClick={() => updateStatusMutation("Shipped")}
        >
          <Truck />
          {isPending ? "Updating..." : "Mark as Shipped"}
        </Button>
      )}
      {status === "Shipped" && (
        <Button
          disabled={isPending}
          onClick={() => updateStatusMutation("Delivered")}
        >
          <PackageCheck />
          {isPending ? "Updating..." : "Mark as Delivered"}
        </Button>
      )}
      <DropdownMenu
        open={openActionsDropdown}
        onOpenChange={setOpenActionsDropdown}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Actions
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <CancelSalesOrderDialog
            openCancelDialog={openCancelDialog}
            setOpenCancelDialog={setOpenCancelDialog}
            setOpenActionsDropdown={setOpenActionsDropdown}
            id={id}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SalesOrderViewActions;
