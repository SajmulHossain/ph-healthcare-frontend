import { UserRole } from "./user.interface";

export interface NavItems {
  title: string;
  href: string;
  icon: string;
  badge?: string | number;
  description?: string;
  roles: UserRole;
}

export interface NavSection {
  title?: string;
  items: NavItems[];
};
