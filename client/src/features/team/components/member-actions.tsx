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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@/hooks/use-user";
import { usePermissions } from "@/hooks/use-has-permission";
import { useRemoveMember, useUpdateMember } from "../services/mutations";
import { ASSIGNABLE_POSITIONS } from "../schemas";
import { TMember } from "../types";

const selectClassName =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring";

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
                <select
                  className={selectClassName}
                  value={selectedPosition}
                  onChange={(event) => setSelectedPosition(event.target.value)}
                >
                  {ASSIGNABLE_POSITIONS.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
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
            <Dialog open={openRemoveDialog} onOpenChange={setOpenRemoveDialog}>
              <DialogTrigger asChild>
                <DropdownMenuItem
                  onSelect={(e) => e.preventDefault()}
                  className="text-destructive"
                >
                  Remove
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Remove member?</DialogTitle>
                  <DialogDescription>
                    This removes {member.user?.email} from the organization.
                    They will lose access immediately.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setOpenRemoveDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={isRemoving}
                    onClick={handleRemove}
                  >
                    {isRemoving ? "Removing..." : "Remove"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
