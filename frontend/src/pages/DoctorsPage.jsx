import React from 'react';
import DoctorDirectory from '../components/DoctorDirectory';

export default function DoctorsPage() {
  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#f8fafc] py-16">
      <div className="section-container">
        <div className="mb-14 animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <p className="text-sm font-medium text-[#6b8c84] tracking-widest uppercase mb-3">Find care</p>
          <h1 className="text-4xl font-light text-[#18181b] mb-3">Dermatologists Near You</h1>
          <p className="text-lg text-slate-500 font-light max-w-xl">
            Browse board-certified dermatologists in your area for consultation and follow-up care.
          </p>
        </div>
        <DoctorDirectory />
      </div>
    </div>
  );
}
