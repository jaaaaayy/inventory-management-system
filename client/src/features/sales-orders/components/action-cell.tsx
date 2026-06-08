import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUpdateSalesOrderStatus } from "../services/mutations";
import CancelSalesOrderDialog from "./cancel-sales-order-dialog";

export const ActionsCell = ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  const [openActionsDropdown, setOpenActionsDropdown] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const navigate = useNavigate();

  const { mutateAsync: updateStatusMutation, isPending } =
    useUpdateSalesOrderStatus(id, undefined, setOpenActionsDropdown);

  const canCancel = status === "Pending" || status === "Shipped";

  return (
    <DropdownMenu
      open={openActionsDropdown}
      onOpenChange={setOpenActionsDropdown}
    >
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigate(`/sales/orders/${id}`)}>
          View sales order
        </DropdownMenuItem>
        {status === "Pending" && (
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => updateStatusMutation("Shipped")}
          >
            Mark as Shipped
          </DropdownMenuItem>
        )}
        {status === "Shipped" && (
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => updateStatusMutation("Delivered")}
          >
            Mark as Delivered
          </DropdownMenuItem>
        )}
        {canCancel && (
          <>
            <DropdownMenuSeparator />
            <CancelSalesOrderDialog
              openCancelDialog={openCancelDialog}
              setOpenCancelDialog={setOpenCancelDialog}
              setOpenActionsDropdown={setOpenActionsDropdown}
              id={id}
            />
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
