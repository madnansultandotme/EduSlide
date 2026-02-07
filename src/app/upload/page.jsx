"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Sparkles, FileText, Zap, ArrowRight } from "lucide-react";
import FileUpload from "../../components/FileUpload";
import TopicInput from "../../components/TopicInput";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [topic, setTopic] = useState("");
  const router = useRouter();

  function handleGenerate() {
    const fakeFileId = "demo123";
    router.push(`/preview?fileId=${fakeFileId}&topic=${encodeURIComponent(topic)}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-200 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">
              Step 1: Upload or Enter Topic
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
            Create Your Presentation
          </h2>
          <p className="text-lg text-slate-600">
            Upload a PDF, eBook, or simply enter a topic to get started
          </p>
        </div>

        {/* Main Content Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8 sm:p-12">
            
            {/* Upload Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-800">Upload File</h3>
              </div>
              <p className="text-slate-600 mb-6">
                Supported formats: PDF, DOCX, EPUB
              </p>
              <FileUpload setFile={setFile} />
            </div>

            {/* Divider */}
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 py-2 bg-white text-slate-500 font-semibold rounded-full border border-slate-200">
                  OR
                </span>
              </div>
            </div>

            {/* Topic Input Section */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-800">Enter Topic</h3>
              </div>
              <p className="text-slate-600 mb-6">
                Describe what you want to create a presentation about
              </p>
              <TopicInput topic={topic} setTopic={setTopic} />
            </div>

            {/* Features Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-slate-800 font-semibold mb-1">AI-Powered</h4>
                  <p className="text-sm text-slate-600">Automatically organized content</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-slate-800 font-semibold mb-1">Professional Design</h4>
                  <p className="text-sm text-slate-600">Beautiful templates included</p>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button 
              onClick={handleGenerate}
              disabled={!file && !topic}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-indigo-600 text-white font-semibold text-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
            >
              <Sparkles className="w-6 h-6" />
              <span>Generate Slides</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Helper Text */}
            {!file && !topic && (
              <p className="text-center text-slate-500 text-sm mt-4">
                Please upload a file or enter a topic to continue
              </p>
            )}
          </div>

          {/* Bottom Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="p-4 bg-white border border-slate-200 rounded-xl text-center shadow-sm">
              <div className="text-2xl font-bold text-indigo-600 mb-1">
                3 Min
              </div>
              <div className="text-sm text-slate-600">Average Processing Time</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl text-center shadow-sm">
              <div className="text-2xl font-bold text-indigo-600 mb-1">
                50+
              </div>
              <div className="text-sm text-slate-600">Template Designs</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl text-center shadow-sm">
              <div className="text-2xl font-bold text-indigo-600 mb-1">
                100%
              </div>
              <div className="text-sm text-slate-600">Customizable</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
