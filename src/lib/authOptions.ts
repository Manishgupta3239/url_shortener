// lib/authOptions.ts
import { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import ConnectDb from "@/lib/connection";
import { User } from "@/models/UserModel/user";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      await ConnectDb();
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({ email: user.email, name: user.name });
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        await ConnectDb();
        const usr = await User.findOne({ email: user.email });
        if (usr) {
          token._id = usr._id.toString();
          token.plan = usr.plan;
          token.createdAt = usr.createdAt;
          token.credits = usr.credits;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user._id = token._id as string;
        session.user.plan = token.plan as string;
        session.user.createdAt = token.createdAt as Date;
        session.user.credits = token.credits as number;
      }
      return session;
    },
  },
};
