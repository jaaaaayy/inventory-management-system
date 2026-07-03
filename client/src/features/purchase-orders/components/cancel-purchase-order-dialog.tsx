import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Ban } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useUpdatePurchaseOrderStatus } from "../services/mutations";

interface CancelPurchaseOrderDialogProps {
  openCancelDialog: boolean;
  setOpenCancelDialog: Dispatch<SetStateAction<boolean>>;
  setOpenActionsDropdown?: Dispatch<SetStateAction<boolean>>;
  id: string;
  trigger?: ReactNode;
}

const CancelPurchaseOrderDialog = ({
  openCancelDialog,
  setOpenCancelDialog,
  setOpenActionsDropdown,
  id,
  trigger,
}: CancelPurchaseOrderDialogProps) => {
  const { mutateAsync: updateStatusMutation, isPending } =
    useUpdatePurchaseOrderStatus(
      id,
      setOpenCancelDialog,
      setOpenActionsDropdown
    );

  const handleCancelPurchaseOrder = async () => {
    await updateStatusMutation("Cancelled");
  };

  return (
    <AlertDialog open={openCancelDialog} onOpenChange={setOpenCancelDialog}>
      <AlertDialogTrigger asChild>
        {trigger ?? (
          <DropdownMenuItem
            variant="destructive"
            onSelect={(e) => e.preventDefault()}
          >
            Cancel order
          </DropdownMenuItem>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            <Ban />
          </AlertDialogMedia>
          <AlertDialogTitle>Cancel this purchase order?</AlertDialogTitle>
          <AlertDialogDescription>
            This will mark the order as cancelled. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep order</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              handleCancelPurchaseOrder();
            }}
          >
            {isPending ? "Cancelling..." : "Cancel order"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelPurchaseOrderDialog;
