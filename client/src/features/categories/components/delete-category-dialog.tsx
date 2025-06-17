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
import { useDeleteCategory } from "../services/mutations";

interface DeleteCategoryDialogProps {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: Dispatch<SetStateAction<boolean>>;
  setOpenActionsDropdown: Dispatch<SetStateAction<boolean>>;
  id: string;
}

const DeleteCategoryDialog = ({
  openDeleteDialog,
  setOpenDeleteDialog,
  setOpenActionsDropdown,
  id,
}: DeleteCategoryDialogProps) => {
  const { mutateAsync: deleteCategoryMutation, isPending } = useDeleteCategory(
    id,
    setOpenDeleteDialog,
    setOpenActionsDropdown
  );

  const handleDeleteCategory = async () => {
    await deleteCategoryMutation();
  };

  return (
    <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Delete category
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            category and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setOpenDeleteDialog(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            onClick={handleDeleteCategory}
          >
            {isPending ? "Confirming..." : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategoryDialog;
