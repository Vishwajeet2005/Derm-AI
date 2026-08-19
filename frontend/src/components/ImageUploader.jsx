import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image as ImageIcon, RefreshCw } from 'lucide-react';

export default function ImageUploader({ onImageUpload, selectedImage }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) onImageUpload(acceptedFiles[0]);
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [] }, multiple: false
  });

  if (selectedImage) {
    return (
      <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden group bg-slate-50">
        <img src={URL.createObjectURL(selectedImage)} alt="Uploaded skin photo" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#18181b]/0 group-hover:bg-[#18181b]/50 transition-all duration-300 flex items-center justify-center">
          <button
            onClick={() => onImageUpload(null)}
            className="opacity-0 group-hover:opacity-100 inline-flex items-center gap-2 bg-white text-[#27272a] px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
            Upload Different Photo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`w-full aspect-[4/3] border-2 border-dashed rounded-[1.5rem] flex flex-col items-center justify-center p-8 cursor-pointer transition-all duration-300
        ${isDragActive
          ? 'border-[#84a59d] bg-[#84a59d]/5'
          : 'border-slate-200 bg-slate-50/50 hover:border-[#84a59d]/40 hover:bg-slate-50'
        }`}
    >
      <input {...getInputProps()} />
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-colors
        ${isDragActive ? 'bg-[#84a59d]/15 text-[#6b8c84]' : 'bg-slate-100 text-slate-400'}`}>
        {isDragActive
          ? <UploadCloud className="w-8 h-8" strokeWidth={1.5} />
          : <ImageIcon className="w-8 h-8" strokeWidth={1.5} />
        }
      </div>
      <h3 className="text-lg font-medium text-[#27272a] mb-1.5">
        {isDragActive ? 'Drop your photo here' : 'Upload a skin photo'}
      </h3>
      <p className="text-sm text-slate-500 text-center max-w-xs font-light leading-relaxed">
        Drag and drop a clear, well-lit photo of the affected skin area, or click to browse.
      </p>
      <p className="text-xs text-slate-400 mt-6 font-medium">JPG, PNG up to 10 MB</p>
    </div>
  );
}
