'use client' ;

import React, { useState } from 'react';
import { Link, TrendingUp, Globe, Eye, MousePointer, Monitor, Calendar} from 'lucide-react';
import {  AreaChart, Area,  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect } from 'react';
import { useUrlStore } from '@/store/AuthStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AuthSpinner from '@/components/Spinner'
import PaymentPage from '../payment/page';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const {getAnalytics , countries , devices ,totalClicks ,url,getUrls , loading ,clicksToday} = useUrlStore();
  const id =  useSearchParams().get("id");
  const {data : session , status} = useSession();
  const router = useRouter();
  const {getUser ,  User} = useUrlStore();

  useEffect(() => {
    getUrls();
    getUser();
    getAnalytics(timeRange , id);
  }, [getAnalytics , getUrls , id , timeRange,getUser]);
  

   if (status === "loading" || !User) return <AuthSpinner/>;

  if (!session){
    return <p>You are not logged in</p>;
  }
  
    if(User?.plan !== 'Pro'){
      return <PaymentPage/>
    }
  
  
type MetricCardProps = {
  title: string;
  value: string | number;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

  // Sample data
  const clicksData = [
    { date: '06/01', clicks: 120, uniqueClicks: 85 },
    { date: '06/02', clicks: 150, uniqueClicks: 110 },
    { date: '06/03', clicks: 89, uniqueClicks: 65 },
    { date: '06/04', clicks: 200, uniqueClicks: 145 },
    { date: '06/05', clicks: 175, uniqueClicks: 125 },
    { date: '06/06', clicks: 220, uniqueClicks: 165 },
    { date: '06/07', clicks: 180, uniqueClicks: 130 }
  ];

  const deviceData = [
    { name: devices[0]?._id, value: devices[0]?.count, color: '#06b6d4' },
    { name: devices[1]?._id, value: devices[1]?.count, color: '#8b5cf6' },
    { name: devices[2]?._id, value: devices[2]?.count, color: '#ec4899' }
  ];

  const MetricCard:React.FC<MetricCardProps>  = ({ title, value, icon:Icon = () => null}) => (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-white/10">
            <Icon className="h-6 w-6 text-cyan-400" />
          </div>
          {/* {change && (
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
              change > 0 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {change > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              <span>{Math.abs(change)}%</span>
            </div>
          )} */}
        </div>
        <div className="space-y-1">
        {loading ? ( <div className="items-center translate-x-[50%]">
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>):(<p className="text-2xl font-bold text-white">{value}</p>)}
          <p className="text-sm text-white/60">{title}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
            <p className="text-white/60 mt-2">Track your link performance and audience insights</p>
          </div>
          
          {/* Time Range Selector */}
          <div className="flex bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10">
            {['1d', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Clicks"
            value= {totalClicks }
           
            icon={MousePointer}
          />
          <MetricCard
            title="Clicks Today"
            value={`${clicksToday}`}
           
            icon={Eye}
          />
          <MetricCard
            title="Links Created"
            value={url.length}
           
            icon={Link}
          />
          <MetricCard
            title="Click Rate"
            value="3.2"
           
            icon={TrendingUp}
            
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Clicks Over Time */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-blue-600/10 to-purple-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Clicks Over Time</h3>
                <Calendar className="h-5 w-5 text-cyan-400" />
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={clicksData}>
                  <defs>
                    <linearGradient id="clicksGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="uniqueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="date" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(15, 23, 42, 0.9)', 
                      border: '1px solid rgba(255,255,255,0.1)', 
                      borderRadius: '12px',
                      backdropFilter: 'blur(12px)'
                    }} 
                  />
                  <Area type="monotone" dataKey="clicks" stroke="#06b6d4" fillOpacity={1} fill="url(#clicksGradient)" strokeWidth={2} />
                  <Area type="monotone" dataKey="uniqueClicks" stroke="#8b5cf6" fillOpacity={1} fill="url(#uniqueGradient)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-cyan-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Device Types</h3>
                <Monitor className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(15, 23, 42, 0.9)', 
                        border: '1px solid rgba(255,255,255,0.1)', 
                        borderRadius: '12px',
                        backdropFilter: 'blur(12px)'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6 mt-4">
                {deviceData.map((device, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }}></div>
                    <span className="text-sm text-white/70">{device.name} {((device.value/totalClicks )*100).toFixed(2)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Links & Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Performing Links */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 via-cyan-600/10 to-blue-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Top Performing Links</h3>
                <TrendingUp className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="space-y-4">
                {url.map((link, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300" onClick={()=> router.push(`/analytics?id=${link._id}`)}>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-cyan-400 truncate">{link.shortUrl}</p>
                      <p className="text-xs text-white/60 truncate">{link.longUrl}</p>
                    </div>
                    <div className="flex items-center space-x-4 ml-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-white">{link.clicks}</p>
                        <p className="text-xs text-white/60">clicks</p>
                      </div>
                     
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Geographic Distribution */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 via-purple-600/10 to-cyan-600/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Geographic Distribution</h3>
                <Globe className="h-5 w-5 text-cyan-400" />
              </div>
              <div className="space-y-4">
                {countries.map((country, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{country._id}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-white/60">{country.count}</span>
                        <span className="text-xs text-cyan-400 font-medium">{((country.count/totalClicks)*100).toFixed(2)}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(country.count/totalClicks)*100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Analytics;