import Link from "next/link";
import { Sparkles, FileText, Zap, BookOpen, ArrowRight, CheckCircle2, Award, Shield, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Main Content */}
        <div className="max-w-5xl mx-auto text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600">
              Powered by Advanced AI
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="block text-indigo-600 pb-2">
              EduSlide AI
            </span>
            <span className="block text-slate-800 text-3xl sm:text-4xl lg:text-5xl mt-2">
              Transform Learning Materials
            </span>
            <span className="block text-slate-700 text-3xl sm:text-4xl lg:text-5xl">
              Into Professional Slides
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            AI-powered tool that converts PDFs, eBooks, or topics into beautiful PowerPoint slides for educators. 
            <span className="block mt-2 font-semibold text-slate-700">
              Save hours of work and create professional presentations in minutes.
            </span>
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link 
              href="/upload" 
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold text-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-200"
            >
              <Sparkles className="w-5 h-5" />
              <span>Generate Slides</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-700 font-semibold text-lg border-2 border-slate-200 hover:border-indigo-200 hover:bg-slate-50 transition-all duration-200">
              <BookOpen className="w-5 h-5" />
              Learn More
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="text-3xl font-bold text-indigo-600">10K+</div>
              <div className="text-sm text-slate-600 font-medium mt-1">Presentations Created</div>
            </div>
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="text-3xl font-bold text-indigo-600">95%</div>
              <div className="text-sm text-slate-600 font-medium mt-1">Time Saved</div>
            </div>
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-sm">
              <div className="text-3xl font-bold text-indigo-600">4.9★</div>
              <div className="text-sm text-slate-600 font-medium mt-1">User Rating</div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
            
            {/* Feature 1 */}
            <div className="group p-8 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Multiple Formats
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Upload PDFs, eBooks, or just enter a topic. We handle the rest seamlessly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Lightning Fast
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Generate professional slides in minutes, not hours. Boost your productivity.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                AI-Powered
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Smart content organization and beautiful design created automatically.
              </p>
            </div>
          </div>

          {/* Benefits List */}
          <div className="pt-12 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-slate-800 mb-6">Why Choose EduSlide AI?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: CheckCircle2, text: "Save hours of preparation time", color: "text-green-600" },
                { icon: Award, text: "Professional-quality designs", color: "text-amber-600" },
                { icon: Shield, text: "Secure & private processing", color: "text-blue-600" },
                { icon: TrendingUp, text: "Export to PowerPoint instantly", color: "text-indigo-600" }
              ].map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg bg-white border border-slate-200 hover:border-indigo-200 hover:shadow-sm transition-all duration-200"
                  >
                    <Icon className={`w-5 h-5 ${benefit.color} flex-shrink-0`} />
                    <span className="text-slate-700 font-medium">
                      {benefit.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}