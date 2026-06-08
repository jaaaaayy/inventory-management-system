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
import { useUpdateSalesOrderStatus } from "../services/mutations";

interface CancelSalesOrderDialogProps {
  openCancelDialog: boolean;
  setOpenCancelDialog: Dispatch<SetStateAction<boolean>>;
  setOpenActionsDropdown: Dispatch<SetStateAction<boolean>>;
  id: string;
}

const CancelSalesOrderDialog = ({
  openCancelDialog,
  setOpenCancelDialog,
  setOpenActionsDropdown,
  id,
}: CancelSalesOrderDialogProps) => {
  const { mutateAsync: updateStatusMutation, isPending } =
    useUpdateSalesOrderStatus(id, setOpenCancelDialog, setOpenActionsDropdown);

  const handleCancelSalesOrder = async () => {
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
          <DialogTitle>Cancel this sales order?</DialogTitle>
          <DialogDescription>
            This will mark the order as cancelled and return the ordered
            quantities back to inventory. This action cannot be undone.
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
            onClick={handleCancelSalesOrder}
          >
            {isPending ? "Cancelling..." : "Cancel order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelSalesOrderDialog;
