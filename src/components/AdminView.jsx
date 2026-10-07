import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';

export default function AdminView({ businesses, setBusinesses, industries }) {
  const [newBrandName, setNewBrandName] = useState('');
  const [success, setSuccess] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newBrandName) return;
    const newItem = {
      id: newBrandName.toLowerCase().replace(/\s+/g, '-'),
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
}