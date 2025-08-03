"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Link,
  BarChart3,
  History,
  Zap,
  Star,
  LayoutDashboard,
  Crown,
} from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { userType } from "../../types/userType";
import { useUrlStore } from "@/store/AuthStore";
import AuthSpinner from "./Spinner";

const Navbar = ({ user }: { user?: userType }) => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);
  const [loading, setLoading] = useState(false);
  const { getUser, User, loading: load } = useUrlStore();
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, [getUser]);

  const allTabs = [
    {
      id: "shorten",
      label: "Shorten",
      icon: Link,
      href: "/",
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
    },
    {
      id: "history",
      label: "History",
      icon: History,
      href: "/history",
    },
    {
      id: "upgrade",
      label: "Upgrade",
      icon: Crown,
      href: "/payment",
    },
  ];

  const tabs =
    User?.plan === "Pro"
      ? allTabs.filter((tab) => tab.id !== "upgrade")
      : allTabs;

  if (load) {
    return <AuthSpinner />;
  }

  return (
    <nav className="relative bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-xl border-b border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Zap className="h-8 w-8 text-cyan-400 drop-shadow-lg" />
              <div className="absolute inset-0 h-8 w-8 bg-cyan-400/20 rounded-full blur-xl animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              LinkSpark
            </span>
          </div>

          <div className="flex items-center">
            <div className="relative flex bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10">
              <div
                className="pointer-events-none absolute top-1 h-9 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300 ease-out shadow-lg"
                style={{
                  width: `${100 / tabs.length}%`,
                  left: `${
                    (tabs.findIndex((tab) => tab.href === pathname) * 100) /
                      tabs.length +
                    1
                  }%`,
                }}
              ></div>

              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.href;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      router.push(tab.href);
                      setActiveTab(tab.href);
                    }}
                    className={`relative z-10 flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all  ease-out ${
                      isActive
                        ? "text-white shadow-lg"
                        : `${
                            !User
                              ? "hover:blur-[1px] hover:cursor-not-allowed"
                              : "text-white/70 hover:text-white hover:bg-white/10"
                          }`
                    } `}
                    disabled={!User}
                  >
                    <Icon
                      className={`h-4 w-4 ${isActive ? "drop-shadow-sm" : ""}`}
                    />
                    <span className="whitespace-nowrap">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {User ? (
            <div className="flex items-center space-x-4">
              {User.plan === "Pro" ? (
                <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full">
                  <Crown className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-sm font-medium">
                    Pro
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full">
                  <Star className="w-4 h-4 text-white/70" />
                  <span className="text-white/70 text-sm font-medium">
                    {User?.plan}
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user?.image && (
                    <Image
                      src={user.image}
                      alt="User Photo"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  )}
                </div>
                <span className="text-white font-medium hidden sm:block">
                  {user?.name}
                </span>
              </div>
              <button onClick={() => signOut({ callbackUrl: "/" })}>
                <LogOut />
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <button
                className="relative group px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-medium transition-all duration-300 ease-out hover:shadow-lg hover:shadow-cyan-500/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                onClick={() => {
                  signIn(
                    "google",
                    { callbackUrl: "/" },
                    { prompt: "select_account" }
                  );
                  setLoading(true);
                }}
              >
                <span className="relative z-10">
                  {loading ? "SigningIn..." : "SignIn"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
    </nav>
  );
};

export default Navbar;
