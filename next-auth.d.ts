import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  
  role: UserRole;
  
  isOAuth: boolean;
  teacherAccess: boolean;
  DateOfBirth: Date | null;
  filier: string;
  origin: string;
  about: string;
  createdAt: Date;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}