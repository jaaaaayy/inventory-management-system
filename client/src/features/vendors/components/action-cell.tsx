import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router";
// import DeleteCategoryDialog from "./delete-category-dialog";
import { useState } from "react";

export const ActionsCell = ({ id }: { id: string }) => {
  // const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openActionsDropdown, setOpenActionsDropdown] = useState(false);
  const navigate = useNavigate();

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
        <DropdownMenuItem>View category</DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate(`/categories/${id}/update`)}>
          Update category
        </DropdownMenuItem>
        {/* <DeleteCategoryDialog
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          setOpenActionsDropdown={setOpenActionsDropdown}
          id={id}
        /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
