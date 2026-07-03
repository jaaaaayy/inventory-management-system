import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@/hooks/use-user";
import { usePermissions } from "@/hooks/use-has-permission";
import { useRemoveMember, useUpdateMember } from "../services/mutations";
import { ASSIGNABLE_POSITIONS } from "../schemas";
import { TMember } from "../types";

export const MemberActions = ({ member }: { member: TMember }) => {
  const { user } = useUser();
  const { can } = usePermissions();
  const { mutateAsync: updateMemberMutation, isPending: isUpdating } =
    useUpdateMember();
  const { mutateAsync: removeMemberMutation, isPending: isRemoving } =
    useRemoveMember();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [openPositionDialog, setOpenPositionDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(
    member.position?.name ?? "Member"
  );

  const isOwner = member.position?.name === "Owner";
  const isSelf = !!user?.email && user.email === member.user?.email;
  const canManagePosition = can("member:updatePosition");
  const canRemove = can("member:remove");

  if (isOwner || isSelf || (!canManagePosition && !canRemove)) {
    return isSelf ? <Badge variant="outline">You</Badge> : null;
  }

  const handleChangePosition = async () => {
    await updateMemberMutation({
      id: member._id,
      update: { position: selectedPosition },
    });
    setOpenPositionDialog(false);
    setOpenDropdown(false);
  };

  const handleToggleStatus = async () => {
    await updateMemberMutation({
      id: member._id,
      update: { status: member.status === "Active" ? "Inactive" : "Active" },
    });
    setOpenDropdown(false);
  };

  const handleRemove = async () => {
    await removeMemberMutation(member._id);
    setOpenRemoveDialog(false);
    setOpenDropdown(false);
  };

  return (
    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        {canManagePosition && (
          <>
            <Dialog
              open={openPositionDialog}
              onOpenChange={setOpenPositionDialog}
            >
              <DialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  Change position
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change position</DialogTitle>
                  <DialogDescription>
                    Update the position for {member.user?.firstName}{" "}
                    {member.user?.lastName}.
                  </DialogDescription>
                </DialogHeader>
                <Select
                  value={selectedPosition}
                  onValueChange={setSelectedPosition}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a position" />
                  </SelectTrigger>
                  <SelectContent>
                    {ASSIGNABLE_POSITIONS.map((position) => (
                      <SelectItem key={position} value={position}>
                        {position}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <DialogFooter>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setOpenPositionDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    disabled={isUpdating}
                    onClick={handleChangePosition}
                  >
                    {isUpdating ? "Saving..." : "Save"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <DropdownMenuItem onClick={handleToggleStatus}>
              {member.status === "Active" ? "Deactivate" : "Activate"}
            </DropdownMenuItem>
          </>
        )}

        {canRemove && (
          <>
            <DropdownMenuSeparator />
            <AlertDialog
              open={openRemoveDialog}
              onOpenChange={setOpenRemoveDialog}
            >
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={(e) => e.preventDefault()}
                >
                  Remove
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove member?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This removes {member.user?.email} from the organization.
                    They will lose access immediately.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    disabled={isRemoving}
                    onClick={(e) => {
                      e.preventDefault();
                      handleRemove();
                    }}
                  >
                    {isRemoving ? "Removing..." : "Remove"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
