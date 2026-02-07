"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { Download, Sparkles, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import Loader from "../../components/Loader";

function PreviewContent() {
  const searchParams = useSearchParams();
  const fileId = searchParams.get("fileId");
  const topic = searchParams.get("topic");

  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const demoSlides = [
        {
          title: topic || "Introduction",
          content: [
            "Welcome to the presentation",
            "AI-generated content based on your input",
            "Professional design and layout"
          ]
        },
        {
          title: "Key Concepts",
          content: [
            "Main idea and supporting details",
            "Evidence and examples",
            "Analysis and interpretation"
          ]
        },
        {
          title: "Summary",
          content: [
            "Recap of main points",
            "Key takeaways",
            "Next steps and resources"
          ]
        }
      ];
      setSlides(demoSlides);
      setLoading(false);
    }, 2000);
  }, [topic]);

  const handleDownload = () => {
    alert("Download functionality coming soon!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-700 text-lg font-medium">Creating your presentation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header */}
        <div className="max-w-5xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-200 shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">
              Preview Your Slides
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-4">
            Your Presentation is Ready
          </h2>
          <p className="text-lg text-slate-600">
            Review your slides and download when ready
          </p>
        </div>

        {/* Slide Preview */}
        <div className="max-w-4xl mx-auto">
          {/* Current Slide Display */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-12 mb-6 min-h-[400px] flex flex-col justify-center">
            <div className="text-center space-y-8">
              <h3 className="text-3xl font-bold text-slate-800">
                {slides[currentSlide]?.title}
              </h3>
              <div className="space-y-4">
                {slides[currentSlide]?.content.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 text-left max-w-2xl mx-auto"
                  >
                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0"></div>
                    <p className="text-lg text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
                Previous
              </button>

              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" />
                <span className="text-slate-700 font-semibold">
                  Slide {currentSlide + 1} of {slides.length}
                </span>
              </div>

              <button
                onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                disabled={currentSlide === slides.length - 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-indigo-600 text-white font-semibold text-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-200"
          >
            <Download className="w-6 h-6" />
            <span>Download PowerPoint</span>
          </button>

          {/* Slide Thumbnails */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  currentSlide === index
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-slate-200 bg-white hover:border-indigo-300'
                }`}
              >
                <div className="text-xs font-semibold text-slate-500 mb-1">
                  Slide {index + 1}
                </div>
                <div className="text-sm font-semibold text-slate-800 truncate">
                  {slide.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-700 text-lg font-medium">Loading preview...</p>
        </div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}
