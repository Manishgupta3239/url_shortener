"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Link,
  BarChart3,
  Settings,
  ArrowRight,
  Copy,
  Globe,
  Shield,
  TrendingUp,
  Users,
  Star,
  CheckCircle,
  Crown,
  Calendar,
  MousePointer,
  Eye,
  Trash2,
  Plus,
  Lock,
  AlertTriangle,
  Gift,
} from "lucide-react";
import { userType } from "../../types/userType";
import { useUrlStore } from "@/store/AuthStore";
import { statsType } from "../../types/urlType";
import { useRouter } from "next/navigation";

const UserDashboard = ({ User }: { User: userType }) => {
  const [copiedLink, setCopiedLink] = useState("");
  const { getUrls, url ,loading} = useUrlStore();
  const router = useRouter()
  
  useEffect(() => {
    getUrls();
  }, [getUrls]);

  // Mock user data - FREE USER
  const user = {
    name: "Sarah Wilson",
    email: "sarah@example.com",
    plan: "free", // Changed to free
    avatar: "SW",
    joinDate: "December 2024",
    linksCreated: 42, // Close to limit
    totalClicks: 850, // Close to limit
    clicksToday: 23,
  };

  const stats: statsType[] = [
    {
      title: "Links Used",
      value: `${url.length}/${User.credits}`,
      change: "+8%",
      icon: Link,
      color: "from-cyan-500 to-blue-500",
      bgColor: "from-cyan-500/10 to-blue-500/10",
      isLimited: User.plan == "Pro" ? false : true,
      percentage:
        (url.length / User.credits) * 100,
    },
    {
      title: "Monthly Clicks",
      value: `${user.totalClicks}/1,000`,
      change: "+15%",
      icon: MousePointer,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/10 to-pink-500/10",
      isLimited: User.plan == "Pro" ? false : true,
      percentage: (user.totalClicks / 1000) * 100,
    },
    {
      title: "Clicks Today",
      value: user.clicksToday,
      change: "+12%",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/10 to-emerald-500/10",
      isLimited: User.plan == "Pro" ? false : true,
    },
    {
      title: "Analytics",
      value: "Basic",
      change: "Limited",
      icon: Eye,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-500/10 to-red-500/10",
      isLimited: User.plan == "Pro" ? false : true,
      isFeature: true,
    },
  ];

  const ProFeatures = [
    {
      icon: Link,
      title: "Unlimited Links",
      description: "Create as many short links as you need",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Detailed insights with charts and graphs",
    },
    {
      icon: Globe,
      title: "Custom Domains",
      description: "Use your own branded domain",
    },
    {
      icon: Shield,
      title: "Password Protection",
      description: "Secure your links with passwords",
    },
    {
      icon: Calendar,
      title: "Link Expiration",
      description: "Set expiry dates for your links",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share and manage links with your team",
    },
  ];

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(url);
    setTimeout(() => setCopiedLink(""), 2000);
  };

  const isNearLimit = (current: number, limit: number) =>current / limit >= 0.8;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navbar */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upgrade Banner */}
        {User?.plan == "free" && (
          <div className="mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl"></div>
              <div className="relative p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl backdrop-blur-sm">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start space-x-4 mb-4 lg:mb-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        🎉 Upgrade to Pro and unlock everything!
                      </h3>
                      <p className="text-white/80 mb-3">
                        You&apos;re using {user.linksCreated}/50 links and{" "}
                        {user.totalClicks}/1,000 clicks. Upgrade now for
                        unlimited links, advanced analytics, and premium
                        features.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-white/90 text-sm">
                          Unlimited Links
                        </span>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-white/90 text-sm">
                          Advanced Analytics
                        </span>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-white/90 text-sm">
                          Custom Domains
                        </span>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-white/90 text-sm">
                          + Much More
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                      <Gift className="w-5 h-5" />
                      <span>Upgrade to Pro</span>
                    </button>
                    <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-medium hover:bg-white/20 transition-all duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              {User?.plan === "Pro" ? (
                <Crown className="w-6 h-6 text-yellow-400" />
              ) : (
                ""
              )}
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {User?.name}! 👋
              </h1>
              <p className="text-white/70">
                Here&apos;s what&apos;s happening with your links today
              </p>
            </div>

            {/* Plan Status Card */}
            <div className="mt-4 sm:mt-0">
              <div
                className={`relative p-4 rounded-xl border ${
                  User?.plan == "Pro"
                    ? "bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30"
                    : "bg-white/5 border-white/20"
                } backdrop-blur-sm`}
              >
                <div className="flex items-center space-x-3">
                  {User?.plan == "Pro" ? (
                    <Crown className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <Star className="w-6 h-6 text-white/70" />
                  )}
                  <div>
                    <div
                      className={`font-semibold ${
                        User?.plan == "Pro" ? "text-yellow-400" : "text-white"
                      }`}
                    >
                      {User?.plan} Plan
                    </div>
                    <div className="text-sm text-white/60">
                      {User?.plan == "free"
                        ? "Upgrade to unlock more features"
                        : "All features unlocked"}
                    </div>
                  </div>
                  {User?.plan == "free" && (
                    <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300">
                      Upgrade
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Usage Warning */}
            {User?.plan == "free" &&
              (isNearLimit(user.linksCreated, 50) ||
                isNearLimit(user.totalClicks, 1000)) && (
                <div className="mt-4 sm:mt-0">
                  <div className="relative p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                      <div>
                        <div className="font-semibold text-red-400">
                          Approaching Limits
                        </div>
                        <div className="text-sm text-white/60">
                          {isNearLimit(url.length, 15) &&
                            `${15 - url.length} links remaining`}
                          {isNearLimit(user.totalClicks, 1000) &&
                            ` • ${1000 - user.totalClicks} clicks left`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isNearLimitStat =
              stat.isLimited &&
              stat.percentage !== undefined &&
              stat.percentage >= 80;

            return (
              <div key={index} className="group relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300`}
                ></div>
                <div
                  className={`relative p-6 bg-white/5 backdrop-blur-sm border rounded-2xl hover:bg-white/10 transition-all duration-300 ${
                    isNearLimitStat ? "border-red-500/30" : "border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center relative`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                      {stat.isLimited && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Lock className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        stat.isFeature
                          ? "text-yellow-400"
                          : isNearLimitStat
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-sm mb-2">{stat.title}</div>

                  {stat.isLimited && stat.percentage && (
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          stat.percentage >= 90
                            ? "bg-gradient-to-r from-red-500 to-red-600"
                            : stat.percentage >= 80
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                            : "bg-gradient-to-r from-cyan-500 to-blue-500"
                        }`}
                        style={{ width: `${Math.min(stat.percentage, 100)}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Links */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-white">
                    Recent Links
                  </h3>
                  <button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      user.linksCreated >= 50
                        ? "bg-white/10 text-white/50 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg"
                    }`}
                    disabled={url.length >= User.credits}
                    onClick={()=>router.push('/')}
                  >
                    <Plus className="w-4 h-4" />
                    <span > 
                      {url.length >= User.credits ? "Limit Reached" : "New Link"}
                    </span>
                  </button>
                </div>

                <div className="space-y-4">
                  {loading ? 
                  (<div className="items-center translate-x-[50%]"> 
  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>) : (url.map((link, index) => (
                    <div
                      key={index}
                      className="group p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <Link className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-cyan-300 font-mono text-sm">
                              {link.shortUrl}
                            </div>
                            <div className="text-white/50 text-xs truncate max-w-xs">
                              {link.longUrl}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="text-white/70 text-sm">
                            {link.clicks} clicks
                          </div>
                          <button
                            onClick={() => copyToClipboard(link.shortUrl)}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                          >
                            {copiedLink === link?.shortUrl ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-white/70" />
                            )}
                          </button>
                          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 relative group">
                            <BarChart3 className="w-4 h-4 text-white/70" />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Lock className="w-2.5 h-2.5 text-white" />
                            </div>
                          </button>
                          <button className="p-2 bg-white/10 hover:bg-red-500/20 rounded-lg transition-colors duration-200 group">
                            <Trash2 className="w-4 h-4 text-white/70 group-hover:text-red-400" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-white/50">
                        <span>
                          Created on{" "}
                          {new Date(link.createdAt).toLocaleDateString(
                            "default",
                            {
                              month: "long",
                              year: "numeric",
                              day: "2-digit",
                            }
                          )}
                        </span>
                        <span className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>Active </span>

                          <span className="text-red-500 text-[17px]">
                            Expires in{" "}
                            {Math.ceil(
                              (new Date(link?.expiry).getTime() - Date.now()) /
                                (1000 * 60 * 60 * 24)
                            )}{" "}
                            days
                          </span>
                        </span>
                      </div>
                    </div>
                  )))}
                </div>

                <div className="mt-6 text-center">
                  <button className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center space-x-2 mx-auto">
                    <span>View All Links ({url?.length}/50)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>


          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upgrade CTA */}
            {User?.plan == "free" && (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl blur-xl"></div>
                <div className="relative p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl backdrop-blur-sm">
                  <div className="text-center">
                    <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-white mb-2">
                      Unlock Pro Features
                    </h3>
                    <p className="text-white/80 text-sm mb-4">
                      Get unlimited links, advanced analytics, and more!
                    </p>
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-105 transition-all duration-300 mb-3">
                      Upgrade Now
                    </button>
                    <p className="text-white/60 text-xs">
                      Starting at $9/month
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Pro Features Preview */}
            {User?.plan == "free" ? (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-50"></div>
                <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Lock className="w-5 h-5 text-yellow-400" />
                    <span>Pro Features</span>
                  </h3>
                  <div className="space-y-3">
                    {ProFeatures.slice(0, 4).map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg border border-white/10"
                        >
                          <Icon className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-white font-medium text-sm">
                              {feature.title}
                            </div>
                            <div className="text-white/60 text-xs">
                              {feature.description}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>See All Features</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-50"></div>
                <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors duration-200">
                      <Link className="w-5 h-5 text-cyan-400" />
                      <span className="text-white">Create Short Link</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors duration-200">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                      <span className="text-white">View Analytics</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors duration-200">
                      <Settings className="w-5 h-5 text-blue-400" />
                      <span className="text-white">Account Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* plan usage */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Plan Usage
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/70">Links Created</span>
                      <span className="text-white">
                        {url.length}
                      </span>
                    </div>
                    {User?.plan === "free" && (
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(url.length / 10) * 100}%` }}
                        ></div>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/70">Monthly Clicks</span>
                      <span className="text-white">
                        {/* {user.totalClicks.toLocaleString()} / {planLimits[user.plan].clicks} */}
                      </span>
                    </div>
                    {User?.plan === "free" && (
                      <div className="w-full bg-white/10 rounded-full h-2">
                        {/* <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(user?.totalClicks / planLimits.free.clicks) * 100}%` }}
                        ></div> */}
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Analytics</span>
                      {/* <span className="text-white">{planLimits[user.plan].analytics}</span> */}
                    </div>
                  </div>
                </div>

                {User?.plan === "free" && (
                  <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                    Upgrade to Pro
                  </button>
                )}
              </div>
            </div>

            {/* Account Info */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Account Info
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {User?.image && (
                        <Image
                          src={User?.image}
                          alt="User Photo"
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <div className="text-white font-medium">{User?.name}</div>
                      <div className="text-white/60 text-sm">{User?.email}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Member since</span>
                      <span className="text-white">
                        {new Date(User.createdAt).toLocaleDateString(
                          "default",
                          {
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Plan</span>
                      <div className="flex items-center space-x-2">
                        <span
                          className={
                            User?.plan === "Pro"
                              ? "text-yellow-400"
                              : "text-white"
                          }
                        >
                          {User?.plan}
                        </span>
                        {User?.plan == "free" && (
                          <button className="text-xs px-2 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all">
                            Upgrade
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
