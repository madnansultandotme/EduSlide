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
import { getPresentations, deletePresentation as apiDeletePresentation, incrementPresentationDownloads, trackEvent } from "../../../lib/api";

export default function PresentationsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [presentations, setPresentations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
      const userId = localStorage.getItem("userId");
      if (userId) {
        getPresentations(userId)
          .then(data => setPresentations(data))
          .catch(console.error)
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }
  }, [router]);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this presentation?")) {
      try {
        await apiDeletePresentation(id);
        setPresentations(presentations.filter(p => p.id !== id));
      } catch (err) {
        alert("Failed to delete presentation");
      }
    }
  };

  const handleDownload = async (presentation) => {
    try {
      const userId = localStorage.getItem("userId");
      await incrementPresentationDownloads(presentation.id);
      if (userId) {
        await trackEvent({ userId, presentationId: presentation.id, eventType: 'download' });
      }
      alert(`Downloading: ${presentation.title}`);
    } catch (err) {
      console.error(err);
    }
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
                        {presentation.file_size ? `${(presentation.file_size / 1024 / 1024).toFixed(1)} MB` : '0 MB'}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
                        {presentation.topic || 'General'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      {presentation.slides_count || 0} slides
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
                        <div>{presentation.views || 0} views</div>
                        <div>{presentation.downloads || 0} downloads</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4" />
                        {presentation.created_at ? new Date(presentation.created_at).toLocaleDateString() : 'N/A'}
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
