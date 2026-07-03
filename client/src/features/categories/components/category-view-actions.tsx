import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteCategoryDialog from "./delete-category-dialog";

const CategoryViewActions = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openActionsDropdown, setOpenActionsDropdown] = useState(false);

  return (
    <>
      <Button onClick={() => navigate(`/categories/${id}/edit`)}>
        <Pencil />
        Edit
      </Button>
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
          <DeleteCategoryDialog
            openDeleteDialog={openDeleteDialog}
            setOpenDeleteDialog={setOpenDeleteDialog}
            setOpenActionsDropdown={setOpenActionsDropdown}
            id={id}
            onDeleted={() => navigate("/categories", { replace: true })}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CategoryViewActions;
