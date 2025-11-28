export type UserRole = "DOCTOR" | "PATIENT" | "ADMIN";

export interface IUser {
    name: string;
    email: string;
    role: UserRole;
    avatar?: string
}