'use client'
import React, { useState } from 'react';
import Image from "next/image";
import { 
  Link, BarChart3, Settings, ArrowRight, Copy, TrendingUp, Star, CheckCircle, Crown, 
   MousePointer, Eye, Trash2, 
  Plus
} from 'lucide-react';
import { userType } from '../../types/userType';

const Dashboard = ({user}:{user:userType}) => {
  // const [activeTab, setActiveTab] = useState('analytics');
  const [copiedLink, setCopiedLink] = useState('');
  console.log("user",user)

  const stats = [
    { 
      title: 'Total Links', 
      // value: user.linksCreated, 
      change: '+12%', 
      icon: Link, 
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-500/10 to-blue-500/10'
    },
    { 
      title: 'Total Clicks', 
      // value: user.totalClicks.toLocaleString(), 
      change: '+24%', 
      icon: MousePointer, 
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10'
    },
    { 
      title: 'Clicks Today', 
      // value: user.clicksToday, 
      change: '+8%', 
      icon: TrendingUp, 
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/10 to-emerald-500/10'
    },
    { 
      title: 'Click Rate', 
      value: '87%', 
      change: '+5%', 
      icon: Eye, 
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-500/10 to-red-500/10'
    }
  ];

  const recentLinks = [
    {
      id: 1,
      shortUrl: 'lnk.spark/abc123',
      originalUrl: 'https://example.com/very-long-url-that-needs-shortening',
      clicks: 1250,
      created: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      shortUrl: 'lnk.spark/xyz789',
      originalUrl: 'https://github.com/user/repository/issues/123',
      clicks: 892,
      created: '1 day ago',
      status: 'active'
    },
    {
      id: 3,
      shortUrl: 'lnk.spark/def456',
      originalUrl: 'https://docs.example.com/api/documentation',
      clicks: 543,
      created: '3 days ago',
      status: 'active'
    },
    {
      id: 4,
      shortUrl: 'lnk.spark/ghi012',
      originalUrl: 'https://marketplace.example.com/product/12345',
      clicks: 234,
      created: '1 week ago',
      status: 'active'
    }
  ];

  

  const copyToClipboard = (url:string) => {
    navigator.clipboard.writeText(`https://${url}`);
    setCopiedLink(url);
    setTimeout(() => setCopiedLink(''), 2000);
  };

  const planLimits = {
    Free: { links: 50, clicks: 1000, analytics: 'Basic' },
    Pro: { links: 'Unlimited', clicks: 'Unlimited', analytics: 'Advanced' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-white/70">
              Here &apos s what &apos s happening with your links today
              </p>
            </div>
            
            {/* Plan Status Card */}
            <div className="mt-4 sm:mt-0">
              <div className={`relative p-4 rounded-xl border ${
                user.plan === 'Pro' 
                  ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30' 
                  : 'bg-white/5 border-white/20'
              } backdrop-blur-sm`}>
                <div className="flex items-center space-x-3">
                  {user.plan === 'Pro' ? (
                    <Crown className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <Star className="w-6 h-6 text-white/70" />
                  )}
                  <div>
                    <div className={`font-semibold ${
                      user.plan === 'Pro' ? 'text-yellow-400' : 'text-white'
                    }`}>
                      {user.plan} Plan
                    </div>
                    <div className="text-sm text-white/60">
                      {user.plan === 'Free' ? 'Upgrade to unlock more features' : 'All features unlocked'}
                    </div>
                  </div>
                  {user.plan === 'Free' && (
                    <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300">
                      Upgrade
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300`}></div>
                <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.title}</div>
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
                  <h3 className="text-xl font-semibold text-white">Recent Links</h3>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                    <Plus className="w-4 h-4" />
                    <span>New Link</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {recentLinks.map((link) => (
                    <div key={link.id} className="group p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <Link className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="text-cyan-300 font-mono text-sm">{link.shortUrl}</div>
                            <div className="text-white/50 text-xs truncate max-w-xs">{link.originalUrl}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="text-white/70 text-sm">
                            {link.clicks.toLocaleString()} clicks
                          </div>
                          <button
                            onClick={() => copyToClipboard(link.shortUrl)}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                          >
                            {copiedLink === link.shortUrl ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4 text-white/70" />
                            )}
                          </button>
                          <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200">
                            <BarChart3 className="w-4 h-4 text-white/70" />
                          </button>
                          <button className="p-2 bg-white/10 hover:bg-red-500/20 rounded-lg transition-colors duration-200 group">
                            <Trash2 className="w-4 h-4 text-white/70 group-hover:text-red-400" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-white/50">
                        <span>Created {link.created}</span>
                        <span className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>Active</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center space-x-2 mx-auto">
                    <span>View All Links</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
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

            {/* Plan Usage */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <h3 className="text-lg font-semibold text-white mb-4">Plan Usage</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/70">Links Created</span>
                      <span className="text-white">
                        {/* {user?.linksCreated} / {planLimits[user.plan].links} */}
                      </span>
                    </div>
                    {user.plan === 'Free' && (
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(user?.linksCreated / planLimits.Free.links) * 100}%` }}
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
                    {user.plan === 'Free' && (
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(user?.totalClicks / planLimits.Free.clicks) * 100}%` }}
                        ></div>
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

                {user.plan === 'Free' && (
                  <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                    Upgrade to Pro
                  </button>
                )}
              </div>
            </div>

            {/* Account Info */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                <h3 className="text-lg font-semibold text-white mb-4">Account Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                       {user?.image && (
                    <Image
                      src={user?.image}
                      alt="User Photo"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  )}
                    </div>
                    <div>
                      <div className="text-white font-medium">{user.name}</div>
                      <div className="text-white/60 text-sm">{user.email}</div>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Member since</span>
                      <span className="text-white">{new Date(user.createdAt).toLocaleDateString('default',{
                        month:'long',
                        year:'numeric'
                      })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Plan</span>
                      <span className={user.plan === 'Pro' ? 'text-yellow-400' : 'text-white'}>
                        {user.plan}
                      </span>
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

export default Dashboard;