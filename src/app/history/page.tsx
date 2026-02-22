"use client";
import React, { useState, useEffect } from "react";
import {
  Link,
  Copy,
  ExternalLink,
  Eye,
  Calendar,
  Search,
  // Filter,
  Trash2,
  BarChart3,
  Clock,
  Globe,
} from "lucide-react";
import { useUrlStore } from "@/store/AuthStore";
import AuthSpinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [copiedId, setCopiedId] = useState("");
  const { getUrls, getAnalytics, totalUrls, totalClicks, url, loading, deleteUrl } = useUrlStore();
  const router = useRouter();
  useEffect(() => {
    getUrls();
    getAnalytics();
  }, [getUrls, getAnalytics]);



  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredHistory = url.filter((item) => {
    const matchesSearch =
      item.longUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.shortUrl.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterBy === "all" ||
      (filterBy === "active" && new Date(item.expiry).getTime() > Date.now()) ||
      (filterBy === "inactive" && new Date(item.expiry).getTime() < Date.now());

    return matchesSearch && matchesFilter;
  });

  const sortedHistory = [...filteredHistory].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
      case "oldest":
        return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
      case "most-clicks":
        return b.clicks - a.clicks;
      case "least-clicks":
        return a.clicks - b.clicks;
      default:
        return 0;
    }
  });

  return (
    loading ? (<AuthSpinner />) :
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              URL History
            </h1>
            <p className="text-white/70 text-lg">
              Manage and track all your shortened URLs
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg">
                  <Link className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Total Links</p>
                  <p className="text-2xl font-bold text-white">
                    {totalUrls}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Total Clicks</p>
                  <p className="text-2xl font-bold text-white">
                    {totalClicks}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/70 text-sm">Active Links</p>
                  <p className="text-2xl font-bold text-white">
                    {url.filter((url) => new Date(url.expiry).getTime() > Date.now()).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title, URL, or short code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div className="flex gap-3">
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-4 py-3 bg-transparent border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="all" className="text-black">All Links</option>
                  <option value="active" className="text-black">Active</option>
                  <option value="inactive" className="text-black">Inactive</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-transparent border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  <option value="newest" className="text-black">Newest First</option>
                  <option value="oldest" className="text-black">Oldest First</option>
                  <option value="most-clicks" className="text-black">Most Clicks</option>
                  <option value="least-clicks" className="text-black">Least Clicks</option>
                </select>
              </div>
            </div>
          </div>

          {/* History List */}
          <div className="space-y-4">
            {sortedHistory.map((url) => (
              <div
                key={url._id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${new Date(url.expiry).getTime() > Date.now() ? "bg-green-500" : "bg-red-500"
                          }`}
                      ></div>
                      <h3 className="text-lg font-semibold text-white truncate">
                        {url.shortUrl}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-white/50" />
                        <span className="text-white/70 text-sm truncate">
                          {url.longUrl}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Link className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-400 text-sm font-medium">
                          {url.shortUrl}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Created: {formatDate(url.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        {/* <span>Last clicked: {formatDate(item.lastClicked)}</span> */}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="flex items-center space-x-1 text-white/70">
                        <Eye className="w-4 h-4" />
                        <span className="text-lg font-bold text-white">
                          {url.clicks}
                        </span>
                      </div>
                      <span className="text-xs text-white/50">clicks</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleCopy(url.shortUrl, url._id)}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 group"
                        title="Copy short URL"
                      >
                        <Copy
                          className={`w-4 h-4 transition-colors duration-200 ${copiedId === url._id
                              ? "text-green-400"
                              : "text-white/70 group-hover:text-white"
                            }`}
                        />
                      </button>

                      <button
                        onClick={() => window.open(url.longUrl, "_blank")}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 group"
                        title="Open original URL"
                      >
                        <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-200" />
                      </button>

                      <button
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 group"
                        title="View analytics"
                        onClick={() => router.push(`/analytics?id=${url._id}`)
                        }
                      >
                        <BarChart3 className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-200" />
                      </button>

                      <button
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-all duration-200 group"
                        title="Delete URL"
                        onClick={() => deleteUrl(url._id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300 transition-colors duration-200" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedHistory.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white/50" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No URLs found
              </h3>
              <p className="text-white/70">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
  );
};

export default HistoryPage;
