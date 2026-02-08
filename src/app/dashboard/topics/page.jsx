"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  FileText,
  Calendar,
  Tag,
  X,
  Save
} from "lucide-react";
import Link from "next/link";
import { getTopics, createTopic as apiCreateTopic, updateTopic as apiUpdateTopic, deleteTopic as apiDeleteTopic } from "../../../lib/api";

export default function TopicsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
      const userId = localStorage.getItem("userId");
      if (userId) {
        getTopics(userId)
          .then(data => setTopics(data))
          .catch(console.error)
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }
  }, [router]);

  const handleAddTopic = () => {
    setEditingTopic(null);
    setFormData({ name: "", category: "", description: "" });
    setShowModal(true);
  };

  const handleEditTopic = (topic) => {
    setEditingTopic(topic);
    setFormData({
      name: topic.name,
      category: topic.category,
      description: topic.description
    });
    setShowModal(true);
  };

  const handleDeleteTopic = async (id) => {
    if (confirm("Are you sure you want to delete this topic?")) {
      try {
        await apiDeleteTopic(id);
        setTopics(topics.filter(t => t.id !== id));
      } catch (err) {
        alert("Failed to delete topic");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingTopic) {
        const updated = await apiUpdateTopic(editingTopic.id, formData);
        setTopics(topics.map(t => t.id === editingTopic.id ? updated : t));
      } else {
        const userId = localStorage.getItem("userId");
        const newTopic = await apiCreateTopic({
          userId,
          name: formData.name,
          category: formData.category,
          description: formData.description,
        });
        setTopics([newTopic, ...topics]);
      }
      setShowModal(false);
    } catch (err) {
      alert("Failed to save topic");
    } finally {
      setSaving(false);
    }
  };

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
                Topics Management
              </h1>
              <p className="text-slate-600">
                Organize and manage your teaching topics
              </p>
            </div>
            <button
              onClick={handleAddTopic}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Topic
            </button>
          </div>

          {/* Search Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search topics..."
                className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditTopic(topic)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteTopic(topic.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {topic.name}
              </h3>

              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-indigo-600" />
                <span className="text-sm text-slate-600">{topic.category}</span>
              </div>

              <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                {topic.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <FileText className="w-4 h-4" />
                  <span>{topic.presentations_count || 0} presentations</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar className="w-4 h-4" />
                  <span>{topic.created_at ? new Date(topic.created_at).toLocaleDateString() : 'N/A'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {topics.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No topics yet
            </h3>
            <p className="text-slate-600 mb-6">
              Start by adding your first teaching topic
            </p>
            <button
              onClick={handleAddTopic}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              Add Your First Topic
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-800">
                {editingTopic ? "Edit Topic" : "Add New Topic"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Topic Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="e.g., Machine Learning Basics"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                  placeholder="e.g., AI & Technology"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
                  rows="3"
                  placeholder="Brief description of the topic..."
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  {editingTopic ? "Update" : "Add"} Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
