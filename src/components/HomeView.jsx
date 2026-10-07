import React, { useState } from 'react';
import { Search, Compass, ArrowRight, Sparkles } from 'lucide-react';

export default function HomeView({ setCurrentView, setFilters, industries, researchProjects, selectResearch }) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const handleSearchSubmit = (e) => { e.preventDefault(); setFilters(prev => ({ ...prev, keyword: searchKeyword })); setCurrentView('explore'); };
  const handleCategoryClick = (industry) => { setFilters(prev => ({ ...prev, industry: industry, keyword: '' })); setCurrentView('explore'); };

  return (
    <div className="space-y-16 pb-20">
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-24 px-4 sm:px-6 lg:px-8 text-center shadow-xl">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 px-3 py-1.5 rounded-full text-indigo-300 text-xs font-semibold tracking-wide uppercase"><Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Internal Business Research Workspace</div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">Research smarter. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">Compare better.</span></h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">Discover businesses, compare markets, analyze competitors, and build professional research reports in one place.</p>
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-2 border border-slate-700/50">
            <div className="flex items-center pl-3 w-full sm:w-auto flex-1"><Search className="w-5 h-5 text-slate-400 mr-2 flex-shrink-0" /><input type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="Search brands, companies, industries…" className="w-full py-3 px-1 text-slate-800 placeholder-slate-400 text-sm sm:text-base focus:outline-none bg-transparent" /></div>
            <button type="submit" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">Search Database <ArrowRight className="w-4 h-4" /></button>
          </form>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between"><h2 className="text-2xl font-bold text-slate-900 tracking-tight">Explore Industries</h2></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {industries.map((industry, index) => (
            <div key={index} onClick={() => handleCategoryClick(industry)} className="bg-white hover:bg-indigo-50/50 border border-slate-200 p-5 rounded-2xl cursor-pointer transition-all text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-xl bg-slate-100 flex items-center justify-center font-bold">{industry.charAt(0)}</div>
              <h3 className="font-semibold text-sm text-slate-900">{industry}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}