import { z } from "zod";
import { acceptInviteFormSchema, inviteFormSchema } from "./schemas";

export type TInviteFormSchema = z.infer<typeof inviteFormSchema>;
export type TAcceptInviteFormSchema = z.infer<typeof acceptInviteFormSchema>;

export type TTeamFormError = {
  message: string;
  errors?: Record<string, string>;
};

export type TMemberUser = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
};

export type TMember = {
  _id: string;
  status: "Active" | "Inactive";
  position: { _id?: string; name: string } | null;
  user: TMemberUser | null;
  createdAt: string;
};

export type TInvitation = {
  _id: string;
  email: string;
  position: { name: string } | null;
  status: string;
  expiresAt: string;
  invitedBy?: { firstName: string; lastName: string } | null;
  createdAt: string;
};
