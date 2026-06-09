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
import ReceivePurchaseOrderDialog from "./receive-purchase-order-dialog";
import CancelPurchaseOrderDialog from "./cancel-purchase-order-dialog";

export const ActionsCell = ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  const [openActionsDropdown, setOpenActionsDropdown] = useState(false);
  const [openReceiveDialog, setOpenReceiveDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const navigate = useNavigate();

  const canModify = status === "Pending" || status === "Partially Received";

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
        <DropdownMenuItem onClick={() => navigate(`/purchase/orders/${id}`)}>
          View purchase order
        </DropdownMenuItem>
        {canModify && (
          <>
            <ReceivePurchaseOrderDialog
              openReceiveDialog={openReceiveDialog}
              setOpenReceiveDialog={setOpenReceiveDialog}
              setOpenActionsDropdown={setOpenActionsDropdown}
              id={id}
            />
            <DropdownMenuSeparator />
            <CancelPurchaseOrderDialog
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
