import React from 'react';

export default function NeonButtons() {
  return (
    <div className="p-8 space-y-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-neon-gradient mb-8 text-center">Button Components</h2>
        
        {/* Primary Buttons */}
        <div className="card-neon mb-8 p-6">
          <h3 className="text-xl font-semibold text-text-primary mb-4">Primary Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn-neon-primary">
              Primary Button
            </button>
            <button className="btn-neon-primary" disabled>
              Disabled
            </button>
            <button className="btn-neon-primary text-sm px-4 py-2">
              Small
            </button>
            <button className="btn-neon-primary text-xl px-10 py-5">
              Large
            </button>
          </div>
        </div>
        
        {/* Outline Buttons */}
        <div className="card-neon mb-8 p-6">
          <h3 className="text-xl font-semibold text-text-primary mb-4">Outline Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn-neon-outline">
              Outline Button
            </button>
            <button className="btn-neon-outline" disabled>
              Disabled
            </button>
            <button className="btn-neon-outline text-sm px-4 py-2">
              Small
            </button>
            <button className="btn-neon-outline text-xl px-10 py-5">
              Large
            </button>
          </div>
        </div>
        
        {/* Button with Icons */}
        <div className="card-neon p-6">
          <h3 className="text-xl font-semibold text-text-primary mb-4">Buttons with Icons</h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn-neon-primary flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Get Started
            </button>
            <button className="btn-neon-outline flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}





