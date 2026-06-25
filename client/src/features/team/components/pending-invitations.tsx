import { format } from "date-fns";
import Error from "@/components/error";
import Loading from "@/components/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePermissions } from "@/hooks/use-has-permission";
import { useFetchInvitations } from "../services/queries";
import { useRevokeInvitation } from "../services/mutations";
import { TInvitation } from "../types";

const PendingInvitations = () => {
  const { can } = usePermissions();
  const { isLoading, isPending, isError, error, data } = useFetchInvitations();
  const { mutateAsync: revokeInvitationMutation, isPending: isRevoking } =
    useRevokeInvitation();

  if (isError && error) {
    return <Error message={error.message} />;
  }

  if (isLoading || isPending) {
    return <Loading feature="invitations" />;
  }

  const invitations: TInvitation[] = data.invitations;

  if (!invitations.length) {
    return (
      <p className="text-sm text-muted-foreground">No pending invitations.</p>
    );
  }

  return (
    <ul className="divide-y rounded-md border">
      {invitations.map((invitation) => (
        <li
          key={invitation._id}
          className="flex items-center justify-between gap-4 p-3"
        >
          <div className="space-y-1">
            <p className="text-sm font-medium">{invitation.email}</p>
            <p className="text-xs text-muted-foreground">
              Expires {format(new Date(invitation.expiresAt), "PP")}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{invitation.position?.name ?? "—"}</Badge>
            {can("member:invite") && (
              <Button
                variant="outline"
                size="sm"
                disabled={isRevoking}
                onClick={() => revokeInvitationMutation(invitation._id)}
              >
                Revoke
              </Button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PendingInvitations;
