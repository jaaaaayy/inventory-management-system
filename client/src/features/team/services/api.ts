import { API_URL } from "@/config/env";
import { TAcceptInviteFormSchema, TInviteFormSchema } from "../types";

const jsonHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const fetchMembers = async () => {
  const response = await fetch(`${API_URL}api/members`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
};

export const updateMember = async (
  id: string,
  update: { position?: string; status?: "Active" | "Inactive" }
) => {
  const response = await fetch(`${API_URL}api/members/${id}`, {
    method: "PATCH",
    headers: jsonHeaders,
    credentials: "include",
    body: JSON.stringify(update),
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
};

export const removeMember = async (id: string) => {
  const response = await fetch(`${API_URL}api/members/${id}`, {
    method: "DELETE",
    headers: jsonHeaders,
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
};

export const fetchInvitations = async () => {
  const response = await fetch(`${API_URL}api/invitations`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
};

export const createInvitation = async (invite: TInviteFormSchema) => {
  const response = await fetch(`${API_URL}api/invitations`, {
    method: "POST",
    headers: jsonHeaders,
    credentials: "include",
    body: JSON.stringify(invite),
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
};

export const revokeInvitation = async (id: string) => {
  const response = await fetch(`${API_URL}api/invitations/${id}`, {
    method: "DELETE",
    headers: jsonHeaders,
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
};

export const fetchInvitationByToken = async (token: string) => {
  const response = await fetch(`${API_URL}api/invitations/accept/${token}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
};

export const acceptInvitation = async (
  token: string,
  payload: TAcceptInviteFormSchema
) => {
  const response = await fetch(`${API_URL}api/invitations/accept/${token}`, {
    method: "POST",
    headers: jsonHeaders,
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
};
