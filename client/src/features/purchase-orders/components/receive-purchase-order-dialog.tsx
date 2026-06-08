import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dispatch, SetStateAction } from "react";
import { useUpdatePurchaseOrderStatus } from "../services/mutations";

interface ReceivePurchaseOrderDialogProps {
  openReceiveDialog: boolean;
  setOpenReceiveDialog: Dispatch<SetStateAction<boolean>>;
  setOpenActionsDropdown: Dispatch<SetStateAction<boolean>>;
  id: string;
}

const ReceivePurchaseOrderDialog = ({
  openReceiveDialog,
  setOpenReceiveDialog,
  setOpenActionsDropdown,
  id,
}: ReceivePurchaseOrderDialogProps) => {
  const { mutateAsync: updateStatusMutation, isPending } =
    useUpdatePurchaseOrderStatus(
      id,
      setOpenReceiveDialog,
      setOpenActionsDropdown
    );

  const handleReceivePurchaseOrder = async () => {
    await updateStatusMutation("Received");
  };

  return (
    <Dialog open={openReceiveDialog} onOpenChange={setOpenReceiveDialog}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Mark as Received
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark this purchase order as received?</DialogTitle>
          <DialogDescription>
            This will add the ordered quantities into inventory. This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setOpenReceiveDialog(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            onClick={handleReceivePurchaseOrder}
          >
            {isPending ? "Receiving..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReceivePurchaseOrderDialog;
