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
import { useDeleteVendor } from "../services/mutations";

interface DeleteVendorDialogProps {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: Dispatch<SetStateAction<boolean>>;
  setOpenActionsDropdown: Dispatch<SetStateAction<boolean>>;
  id: string;
  trigger?: ReactNode;
  onDeleted?: () => void;
}

const DeleteVendorDialog = ({
  openDeleteDialog,
  setOpenDeleteDialog,
  setOpenActionsDropdown,
  id,
  trigger,
  onDeleted,
}: DeleteVendorDialogProps) => {
  const { mutateAsync: deleteVendorMutation, isPending } = useDeleteVendor(
    id,
    setOpenDeleteDialog,
    setOpenActionsDropdown
  );

  const handleDeleteVendor = async () => {
    await deleteVendorMutation();
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
            Delete vendor
          </DropdownMenuItem>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this vendor?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            vendor and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              handleDeleteVendor();
            }}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteVendorDialog;
