import React from 'react';
import { GitCompare } from 'lucide-react';

export default function CompareView({ compareList, businesses, setCurrentView }) {
  const comparedBusinesses = businesses.filter(b => compareList.includes(b.id));
  if (comparedBusinesses.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto"><GitCompare className="w-8 h-8" /></div>
        <h2 className="text-2xl font-bold text-slate-900">No Businesses Selected for Comparison</h2>
        <button onClick={() => setCurrentView('explore')} className="bg-indigo-600 text-white font-semibold text-sm px-6 py-3 rounded-xl">Explore Businesses</button>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Business Comparison Matrix</h1>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6">
        <div className="grid grid-cols-4 gap-4">
          {comparedBusinesses.map(b => (
            <div key={b.id} className="border p-4 rounded-xl space-y-2">
              <h3 className="font-bold text-lg">{b.brand_name}</h3>
              <p className="text-xs text-slate-600">{b.industry} • {b.country}</p>
              <p className="text-xs">Main Market: {b.main_market}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}