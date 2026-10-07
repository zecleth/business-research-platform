import React from 'react';
import { Search, Compass, GitCompare, FileText, Shield, PlusCircle } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, researchProjects, openNewResearchModal }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('home')}>
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">BR</div>
          <div>
            <span className="font-bold text-lg text-slate-900 tracking-tight">Research<span className="text-indigo-600">Base</span></span>
            <span className="block text-[10px] text-slate-500 font-medium uppercase tracking-wider">Business Intelligence MVP</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-1">
          <button onClick={() => setCurrentView('home')} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentView === 'home' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>Home</button>
          <button onClick={() => setCurrentView('explore')} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${currentView === 'explore' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}><Compass className="w-4 h-4 text-slate-500" /> Explore</button>
          <button onClick={() => setCurrentView('compare')} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${currentView === 'compare' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}><GitCompare className="w-4 h-4 text-slate-500" /> Compare</button>
          <button onClick={() => setCurrentView('workspace')} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 relative ${currentView === 'workspace' || currentView === 'report-preview' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}><FileText className="w-4 h-4 text-slate-500" /> My Research {researchProjects.length > 0 && (<span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{researchProjects.length}</span>)}</button>
        </nav>
        <div className="flex items-center space-x-3">
          <button onClick={openNewResearchModal} className="hidden sm:inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-all"><PlusCircle className="w-4 h-4" /> New Research</button>
          <button onClick={() => setCurrentView('admin')} className={`p-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 border ${currentView === 'admin' ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 text-slate-700 hover:bg-slate-100'}`}><Shield className="w-4 h-4" /><span className="hidden lg:inline text-xs">Admin</span></button>
        </div>
      </div>
    </header>
  );
}