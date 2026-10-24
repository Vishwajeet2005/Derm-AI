import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image as ImageIcon, RefreshCw, ZoomIn, Sun, ShieldCheck } from 'lucide-react';

export default function ImageUploader({ onImageUpload, selectedImage }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) onImageUpload(acceptedFiles[0]);
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [] }, multiple: false
  });

  if (selectedImage) {
    return (
      <div className="space-y-3">
        <div className="relative w-full h-[220px] lg:h-[240px] rounded-[1.25rem] overflow-hidden group bg-slate-50 dark:bg-slate-800 transition-colors">
          <img src={URL.createObjectURL(selectedImage)} alt="Uploaded skin photo" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#18181b]/0 group-hover:bg-[#18181b]/50 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={() => onImageUpload(null)}
              className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-2 bg-white dark:bg-[#1e293b] text-[#27272a] dark:text-white px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Upload Different Photo
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`w-full h-[200px] lg:h-[220px] border-2 border-dashed rounded-[1.25rem] flex flex-col items-center justify-center p-5 cursor-pointer transition-all duration-200
          ${isDragActive
            ? 'border-[#84a59d] bg-[#84a59d]/5'
            : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 hover:border-[#84a59d]/40 dark:hover:border-[#84a59d]/60 hover:bg-slate-50 dark:hover:bg-slate-800/80'
          }`}
      >
        <input {...getInputProps()} />
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2.5 transition-colors
          ${isDragActive ? 'bg-[#84a59d]/15 text-[#6b8c84]' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}`}>
          {isDragActive
            ? <UploadCloud className="w-6 h-6" strokeWidth={1.5} />
            : <ImageIcon className="w-6 h-6" strokeWidth={1.5} />
          }
        </div>
        <h3 className="text-sm lg:text-base font-medium text-[#27272a] dark:text-white mb-1">
          {isDragActive ? 'Drop your photo here' : 'Upload skin photograph'}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center max-w-xs font-light leading-relaxed">
          Drag and drop a well-lit photo of the affected area, or click to browse.
        </p>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-medium">JPG, PNG up to 10 MB</span>
      </div>

      {/* Photography Guide / Capture Tips */}
      <div className="bg-slate-50/80 dark:bg-slate-800/50 rounded-xl px-3.5 py-2.5 border border-slate-100 dark:border-slate-800">
        <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
          <ShieldCheck className="w-3 h-3 text-[#6b8c84] dark:text-teal-400" /> Tips for High Accuracy
        </p>
        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-light">
          <div className="flex items-center gap-1.5 truncate">
            <ZoomIn className="w-3 h-3 text-[#6b8c84] flex-shrink-0" />
            <span className="truncate"><strong>Close-up:</strong> 5–10 cm from lesion</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Sun className="w-3 h-3 text-amber-500 flex-shrink-0" />
            <span className="truncate"><strong>Lighting:</strong> Bright, even light</span>
          </div>
        </div>
      </div>
    </div>
  );
}
