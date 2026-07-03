import PageHeader from "@/components/page-header";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { usePermissions } from "@/hooks/use-has-permission";
import OrganizationForm from "@/features/organization/components/organization-form";
import MembersList from "@/features/team/components/members-list";
import PendingInvitations from "@/features/team/components/pending-invitations";
import InviteDialog from "@/features/team/components/invite-dialog";
import AppearanceSettings from "../components/appearance-settings";

const Settings = () => {
  const { can } = usePermissions();

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Dashboard", to: "/dashboard" },
          { label: "Settings" },
        ]}
        title="Settings"
        description="Manage your organization, team, and preferences."
      />
      <div className="p-4 lg:p-6 grow">
        <Tabs defaultValue="organization">
          <TabsList>
            <TabsTrigger value="organization">Organization & Team</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          <TabsContent value="organization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization</CardTitle>
                <CardDescription>
                  Basic information about your organization.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OrganizationForm />
              </CardContent>
            </Card>

            {can("member:read") ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Members</CardTitle>
                    <CardDescription>
                      People with access to this organization.
                    </CardDescription>
                    {can("member:invite") && (
                      <CardAction>
                        <InviteDialog />
                      </CardAction>
                    )}
                  </CardHeader>
                  <CardContent>
                    <MembersList />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pending Invitations</CardTitle>
                    <CardDescription>
                      Invitations that have been sent but not yet accepted.
                    </CardDescription>
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
          </TabsContent>
          <TabsContent value="appearance">
            <AppearanceSettings />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Settings;
