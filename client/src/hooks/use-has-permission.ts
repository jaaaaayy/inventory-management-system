import { useUser } from "./use-user";

export const usePermissions = () => {
  const { user } = useUser();
  const granted = new Set(user?.permissions ?? []);

  return {
    can: (key: string) => granted.has(key),
  };
};

export const useHasPermission = (key: string) => {
  const { can } = usePermissions();
  return can(key);
};
