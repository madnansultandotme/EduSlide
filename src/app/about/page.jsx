"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Target, Users, Lightbulb, Heart } from "lucide-react";

export default function AboutPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect logged-in users to dashboard
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 mb-6">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-semibold text-indigo-600">About Us</span>
            </div>
            <h1 className="text-5xl font-bold text-slate-800 mb-6">
              Empowering Educators with AI Technology
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              We&apos;re on a mission to transform how educators create presentations, 
              saving time and enhancing the learning experience for students worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 mb-4">
                At EduSlide AI, we believe that educators should spend less time on administrative 
                tasks and more time inspiring students. Our AI-powered platform automates the 
                tedious process of creating presentations, allowing teachers to focus on what 
                matters most: teaching.
              </p>
              <p className="text-lg text-slate-600">
                We&apos;re committed to making high-quality educational tools accessible to every 
                educator, regardless of their technical expertise or budget constraints.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">10K+</div>
                  <div className="text-sm text-slate-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">50K+</div>
                  <div className="text-sm text-slate-600">Presentations Created</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">95%</div>
                  <div className="text-sm text-slate-600">Time Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">4.9★</div>
                  <div className="text-sm text-slate-600">User Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-slate-800 text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Target,
                  title: "Excellence",
                  description: "We strive for the highest quality in everything we create."
                },
                {
                  icon: Users,
                  title: "Collaboration",
                  description: "We work closely with educators to understand their needs."
                },
                {
                  icon: Lightbulb,
                  title: "Innovation",
                  description: "We continuously improve our AI technology to serve you better."
                },
                {
                  icon: Heart,
                  title: "Passion",
                  description: "We're passionate about making education more effective."
                }
              ].map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
                    <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">{value.title}</h3>
                    <p className="text-slate-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Story Section */}
          <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-lg">
            <h2 className="text-4xl font-bold text-slate-800 mb-6 text-center">Our Story</h2>
            <div className="max-w-3xl mx-auto space-y-4 text-lg text-slate-600">
              <p>
                EduSlide AI was founded in 2023 by a team of educators and technologists who 
                experienced firsthand the challenges of creating engaging presentations while 
                managing a full teaching workload.
              </p>
              <p>
                After countless late nights spent formatting slides and organizing content, we 
                realized there had to be a better way. We combined our expertise in education 
                and artificial intelligence to create a tool that would revolutionize how 
                teachers prepare their materials.
              </p>
              <p>
                Today, EduSlide AI serves thousands of educators across the globe, helping them 
                save time, reduce stress, and create more engaging learning experiences for 
                their students. We&apos;re just getting started, and we&apos;re excited to continue 
                growing alongside the education community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Join Our Community
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Be part of the education revolution and start creating better presentations today
            </p>
            <a
              href="/upload"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white text-indigo-600 font-semibold text-lg shadow-lg hover:bg-slate-50 transition-all duration-200"
            >
              <Sparkles className="w-5 h-5" />
              <span>Get Started Free</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
