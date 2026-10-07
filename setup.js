import fs from 'fs';
import path from 'path';

const files = {
  '.env.example': `VITE_APP_NAME="Business Research Platform"\nVITE_API_BASE_URL="https://api.yourdomain.com"\n`,
  '.gitignore': `node_modules\ndist\ndist-ssr\n*.local\n.env\n.env.local\n.env.development.local\n.env.production.local\n.DS_Store\nThumbs.db\n`,
  'package.json': JSON.stringify({
    "name": "business-research-platform",
    "private": true,
    "version": "1.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    },
    "dependencies": {
      "lucide-react": "^1.16.0",
      "react": "^18.3.1",
      "react-dom": "^18.3.1"
    },
    "devDependencies": {
      "@types/react": "^18.3.3",
      "@types/react-dom": "^18.3.0",
      "@vitejs/plugin-react": "^4.3.1",
      "autoprefixer": "^10.4.19",
      "postcss": "^8.4.38",
      "tailwindcss": "^3.4.3",
      "vite": "^5.2.11"
    }
  }, null, 2),
  'tailwind.config.js': `/** @type {import('tailwindcss').Config} */\nexport default {\n  content: [\n    "./index.html",\n    "./src/**/*.{js,ts,jsx,tsx}",\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}\n`,
  'postcss.config.js': `export default {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n}\n`,
  'vite.config.js': `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\nexport default defineConfig({\n  plugins: [react()],\n  server: {\n    port: 3000,\n    open: true\n  }\n})\n`,
  'vercel.json': JSON.stringify({
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }, null, 2),
  'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📊</text></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Business Research Platform | Research Smarter. Compare Better.</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>
  <body class="bg-slate-50 text-slate-900 font-['Inter',sans-serif] antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
  'src/index.css': `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer base {\n  body {\n    @apply bg-slate-50 text-slate-800;\n  }\n}\n\n::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n::-webkit-scrollbar-track {\n  background: #f1f5f9;\n}\n::-webkit-scrollbar-thumb {\n  background: #cbd5e1;\n  border-radius: 3px;\n}\n::-webkit-scrollbar-thumb:hover {\n  background: #94a3b8;\n}\n\n@media print {\n  body {\n    background: white !important;\n  }\n  .no-print {\n    display: none !important;\n  }\n}\n`,
  'src/main.jsx': `import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport App from './App.jsx'\nimport './index.css'\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n)\n`,
  'src/data/mockData.js': `export const initialBusinesses = [
  {
    id: "srichand",
    brand_name: "Srichand",
    company_name: "Srichand United Dispensary Co., Ltd.",
    industry: "Beauty",
    category: "Cosmetics",
    country: "Thailand",
    founded: 1948,
    business_type: "B2C",
    official_website: "https://www.srichand.com",
    main_market: "Women",
    target_market: ["Young Adults", "Working Adults"],
    price_segment: "Mass Market",
    positioning: "Trusted Thai heritage brand modernized with high-quality translucent powders and innovative cosmetics for Asian skin tones at accessible price points.",
    competitors: ["4U2", "Mistine", "Cute Press", "Maybelline"],
    short_description: "Iconic Thai cosmetics brand renowned for oil-control powders and affordable beauty solutions.",
    overview: "Srichand has successfully transitioned from a traditional pharmacy powder brand into a modern, trend-setting cosmetics powerhouse favored by Gen Z and working professionals across Thailand.",
    market_description: "Operating in the fast-growing Southeast Asian beauty sector with strong demand for local formulation tailored to tropical weather.",
    target_market_description: "Primarily targets women aged 18-35 seeking high-performance everyday makeup that controls oil and resists humidity.",
    source: "Company Reports & Market Analysis",
    source_url: "https://www.srichand.com",
    last_updated: "2026-03-01",
    data_status: "Verified"
  },
  {
    id: "mistine",
    brand_name: "Mistine",
    company_name: "Better Way (Thailand) Co., Ltd.",
    industry: "Beauty",
    category: "Cosmetics & Skincare",
    country: "Thailand",
    founded: 1988,
    business_type: "B2C",
    official_website: "https://www.mistine.co.th",
    main_market: "Women",
    target_market: ["Mass Consumer", "Working Adults", "Young Adults"],
    price_segment: "Mass Market",
    positioning: "Household direct-sales and retail beauty giant offering extensive product lines from skincare to color cosmetics with nationwide penetration.",
    competitors: ["Srichand", "4U2", "Cute Press", "Maybelline"],
    short_description: "Thailand's household direct sales and mass retail cosmetics pioneer.",
    overview: "Mistine is a deeply entrenched Thai beauty brand famous for extensive catalogs, celebrity endorsements, and robust distribution networks spanning urban and rural markets.",
    market_description: "Mass consumer beauty market leader in Thailand with growing export footprint in East Asia.",
    target_market_description: "Mass market female consumers of all age groups looking for everyday value and reliable performance.",
    source: "Industry Databank",
    source_url: "https://www.mistine.co.th",
    last_updated: "2026-02-15",
    data_status: "Verified"
  },
  {
    id: "4u2",
    brand_name: "4U2",
    company_name: "4U2 Cosmetics Co., Ltd.",
    industry: "Beauty",
    category: "Cosmetics",
    country: "Thailand",
    founded: 2002,
    business_type: "B2C",
    official_website: "https://www.4u2thailand.com",
    main_market: "Women",
    target_market: ["Young Adults", "Teens"],
    price_segment: "Mass Market",
    positioning: "Trend-focused, vibrant, and youthful makeup brand that launches fast-paced color collections tailored to Gen Z aesthetics and social media culture.",
    competitors: ["Srichand", "Mistine", "Cute Press", "Catrice"],
    short_description: "Vibrant and trend-setting color cosmetics brand loved by Gen Z.",
    overview: "4U2 stands out through aggressive social media engagement, viral product drops (lip glosses and blushes), and a colorful, playful brand identity.",
    market_description: "Youth cosmetic segment focusing on fast-moving beauty trends and high digital engagement.",
    target_market_description: "Teenagers and young adults (15-25) looking for trendy shades and cruelty-free formulas at student-friendly prices.",
    source: "Brand Social Audit",
    source_url: "https://www.4u2thailand.com",
    last_updated: "2026-03-10",
    data_status: "Verified"
  },
  {
    id: "cute-press",
    brand_name: "Cute Press",
    company_name: "SSCP (Thailand) Co., Ltd.",
    industry: "Beauty",
    category: "Skincare & Cosmetics",
    country: "Thailand",
    founded: 1976,
    business_type: "B2C",
    official_website: "https://www.cutepress.com",
    main_market: "Women",
    target_market: ["Young Adults", "Working Adults"],
    price_segment: "Mass Market",
    positioning: "Accessible beauty and skincare designed specifically for tropical climates, emphasizing long wear, sweat resistance, and skin health.",
    competitors: ["Srichand", "Mistine", "4U2", "Innisfree"],
    short_description: "Reliable skincare and cosmetics formulated for tropical lifestyles.",
    overview: "A stalwart in Thai shopping malls, Cute Press offers dermatologist-tested sunscreens, foundations, and skincare series built for hot and humid environments.",
    market_description: "Tropical climate beauty and personal care market.",
    target_market_description: "Working women and college students seeking functional skincare and makeup solutions that withstand heat and humidity.",
    source: "Retail Database",
    source_url: "https://www.cutepress.com",
    last_updated: "2026-01-20",
    data_status: "Verified"
  },
  {
    id: "maybelline",
    brand_name: "Maybelline",
    company_name: "L'Oréal Group",
    industry: "Beauty",
    category: "Cosmetics",
    country: "United States",
    founded: 1915,
    business_type: "B2C",
    official_website: "https://www.maybelline.com",
    main_market: "Women",
    target_market: ["Young Adults", "Working Adults", "General Consumer"],
    price_segment: "Mass Market",
    positioning: "Global drugstore makeup authority bringing international runway trends and high-tech formulations to mass consumers worldwide.",
    competitors: ["Srichand", "Mistine", "L'Oreal Paris", "Revlon"],
    short_description: "Global mass-market makeup brand known for mascaras and liquid lipsticks.",
    overview: "Maybelline New York leverages global R&D to deliver high-impact cosmetics like SuperStay liquid lipsticks and Fit Me foundations across global markets including Thailand.",
    market_description: "Global mass cosmetics and retail drugstore sector.",
    target_market_description: "Urban women and beauty enthusiasts seeking international quality standards at accessible drugstore prices.",
    source: "Global Brand Repository",
    source_url: "https://www.maybelline.com",
    last_updated: "2026-02-28",
    data_status: "Verified"
  }
];

export const initialIndustries = ["Beauty", "Food & Beverage", "Finance", "Technology", "Retail", "Automotive", "Fashion", "Healthcare", "Travel", "Entertainment"];
export const initialMarkets = ["Women", "Men", "Unisex", "Children", "Family", "B2B", "General Consumer"];
export const initialTargetMarkets = ["Young Adults", "Working Adults", "Mass Consumer", "Teens", "SMEs", "Merchants", "General Consumer"];

export const initialResearchProjects = [
  {
    id: "res-1",
    title: "Thailand Beauty Market Research",
    description: "Competitive overview of major beauty brands targeting female consumers in Thailand.",
    created_date: "2026-03-01",
    last_updated: "2026-03-10",
    businesses: ["srichand", "mistine", "4u2", "cute-press", "maybelline"],
    sections: {
      market_overview: true,
      business_overview: true,
      target_market: true,
      brand_comparison: true,
      competitor_analysis: true,
      positioning: true,
      key_findings: true
    },
    custom_insights: "The majority of selected beauty brands primarily target female consumers, with young adults representing an important secondary target segment. Local brands like Srichand and 4U2 compete effectively against global giants through agile social media campaigns and tropical-optimized formulations."
  }
];`,
  'src/components/Navbar.jsx': `import React from 'react';
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
          <button onClick={() => setCurrentView('home')} className={\`px-3 py-2 rounded-lg text-sm font-medium transition-colors \${currentView === 'home' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}\`}>Home</button>
          <button onClick={() => setCurrentView('explore')} className={\`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 \${currentView === 'explore' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}\`}><Compass className="w-4 h-4 text-slate-500" /> Explore</button>
          <button onClick={() => setCurrentView('compare')} className={\`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 \${currentView === 'compare' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}\`}><GitCompare className="w-4 h-4 text-slate-500" /> Compare</button>
          <button onClick={() => setCurrentView('workspace')} className={\`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 relative \${currentView === 'workspace' || currentView === 'report-preview' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}\`}><FileText className="w-4 h-4 text-slate-500" /> My Research {researchProjects.length > 0 && (<span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{researchProjects.length}</span>)}</button>
        </nav>
        <div className="flex items-center space-x-3">
          <button onClick={openNewResearchModal} className="hidden sm:inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm transition-all"><PlusCircle className="w-4 h-4" /> New Research</button>
          <button onClick={() => setCurrentView('admin')} className={\`p-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 border \${currentView === 'admin' ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-200 text-slate-700 hover:bg-slate-100'}\`}><Shield className="w-4 h-4" /><span className="hidden lg:inline text-xs">Admin</span></button>
        </div>
      </div>
    </header>
  );
}`,
  'src/components/HomeView.jsx': `import React, { useState } from 'react';
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
}`,
  'src/components/ExploreView.jsx': `import React, { useState } from 'react';
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
                <button onClick={() => toggleCompare(b.id)} className={\`px-3 py-2.5 rounded-xl text-xs font-semibold border \${isComparing ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-200'}\`}><GitCompare className="w-3.5 h-3.5" /></button>
                <button onClick={() => addToResearchModal(b)} className="p-2.5 bg-slate-100 hover:bg-indigo-50 rounded-xl"><PlusCircle className="w-4 h-4" /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`,
  'src/components/ProfileView.jsx': `import React from 'react';
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
            <button onClick={() => toggleCompare(business.id)} className={\`px-4 py-2.5 rounded-xl text-xs font-semibold border \${isComparing ? 'bg-indigo-600 text-white' : 'bg-white text-slate-700'}\`}>Compare</button>
            <button onClick={() => addToResearchModal(business)} className="bg-indigo-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl">Add to Research</button>
          </div>
        </div>
        <p className="text-base text-slate-700">{business.overview}</p>
      </div>
    </div>
  );
}`,
  'src/components/CompareView.jsx': `import React from 'react';
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
}`,
  'src/components/ResearchWorkspace.jsx': `import React from 'react';
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
}`,
  'src/components/ReportPreviewView.jsx': `import React from 'react';
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
}`,
  'src/components/AdminView.jsx': `import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';

export default function AdminView({ businesses, setBusinesses, industries }) {
  const [newBrandName, setNewBrandName] = useState('');
  const [success, setSuccess] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newBrandName) return;
    const newItem = {
      id: newBrandName.toLowerCase().replace(/\\s+/g, '-'),
      brand_name: newBrandName,
      company_name: newBrandName + " Co.",
      industry: industries[0],
      category: "General",
      country: "Thailand",
      founded: 2020,
      business_type: "B2C",
      official_website: "https://example.com",
      main_market: "General Consumer",
      target_market: ["Young Adults"],
      price_segment: "Mass Market",
      positioning: "Positioning summary",
      competitors: [],
      short_description: "Description",
      overview: "Overview",
      market_description: "Market",
      target_market_description: "Target",
      source: "Admin",
      source_url: "",
      last_updated: "2026-03-01",
      data_status: "Verified"
    };
    setBusinesses([newItem, ...businesses]);
    setNewBrandName('');
    setSuccess('Added successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-extrabold">Admin Dashboard</h1>
      {success && <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl text-xs font-semibold flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" />{success}</div>}
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl border shadow-sm flex gap-4">
        <input type="text" value={newBrandName} onChange={e => setNewBrandName(e.target.value)} placeholder="Brand Name" className="border p-3 rounded-xl flex-1 text-sm" required />
        <button type="submit" className="bg-indigo-600 text-white px-6 rounded-xl text-sm font-semibold flex items-center gap-2"><Plus className="w-4 h-4" /> Add</button>
      </form>
    </div>
  );
}`,
  'src/App.jsx': `import React, { useState } from 'react';
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
      id: \`res-\${Date.now()}\`,
      title: \`New Business Research \${researchProjects.length + 1}\`,
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
}`
};

// Create directories and files
Object.keys(files).forEach((filePath) => {
  const fullPath = path.resolve(filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, files[filePath], 'utf8');
  console.log('Created:', filePath);
});

console.log('\\nProject generated successfully! Now run:');
console.log('1. npm install');
console.log('2. npm run dev');