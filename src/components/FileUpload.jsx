"use client";

import { Upload, File, X, Check } from "lucide-react";
import { useState } from "react";

export default function FileUpload({ setFile }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFile(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.name.endsWith('.docx') || file.name.endsWith('.epub'))) {
      setSelectedFile(file);
      setFile(file);
    }
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center w-full min-h-[280px] px-6 py-10 border-2 border-dashed rounded-xl transition-all duration-200 ${
            isDragging 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-slate-100'
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
              <Upload className="w-8 h-8 text-indigo-600" strokeWidth={2} />
            </div>

            {/* Text */}
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold text-slate-800">
                Drag & Drop your file here
              </p>
              <p className="text-sm text-slate-600">
                or click the button below to browse
              </p>
            </div>

            {/* Choose File Button */}
            <label 
              htmlFor="file-upload" 
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold text-base shadow-md hover:bg-indigo-700 transition-all duration-200 cursor-pointer"
            >
              <File className="w-5 h-5" />
              <span>Choose File</span>
            </label>

            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf,.docx,.epub"
              onChange={handleFileChange}
            />

            {/* Supported formats */}
            <p className="text-xs text-slate-500">
              Supported: PDF, DOCX, EPUB (max. 10MB)
            </p>
          </div>
        </div>
      ) : (
        // File Selected View
        <div className="flex items-center justify-between w-full p-6 border-2 border-green-500 bg-green-50 rounded-xl">
          <div className="flex items-center gap-4 flex-1">
            {/* Success Icon */}
            <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center shadow-sm">
              <Check className="w-6 h-6 text-white" strokeWidth={3} />
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <p className="text-lg font-semibold text-slate-800 truncate">
                {selectedFile.name}
              </p>
              <p className="text-sm text-green-600 font-medium">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={handleRemoveFile}
              className="p-2 rounded-lg bg-red-100 hover:bg-red-200 border border-red-300 transition-all duration-200"
            >
              <X className="w-5 h-5 text-red-600" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
