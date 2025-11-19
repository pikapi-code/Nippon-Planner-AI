import React, { useState } from 'react';
import { Season, Pace, UserPreferences } from '../types';
import { SEASONS, PACES, INTERESTS } from '../constants';

interface ItineraryFormProps {
  onSubmit: (prefs: UserPreferences) => void;
}

export const ItineraryForm: React.FC<ItineraryFormProps> = ({ onSubmit }) => {
  const [season, setSeason] = useState<Season>(Season.Spring);
  const [pace, setPace] = useState<Pace>(Pace.Balanced);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ season, pace, interests: selectedInterests });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Season Section */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">When are you traveling?</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SEASONS.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setSeason(s.value)}
              className={`
                relative flex items-center p-4 border rounded-xl text-left transition-all
                ${season === s.value 
                  ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600' 
                  : 'border-slate-200 hover:border-slate-300 bg-white'}
              `}
            >
              <span className="text-2xl mr-3">{s.icon}</span>
              <span className={`font-medium ${season === s.value ? 'text-indigo-900' : 'text-slate-900'}`}>
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Pace Section */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">Travel Pace</label>
        <div className="flex flex-col sm:flex-row gap-4">
          {PACES.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => setPace(p.value)}
              className={`
                flex-1 p-4 border rounded-xl text-center transition-all
                ${pace === p.value 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold' 
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'}
              `}
            >
              <div className="text-base">{p.label}</div>
              <div className="text-xs text-slate-500 mt-1 font-normal">{p.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Interests Section */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">What interests you? (Pick up to 3)</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {INTERESTS.map((interest) => {
            const isSelected = selectedInterests.includes(interest.id);
            return (
              <button
                key={interest.id}
                type="button"
                onClick={() => toggleInterest(interest.id)}
                className={`
                  flex items-center justify-center p-3 rounded-full border text-sm font-medium transition-colors
                  ${isSelected 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'}
                `}
              >
                <span className="mr-2">{interest.icon}</span>
                {interest.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Generate My Itinerary ✨
        </button>
      </div>
    </form>
  );
};