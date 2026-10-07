import React from 'react';
import { ArrowLeft, GitCompare, PlusCircle, Globe, ShieldCheck, MapPin } from 'lucide-react';

export default function ProfileView({ business, goBack, toggleCompare, compareList, addToResearchModal, businesses, viewProfile }) {
  if (!business) return null;
  const isComparing = compareList.includes(business.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <button onClick={goBack} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm"><ArrowLeft className="w-4 h-4" /> Back to Explore</button>
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">{business.brand_name}</h1>
            <p className="text-sm font-medium text-slate-500">{business.company_name}</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => toggleCompare(business.id)} className={`px-4 py-2.5 rounded-xl text-xs font-semibold border ${isComparing ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700'}`}>Compare</button>
            <button onClick={() => addToResearchModal(business)} className="bg-indigo-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl">Add to Research</button>
          </div>
        </div>
        <p className="text-base text-slate-700">{business.overview}</p>
      </div>
    </div>
  );
}