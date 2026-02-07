"use client";

export default function TopicInput({ topic, setTopic }) {
  return (
    <div className="w-full">
      <textarea
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g., Introduction to Quantum Physics, World War II History, Python Programming Basics..."
        className="w-full min-h-[150px] px-6 py-4 bg-slate-50 border-2 border-slate-300 rounded-xl text-slate-800 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 resize-none font-medium text-base"
      />
    </div>
  );
}
