import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteVendorDialog from "./delete-vendor-dialog";

const VendorViewActions = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openActionsDropdown, setOpenActionsDropdown] = useState(false);

  return (
    <>
      <Button onClick={() => navigate(`/vendors/${id}/edit`)}>
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
          <DeleteVendorDialog
            openDeleteDialog={openDeleteDialog}
            setOpenDeleteDialog={setOpenDeleteDialog}
            setOpenActionsDropdown={setOpenActionsDropdown}
            id={id}
            onDeleted={() => navigate("/vendors", { replace: true })}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default VendorViewActions;
