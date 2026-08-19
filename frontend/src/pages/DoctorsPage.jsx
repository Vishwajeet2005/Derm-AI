import React from 'react';
import DoctorDirectory from '../components/DoctorDirectory';

export default function DoctorsPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-12 px-6 sm:px-12 lg:px-24 font-sans selection:bg-[#6b8c84] selection:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <h1 className="text-4xl font-light text-[#27272a] mb-4">Specialist Directory</h1>
          <p className="text-lg font-light text-slate-500 max-w-2xl">
            Connect with our network of board-certified dermatologists and primary care physicians for immediate consultation.
          </p>
        </div>
        
        <DoctorDirectory />
      </div>
    </div>
  );
}
