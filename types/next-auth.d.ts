// types/next-auth.d.ts

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      photo?: string | null;
      _id?: string;
      plan?: string;
      createdAt?: Date;
      credits: number;
    } & DefaultSession["user"];
  }
}
