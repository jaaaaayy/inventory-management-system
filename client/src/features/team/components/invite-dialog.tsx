import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { ASSIGNABLE_POSITIONS, inviteFormSchema } from "../schemas";
import { TInviteFormSchema, TTeamFormError } from "../types";
import { useCreateInvitation } from "../services/mutations";

const selectClassName =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring";

const InviteDialog = () => {
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState<TTeamFormError | null>(null);
  const [acceptUrl, setAcceptUrl] = useState<string | null>(null);

  const form = useForm<TInviteFormSchema>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: { email: "", position: "Member" },
  });

  const { mutateAsync: createInvitationMutation, isPending } =
    useCreateInvitation(setFormError);

  const onSubmit = async (values: TInviteFormSchema) => {
    setFormError(null);
    const data = await createInvitationMutation(values);
    setAcceptUrl(data.acceptUrl);
    form.reset();
  };

  const handleCopy = async () => {
    if (!acceptUrl) return;
    await navigator.clipboard.writeText(acceptUrl);
    toast.success("Invite link copied.", {
      style: { backgroundColor: "green", color: "white" },
    });
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setAcceptUrl(null);
      setFormError(null);
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Invite member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a member</DialogTitle>
          <DialogDescription>
            Generate a link to invite someone into this organization.
          </DialogDescription>
        </DialogHeader>

        {acceptUrl ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Share this link with the invitee. It expires in 7 days.
            </p>
            <div className="flex items-center gap-2">
              <Input readOnly value={acceptUrl} />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <DialogFooter>
              <Button type="button" onClick={() => handleOpenChange(false)}>
                Done
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel data-error={!!formError?.errors?.email}>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        {...field}
                        autoComplete="off"
                        aria-invalid={!!formError?.errors?.email}
                      />
                    </FormControl>
                    <FormMessage />
                    <InputError message={formError?.errors?.email} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <select className={selectClassName} {...field}>
                        {ASSIGNABLE_POSITIONS.map((position) => (
                          <option key={position} value={position}>
                            {position}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                    <InputError message={formError?.errors?.position} />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Creating..." : "Create invite link"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialog;
