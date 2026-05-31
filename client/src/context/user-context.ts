import { createContext, Dispatch, SetStateAction } from "react";

interface IUserContextProps {
  user: TUser | null;
  setUser: Dispatch<SetStateAction<TUser | null>>;
}

export type TUser = {
  name: string;
  email: string;
  organization?: {
    id: string;
    name: string;
  };
};

export const UserContext = createContext<IUserContextProps | undefined>(
  undefined
);
