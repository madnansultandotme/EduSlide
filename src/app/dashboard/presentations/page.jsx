"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  Edit,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MoreVertical
} from "lucide-react";
import Link from "next/link";

export default function PresentationsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [presentations, setPresentations] = useState([
    {
      id: 1,
      title: "Introduction to Machine Learning",
      topic: "AI & ML",
      slides: 15,
      status: "completed",
      date: "2024-02-07",
      downloads: 12,
      views: 45,
      fileSize: "2.4 MB"
    },
    {
      id: 2,
      title: "World War II History",
      topic: "History",
      slides: 20,
      status: "completed",
      date: "2024-02-06",
      downloads: 8,
      views: 32,
      fileSize: "3.1 MB"
    },
    {
      id: 3,
      title: "Photosynthesis Process",
      topic: "Biology",
      slides: 12,
      status: "processing",
      date: "2024-02-07",
      downloads: 0,
      views: 0,
      fileSize: "1.8 MB"
    },
    {
      id: 4,
      title: "Shakespeare's Plays",
      topic: "Literature",
      slides: 18,
      status: "completed",
      date: "2024-02-05",
      downloads: 15,
      views: 58,
      fileSize: "2.9 MB"
    },
    {
      id: 5,
      title: "Quantum Physics Basics",
      topic: "Physics",
      slides: 16,
      status: "completed",
      date: "2024-02-04",
      downloads: 10,
      views: 38,
      fileSize: "2.6 MB"
    },
    {
      id: 6,
      title: "Ancient Rome Civilization",
      topic: "History",
      slides: 14,
      status: "failed",
      date: "2024-02-03",
      downloads: 0,
      views: 0,
      fileSize: "0 MB"
    }
  ]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this presentation?")) {
      setPresentations(presentations.filter(p => p.id !== id));
    }
  };

  const handleDownload = (presentation) => {
    alert(`Downloading: ${presentation.title}`);
  };

  const filteredPresentations = presentations.filter(p => {
    if (filterStatus === "all") return true;
    return p.status === filterStatus;
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Link
                href="/dashboard"
                className="text-indigo-600 hover:text-indigo-700 font-medium mb-2 inline-block"
              >
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                Presentations Management
              </h1>
              <p className="text-slate-600">
                View and manage all your generated presentations
              </p>
            </div>
            <Link
              href="/upload"
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              New Presentation
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-slate-800">{presentations.length}</div>
              <div className="text-sm text-slate-600">Total Presentations</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600">
                {presentations.filter(p => p.status === "completed").length}
              </div>
              <div className="text-sm text-slate-600">Completed</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-amber-600">
                {presentations.filter(p => p.status === "processing").length}
              </div>
              <div className="text-sm text-slate-600">Processing</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-red-600">
                {presentations.filter(p => p.status === "failed").length}
              </div>
              <div className="text-sm text-slate-600">Failed</div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search presentations..."
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>
              <div className="flex gap-2">
                {["all", "completed", "processing", "failed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 capitalize ${
                      filterStatus === status
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Presentations Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                    Title
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                    Topic
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                    Slides
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                    Stats
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPresentations.map((presentation) => (
                  <tr
                    key={presentation.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="font-medium text-slate-800">
                        {presentation.title}
                      </div>
                      <div className="text-sm text-slate-500">
                        {presentation.fileSize}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
                        {presentation.topic}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      {presentation.slides} slides
                    </td>
                    <td className="py-4 px-6">
                      {presentation.status === "completed" && (
                        <span className="flex items-center gap-2 text-green-600">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-sm font-medium">Completed</span>
                        </span>
                      )}
                      {presentation.status === "processing" && (
                        <span className="flex items-center gap-2 text-amber-600">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">Processing</span>
                        </span>
                      )}
                      {presentation.status === "failed" && (
                        <span className="flex items-center gap-2 text-red-600">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Failed</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm text-slate-600">
                        <div>{presentation.views} views</div>
                        <div>{presentation.downloads} downloads</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        {presentation.date}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => router.push(`/preview?fileId=${presentation.id}`)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4 text-slate-600" />
                        </button>
                        {presentation.status === "completed" && (
                          <button
                            onClick={() => handleDownload(presentation)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4 text-slate-600" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(presentation.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredPresentations.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                No presentations found
              </h3>
              <p className="text-slate-600 mb-6">
                {filterStatus === "all" 
                  ? "Start by creating your first presentation"
                  : `No ${filterStatus} presentations`
                }
              </p>
              {filterStatus === "all" && (
                <Link
                  href="/upload"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200"
                >
                  <Plus className="w-5 h-5" />
                  Create Presentation
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
