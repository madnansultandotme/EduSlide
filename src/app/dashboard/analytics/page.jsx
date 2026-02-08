"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  TrendingUp,
  Download,
  FileText,
  Users,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import Link from "next/link";
import { getAnalyticsStats } from "../../../lib/api";

export default function AnalyticsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [timeRange, setTimeRange] = useState("7days");
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
      const userId = localStorage.getItem("userId");
      if (userId) {
        getAnalyticsStats(userId)
          .then(data => setAnalyticsData(data))
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
      label: "Total Views",
      value: analyticsData?.totalViews?.toLocaleString() || "0",
      change: "+18.2%",
      icon: Activity,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      label: "Downloads",
      value: analyticsData?.totalDownloads?.toLocaleString() || "0",
      change: "+12.5%",
      icon: Download,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      label: "Presentations",
      value: analyticsData?.totalPresentations?.toString() || "0",
      change: "+8.3%",
      icon: FileText,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    },
    {
      label: "Topics",
      value: analyticsData?.totalTopics?.toString() || "0",
      change: "+23.1%",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  const topPresentations = (analyticsData?.topPresentations || []).map(p => ({
    title: p.title,
    views: p.views || 0,
    downloads: p.downloads || 0,
  }));

  const categoryData = analyticsData?.categoryData || [];

  const activityData = [
    { day: "Mon", presentations: 12, downloads: 34 },
    { day: "Tue", presentations: 15, downloads: 42 },
    { day: "Wed", presentations: 8, downloads: 28 },
    { day: "Thu", presentations: 18, downloads: 51 },
    { day: "Fri", presentations: 22, downloads: 67 },
    { day: "Sat", presentations: 10, downloads: 29 },
    { day: "Sun", presentations: 7, downloads: 18 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-indigo-600 hover:text-indigo-700 font-medium mb-2 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Analytics & Reports
              </h1>
              <p className="text-slate-600">
                Track your presentation performance and usage
              </p>
            </div>
            <div className="flex gap-2">
              {["7days", "30days", "90days"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    timeRange === range
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {range === "7days" ? "7 Days" : range === "30days" ? "30 Days" : "90 Days"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Activity Chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-800">
                Weekly Activity
              </h3>
              <BarChart3 className="w-5 h-5 text-slate-400" />
            </div>
            <div className="space-y-4">
              {activityData.map((day, index) => {
                const maxValue = Math.max(...activityData.map(d => d.presentations + d.downloads));
                const percentage = ((day.presentations + day.downloads) / maxValue) * 100;
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{day.day}</span>
                      <span className="text-sm text-slate-600">
                        {day.presentations + day.downloads} total
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-800">
                Category Distribution
              </h3>
              <PieChart className="w-5 h-5 text-slate-400" />
            </div>
            <div className="space-y-4">
              {categoryData.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{category.name}</span>
                    <span className="text-sm text-slate-600">
                      {category.count} ({category.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Presentations */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800">
              Top Performing Presentations
            </h3>
            <TrendingUp className="w-5 h-5 text-slate-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Rank
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Title
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Views
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Downloads
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">
                    Engagement
                  </th>
                </tr>
              </thead>
              <tbody>
                {topPresentations.map((presentation, index) => {
                  const engagement = ((presentation.downloads / presentation.views) * 100).toFixed(1);
                  return (
                    <tr
                      key={index}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold flex items-center justify-center">
                          {index + 1}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-slate-800">
                          {presentation.title}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {presentation.views}
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {presentation.downloads}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[100px]">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${engagement}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-700">
                            {engagement}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
