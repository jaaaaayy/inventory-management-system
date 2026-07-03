import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useDeleteCustomer } from "../services/mutations";

interface DeleteCustomerDialogProps {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: Dispatch<SetStateAction<boolean>>;
  setOpenActionsDropdown: Dispatch<SetStateAction<boolean>>;
  id: string;
  trigger?: ReactNode;
  onDeleted?: () => void;
}

const DeleteCustomerDialog = ({
  openDeleteDialog,
  setOpenDeleteDialog,
  setOpenActionsDropdown,
  id,
  trigger,
  onDeleted,
}: DeleteCustomerDialogProps) => {
  const { mutateAsync: deleteCustomerMutation, isPending } = useDeleteCustomer(
    id,
    setOpenDeleteDialog,
    setOpenActionsDropdown
  );

  const handleDeleteCustomer = async () => {
    await deleteCustomerMutation();
    onDeleted?.();
  };

  return (
    <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
      <AlertDialogTrigger asChild>
        {trigger ?? (
          <DropdownMenuItem
            variant="destructive"
            onSelect={(e) => e.preventDefault()}
          >
            Delete customer
          </DropdownMenuItem>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this customer?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            customer and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              handleDeleteCustomer();
            }}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCustomerDialog;
