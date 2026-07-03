import { useState } from "react";
import { ChevronDown, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ReceivePurchaseOrderDialog from "./receive-purchase-order-dialog";
import CancelPurchaseOrderDialog from "./cancel-purchase-order-dialog";

const PurchaseOrderViewActions = ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  const [openReceiveDialog, setOpenReceiveDialog] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openActionsDropdown, setOpenActionsDropdown] = useState(false);

  const canModify = status === "Pending" || status === "Partially Received";
  if (!canModify) return null;

  return (
    <>
      <ReceivePurchaseOrderDialog
        openReceiveDialog={openReceiveDialog}
        setOpenReceiveDialog={setOpenReceiveDialog}
        id={id}
        trigger={
          <Button>
            <PackageCheck />
            Receive Items
          </Button>
        }
      />
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
          <CancelPurchaseOrderDialog
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

export default PurchaseOrderViewActions;
