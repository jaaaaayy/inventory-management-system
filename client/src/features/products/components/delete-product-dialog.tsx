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
import { useDeleteProduct } from "../services/mutations";

interface DeleteProductDialogProps {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: Dispatch<SetStateAction<boolean>>;
  setOpenActionsDropdown: Dispatch<SetStateAction<boolean>>;
  id: string;
  trigger?: ReactNode;
  onDeleted?: () => void;
}

const DeleteProductDialog = ({
  openDeleteDialog,
  setOpenDeleteDialog,
  setOpenActionsDropdown,
  id,
  trigger,
  onDeleted,
}: DeleteProductDialogProps) => {
  const { mutateAsync: deleteProductMutation, isPending } = useDeleteProduct(
    id,
    setOpenDeleteDialog,
    setOpenActionsDropdown
  );

  const handleDeleteProduct = async () => {
    await deleteProductMutation();
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
            Delete product
          </DropdownMenuItem>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this product?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            product and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault();
              handleDeleteProduct();
            }}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProductDialog;
