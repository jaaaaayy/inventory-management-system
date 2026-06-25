import Header from "@/components/header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { usePermissions } from "@/hooks/use-has-permission";
import MembersList from "../components/members-list";
import InviteDialog from "../components/invite-dialog";
import PendingInvitations from "../components/pending-invitations";

const Team = () => {
  const { can } = usePermissions();

  return (
    <>
      <Header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Settings</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Team</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Header>
      <div className="p-4 lg:p-6 grow space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Team</h1>
          {can("member:invite") && <InviteDialog />}
        </div>

        {can("member:read") ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Members</CardTitle>
              </CardHeader>
              <CardContent>
                <MembersList />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Invitations</CardTitle>
              </CardHeader>
              <CardContent>
                <PendingInvitations />
              </CardContent>
            </Card>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            You do not have access to manage this organization's team.
          </p>
        )}
      </div>
    </>
  );
};

export default Team;
