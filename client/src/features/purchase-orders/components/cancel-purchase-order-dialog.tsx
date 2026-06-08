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

interface CancelPurchaseOrderDialogProps {
  openCancelDialog: boolean;
  setOpenCancelDialog: Dispatch<SetStateAction<boolean>>;
  setOpenActionsDropdown: Dispatch<SetStateAction<boolean>>;
  id: string;
}

const CancelPurchaseOrderDialog = ({
  openCancelDialog,
  setOpenCancelDialog,
  setOpenActionsDropdown,
  id,
}: CancelPurchaseOrderDialogProps) => {
  const { mutateAsync: updateStatusMutation, isPending } =
    useUpdatePurchaseOrderStatus(id, setOpenCancelDialog, setOpenActionsDropdown);

  const handleCancelPurchaseOrder = async () => {
    await updateStatusMutation("Cancelled");
  };

  return (
    <Dialog open={openCancelDialog} onOpenChange={setOpenCancelDialog}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Cancel order
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel this purchase order?</DialogTitle>
          <DialogDescription>
            This will mark the order as cancelled. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setOpenCancelDialog(false)}
          >
            Keep order
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            onClick={handleCancelPurchaseOrder}
          >
            {isPending ? "Cancelling..." : "Cancel order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelPurchaseOrderDialog;
