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

export const ActionsCell = ({ id }: { id: string }) => {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
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
        <DropdownMenuItem>Delete category</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
