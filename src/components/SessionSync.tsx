"use client";

import { useAuthStore } from "@/store/AuthStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const SessionSync = () => {
  const { data: session, status } = useSession();
  const { setUser, clearUser} = useAuthStore();

  useEffect(() => {
    console.log("status",status );
    if (status === "authenticated" && session?.user) {
      setUser({
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        photo: session.user.image ?? "",
        plan: session.user.plan ?? "",
        _id: session.user._id ?? "",
        createdAt: session.user.createdAt ?? "",
      });
    } else if (status === "unauthenticated") {
      clearUser();
    }
  }, [session, status, setUser, clearUser]);

  return null;
};
