import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';

export default function ReportPreviewView({ currentResearch, businesses, setCurrentView }) {
  if (!currentResearch) return null;
  const selectedBusinessesList = businesses.filter(b => currentResearch.businesses.includes(b.id));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex justify-between no-print">
        <button onClick={() => setCurrentView('workspace')} className="text-xs font-semibold bg-white border border-slate-200 px-3.5 py-2 rounded-xl flex items-center gap-1.5"><ArrowLeft className="w-4 h-4" /> Back</button>
        <button onClick={() => window.print()} className="bg-indigo-600 text-white font-semibold text-xs px-6 py-3 rounded-xl flex items-center gap-2"><Download className="w-4 h-4" /> Export PDF</button>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-12 space-y-8">
        <h1 className="text-4xl font-black text-slate-900">{currentResearch.title}</h1>
        <p className="text-slate-600">{currentResearch.description}</p>
        <div className="border-t pt-6 space-y-4">
          <h2 className="text-2xl font-bold">Selected Businesses</h2>
          <div className="grid grid-cols-2 gap-4">
            {selectedBusinessesList.map(b => (
              <div key={b.id} className="border p-4 rounded-xl">
                <h3 className="font-bold">{b.brand_name}</h3>
                <p className="text-xs text-slate-600">{b.overview}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}