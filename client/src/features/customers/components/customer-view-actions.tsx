import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteCustomerDialog from "./delete-customer-dialog";

const CustomerViewActions = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openActionsDropdown, setOpenActionsDropdown] = useState(false);

  return (
    <>
      <Button onClick={() => navigate(`/sales/customers/${id}/edit`)}>
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
          <DeleteCustomerDialog
            openDeleteDialog={openDeleteDialog}
            setOpenDeleteDialog={setOpenDeleteDialog}
            setOpenActionsDropdown={setOpenActionsDropdown}
            id={id}
            onDeleted={() => navigate("/sales/customers", { replace: true })}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CustomerViewActions;
