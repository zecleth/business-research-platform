import React, { useState } from 'react';
import { Search, GitCompare, PlusCircle, ArrowUpRight } from 'lucide-react';

export default function ExploreView({ businesses, industries, markets, filters, setFilters, viewProfile, compareList, toggleCompare, addToResearchModal }) {
  const [localKeyword, setLocalKeyword] = useState(filters.keyword || '');
  const filteredBusinesses = businesses.filter(b => {
    const matchKeyword = localKeyword === '' || b.brand_name.toLowerCase().includes(localKeyword.toLowerCase()) || b.industry.toLowerCase().includes(localKeyword.toLowerCase());
    const matchIndustry = !filters.industry || b.industry === filters.industry;
    const matchMainMarket = !filters.mainMarket || b.main_market === filters.mainMarket;
    return matchKeyword && matchIndustry && matchMainMarket;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex justify-between items-center"><h1 className="text-3xl font-bold text-slate-900">Business Database & Explore</h1><span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-xl font-semibold">{filteredBusinesses.length} Businesses</span></div>
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" /><input type="text" value={localKeyword} onChange={(e) => setLocalKeyword(e.target.value)} placeholder="Search by Brand Name..." className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none" /></div>
        <select value={filters.industry} onChange={(e) => setFilters(prev => ({ ...prev, industry: e.target.value }))} className="bg-slate-50 border border-slate-200 text-sm rounded-xl px-3 py-2.5">
          <option value="">All Industries</option>
          {industries.map((ind, i) => <option key={i} value={ind}>{ind}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBusinesses.map((b) => {
          const isComparing = compareList.includes(b.id);
          return (
            <div key={b.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[11px] font-bold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md">{b.industry} • {b.category}</span>
                <h3 className="text-xl font-bold text-slate-900">{b.brand_name}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{b.short_description}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button onClick={() => viewProfile(b)} className="flex-1 bg-slate-900 text-white text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1">View Profile <ArrowUpRight className="w-3.5 h-3.5" /></button>
                <button onClick={() => toggleCompare(b.id)} className={`px-3 py-2.5 rounded-xl text-xs font-semibold border ${isComparing ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-200'}`}><GitCompare className="w-3.5 h-3.5" /></button>
                <button onClick={() => addToResearchModal(b)} className="p-2.5 bg-slate-100 hover:bg-indigo-50 rounded-xl"><PlusCircle className="w-4 h-4" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}