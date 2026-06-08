import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DeleteProductDialog from "./delete-product-dialog";
import AdjustStockDialog from "./adjust-stock-dialog";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

export const ActionsCell = ({
  id,
  name,
  quantity,
}: {
  id: string;
  name: string;
  quantity: number;
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAdjustDialog, setOpenAdjustDialog] = useState(false);
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
        <DropdownMenuItem onClick={() => navigate(`/products/${id}`)}>
          View product
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate(`/products/${id}/edit`)}>
          Edit product
        </DropdownMenuItem>
        <AdjustStockDialog
          openAdjustDialog={openAdjustDialog}
          setOpenAdjustDialog={setOpenAdjustDialog}
          setOpenActionsDropdown={setOpenActionsDropdown}
          id={id}
          name={name}
          currentQuantity={quantity}
        />
        <DropdownMenuSeparator />
        <DeleteProductDialog
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          setOpenActionsDropdown={setOpenActionsDropdown}
          id={id}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
