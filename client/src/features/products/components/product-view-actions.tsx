import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TProduct } from "../types";
import AdjustStockDialog from "./adjust-stock-dialog";
import DeleteProductDialog from "./delete-product-dialog";

const ProductViewActions = ({ product }: { product: TProduct }) => {
  const navigate = useNavigate();
  const [openAdjustDialog, setOpenAdjustDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openActionsDropdown, setOpenActionsDropdown] = useState(false);

  return (
    <>
      <Button onClick={() => navigate(`/products/${product._id}/edit`)}>
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
          <AdjustStockDialog
            openAdjustDialog={openAdjustDialog}
            setOpenAdjustDialog={setOpenAdjustDialog}
            setOpenActionsDropdown={setOpenActionsDropdown}
            id={product._id}
            name={product.name}
            currentQuantity={product.quantity}
          />
          <DropdownMenuSeparator />
          <DeleteProductDialog
            openDeleteDialog={openDeleteDialog}
            setOpenDeleteDialog={setOpenDeleteDialog}
            setOpenActionsDropdown={setOpenActionsDropdown}
            id={product._id}
            onDeleted={() => navigate("/products", { replace: true })}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProductViewActions;
