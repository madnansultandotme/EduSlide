"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Upload,
  TrendingUp,
  BookOpen,
  Download,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Trash2,
  Edit,
  User,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { getDashboardStats } from "../../lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
      const userId = localStorage.getItem("userId");
      if (userId) {
        getDashboardStats(userId)
          .then(data => setDashData(data))
          .catch(console.error)
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-700 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Presentations",
      value: dashData?.totalPresentations ?? "0",
      change: "+12%",
      icon: FileText,
      color: "bg-blue-500"
    },
    {
      label: "Topics Created",
      value: dashData?.totalTopics ?? "0",
      change: "+8%",
      icon: BookOpen,
      color: "bg-indigo-500"
    },
    {
      label: "Files Uploaded",
      value: dashData?.totalUploads ?? "0",
      change: "+15%",
      icon: Upload,
      color: "bg-purple-500"
    },
    {
      label: "Downloads",
      value: dashData?.totalDownloads ?? "0",
      change: "+23%",
      icon: Download,
      color: "bg-green-500"
    }
  ];

  const recentPresentations = dashData?.recentPresentations || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Educator Dashboard
              </h1>
              <p className="text-slate-600">
                Manage your presentations and topics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-all duration-200"
              >
                <User className="w-5 h-5" />
                Profile
              </Link>
              <Link
                href="/upload"
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                New Presentation
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-slate-800 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm mb-6">
          <div className="border-b border-slate-200">
            <div className="flex overflow-x-auto">
              {[
                { id: "overview", label: "Overview", icon: LayoutDashboard },
                { id: "presentations", label: "Presentations", icon: FileText },
                { id: "topics", label: "Topics", icon: BookOpen },
                { id: "analytics", label: "Analytics", icon: TrendingUp }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                      activeTab === tab.id
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-slate-600 hover:text-slate-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search presentations..."
                      className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-200">
                    <Filter className="w-5 h-5" />
                    Filter
                  </button>
                </div>

                {/* Recent Presentations Table */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">
                    Recent Presentations
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                            Title
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                            Topic
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                            Slides
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                            Status
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                            Date
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentPresentations.map((presentation) => (
                          <tr
                            key={presentation.id}
                            className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                          >
                            <td className="py-4 px-4">
                              <div className="font-medium text-slate-800">
                                {presentation.title}
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
                                {presentation.topic || 'General'}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-slate-600">
                              {presentation.slides_count || 0} slides
                            </td>
                            <td className="py-4 px-4">
                              {presentation.status === "completed" ? (
                                <span className="flex items-center gap-1 text-green-600">
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span className="text-sm font-medium">Completed</span>
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-amber-600">
                                  <Clock className="w-4 h-4" />
                                  <span className="text-sm font-medium">Processing</span>
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-4 text-slate-600 text-sm">
                              {presentation.created_at ? new Date(presentation.created_at).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                  <Eye className="w-4 h-4 text-slate-600" />
                                </button>
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                  <Download className="w-4 h-4 text-slate-600" />
                                </button>
                                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                  <MoreVertical className="w-4 h-4 text-slate-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "presentations" && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Presentations Management
                </h3>
                <p className="text-slate-600 mb-6">
                  View and manage all your generated presentations
                </p>
                <Link
                  href="/dashboard/presentations"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200"
                >
                  <FileText className="w-5 h-5" />
                  View All Presentations
                </Link>
              </div>
            )}

            {activeTab === "topics" && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Topics Management
                </h3>
                <p className="text-slate-600 mb-6">
                  Organize and manage your teaching topics
                </p>
                <Link
                  href="/dashboard/topics"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200"
                >
                  <Plus className="w-5 h-5" />
                  Add New Topic
                </Link>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="text-center py-12">
                <TrendingUp className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  Analytics & Reports
                </h3>
                <p className="text-slate-600 mb-6">
                  View detailed analytics and usage reports
                </p>
                <Link
                  href="/dashboard/analytics"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200"
                >
                  <TrendingUp className="w-5 h-5" />
                  View Analytics
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
