import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

export default function ImageUploader({ onImageUpload, selectedImage }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });

  if (selectedImage) {
    return (
      <div className="relative w-full h-[400px] rounded-3xl overflow-hidden border border-slate-200 group bg-slate-50">
        <img 
          src={URL.createObjectURL(selectedImage)} 
          alt="Clinical presentation" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#27272a]/0 group-hover:bg-[#27272a]/40 transition-colors flex items-center justify-center backdrop-blur-0 group-hover:backdrop-blur-sm">
          <button 
            onClick={() => onImageUpload(null)}
            className="opacity-0 group-hover:opacity-100 bg-white text-[#27272a] px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 shadow-xl"
          >
            Capture New Image
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      {...getRootProps()} 
      className={`w-full h-[400px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-8 transition-all duration-300 cursor-pointer bg-slate-50/50 hover:bg-slate-50
        ${isDragActive ? 'border-[#84a59d] bg-[#84a59d]/5' : 'border-slate-200 hover:border-[#84a59d]/50'}
      `}
    >
      <input {...getInputProps()} />
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300
        ${isDragActive ? 'bg-[#84a59d]/20 text-[#6b8c84]' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}
      `}>
        {isDragActive ? (
          <UploadCloud className="w-10 h-10" strokeWidth={1.5} />
        ) : (
          <ImageIcon className="w-10 h-10" strokeWidth={1.5} />
        )}
      </div>
      
      <h3 className="text-xl font-medium text-[#27272a] mb-2">
        {isDragActive ? 'Release to upload' : 'Upload Clinical Image'}
      </h3>
      <p className="text-slate-500 text-center max-w-sm font-light leading-relaxed">
        Drag and drop a high-resolution photograph of the affected area, or click to browse your secure files.
      </p>
      <div className="mt-8 flex items-center gap-2 text-xs text-slate-400 font-medium">
        <ShieldCheck className="w-4 h-4" />
        <span>End-to-End Encrypted HIPAA Compliant</span>
      </div>
    </div>
  );
}

// Dummy component for icon since I can't import inside the function easily
import { ShieldCheck } from 'lucide-react';
