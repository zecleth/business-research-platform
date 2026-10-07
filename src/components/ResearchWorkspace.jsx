import React from 'react';
import { PlusCircle, Trash2, ArrowRight, CheckSquare, Square } from 'lucide-react';

export default function ResearchWorkspace({ currentResearch, updateResearch, setCurrentView, businesses }) {
  if (!currentResearch) return null;
  const selectedBusinessesList = businesses.filter(b => currentResearch.businesses.includes(b.id));

  const handleToggleSection = (sectionKey) => {
    updateResearch({ ...currentResearch, sections: { ...currentResearch.sections, [sectionKey]: !currentResearch.sections[sectionKey] } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">{currentResearch.title}</h1>
          <p className="text-sm text-slate-500">{currentResearch.description}</p>
        </div>
        <button onClick={() => setCurrentView('report-preview')} className="bg-indigo-600 text-white font-semibold text-sm px-6 py-3 rounded-xl flex items-center gap-2">Preview Report <ArrowRight className="w-4 h-4" /></button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold">Selected Businesses</h2>
            <div className="grid grid-cols-2 gap-4">
              {selectedBusinessesList.map(b => (
                <div key={b.id} className="border p-3 rounded-xl flex justify-between items-center">
                  <span className="font-bold text-sm">{b.brand_name}</span>
                  <button onClick={() => updateResearch({ ...currentResearch, businesses: currentResearch.businesses.filter(id => id !== b.id) })} className="text-rose-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-bold">Report Sections</h2>
          {Object.keys(currentResearch.sections).map(key => (
            <div key={key} onClick={() => handleToggleSection(key)} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl cursor-pointer text-xs font-semibold">
              <span className="capitalize">{key.replace('_', ' ')}</span>
              {currentResearch.sections[key] ? <CheckSquare className="w-4 h-4 text-indigo-600" /> : <Square className="w-4 h-4" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}