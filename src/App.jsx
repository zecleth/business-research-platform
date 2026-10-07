import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import ExploreView from './components/ExploreView';
import ProfileView from './components/ProfileView';
import CompareView from './components/CompareView';
import ResearchWorkspace from './components/ResearchWorkspace';
import ReportPreviewView from './components/ReportPreviewView';
import AdminView from './components/AdminView';
import { initialBusinesses, initialIndustries, initialMarkets, initialTargetMarkets, initialResearchProjects } from './data/mockData';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [businesses, setBusinesses] = useState(initialBusinesses);
  const [industries] = useState(initialIndustries);
  const [markets] = useState(initialMarkets);
  const [targetMarkets] = useState(initialTargetMarkets);
  const [filters, setFilters] = useState({ industry: '', mainMarket: '', country: '', keyword: '' });
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [compareList, setCompareList] = useState(['srichand', 'mistine', '4u2']);
  const [researchProjects, setResearchProjects] = useState(initialResearchProjects);
  const [currentResearch, setCurrentResearch] = useState(initialResearchProjects[0]);

  const viewProfile = (b) => { setSelectedBusiness(b); setCurrentView('profile'); };
  const toggleCompare = (id) => { setCompareList(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]); };
  const addToResearchModal = (b) => {
    if (!currentResearch.businesses.includes(b.id)) {
      const updated = { ...currentResearch, businesses: [...currentResearch.businesses, b.id] };
      setCurrentResearch(updated);
      setResearchProjects(researchProjects.map(p => p.id === updated.id ? updated : p));
      alert("Added to research workspace!");
    } else {
      alert("Already in research workspace.");
    }
  };
  const openNewResearchModal = () => {
    const newProj = {
      id: `res-${Date.now()}`,
      title: `New Business Research ${researchProjects.length + 1}`,
      description: 'Competitive overview and market analysis.',
      created_date: new Date().toISOString().split('T')[0],
      last_updated: new Date().toISOString().split('T')[0],
      businesses: ['srichand', 'mistine'],
      sections: { market_overview: true, business_overview: true, target_market: true, brand_comparison: true, competitor_analysis: true, positioning: true, key_findings: true },
      custom_insights: 'Enter custom findings here.'
    };
    setResearchProjects([newProj, ...researchProjects]);
    setCurrentResearch(newProj);
    setCurrentView('workspace');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} researchProjects={researchProjects} openNewResearchModal={openNewResearchModal} />
      <main className="flex-1">
        {currentView === 'home' && <HomeView setCurrentView={setCurrentView} setFilters={setFilters} industries={industries} researchProjects={researchProjects} selectResearch={(p) => { setCurrentResearch(p); setCurrentView('workspace'); }} />}
        {currentView === 'explore' && <ExploreView businesses={businesses} industries={industries} markets={markets} targetMarkets={targetMarkets} filters={filters} setFilters={setFilters} viewProfile={viewProfile} compareList={compareList} toggleCompare={toggleCompare} addToResearchModal={addToResearchModal} />}
        {currentView === 'profile' && <ProfileView business={selectedBusiness} goBack={() => setCurrentView('explore')} toggleCompare={toggleCompare} compareList={compareList} addToResearchModal={addToResearchModal} businesses={businesses} viewProfile={viewProfile} />}
        {currentView === 'compare' && <CompareView compareList={compareList} businesses={businesses} setCurrentView={setCurrentView} />}
        {currentView === 'workspace' && <ResearchWorkspace currentResearch={currentResearch} updateResearch={(p) => { setCurrentResearch(p); setResearchProjects(researchProjects.map(proj => proj.id === p.id ? p : proj)); }} setCurrentView={setCurrentView} businesses={businesses} />}
        {currentView === 'report-preview' && <ReportPreviewView currentResearch={currentResearch} businesses={businesses} setCurrentView={setCurrentView} />}
        {currentView === 'admin' && <AdminView businesses={businesses} setBusinesses={setBusinesses} industries={industries} />}
      </main>
    </div>
  );
}