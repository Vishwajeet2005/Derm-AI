import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';

export default function ImageUploader({ onImageSelected, file }) {
  const [preview, setPreview] = useState(file ? URL.createObjectURL(file) : null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setPreview(URL.createObjectURL(selectedFile));
      onImageSelected(selectedFile);
    }
  }, [onImageSelected]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxFiles: 1,
    maxSize: 15 * 1024 * 1024 // 15MB
  });

  const clearImage = (e) => {
    e.stopPropagation();
    setPreview(null);
    onImageSelected(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ease-in-out
          ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'}
          ${isDragReject ? 'border-red-500 bg-red-50' : ''}
          ${preview ? 'p-4' : 'p-12'}
        `}
      >
        <input {...getInputProps()} />
        
        {preview ? (
          <div className="relative group rounded-lg overflow-hidden bg-black aspect-square">
            <img src={preview} alt="Upload preview" className="w-full h-full object-cover opacity-90 group-hover:opacity-75 transition-opacity" />
            <button 
              onClick={clearImage}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md transition-colors"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="text-white font-medium bg-black bg-opacity-50 px-4 py-2 rounded-lg backdrop-blur-sm">Click or drag to change</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mb-2">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">Drag & Drop Image of Skin Condition</p>
              <p className="text-sm text-gray-500 mt-1">or Click to Browse</p>
            </div>
            <div className="pt-4 flex items-center space-x-2 text-xs text-gray-400">
              <ImageIcon className="w-4 h-4" />
              <span>Supported: JPG, PNG, WEBP (Max 15MB)</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
