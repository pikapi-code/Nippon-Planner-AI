import React, { useMemo, useState } from 'react';
import { GeneratedItinerary } from '../types';
import { IMAGE_MAP } from '../constants';

interface ItineraryDisplayProps {
  data: GeneratedItinerary;
  onReset: () => void;
}

export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ data, onReset }) => {
  // Simple parsing logic to split the markdown into days if possible
  const days = useMemo(() => {
    const rawText = data.text;
    // Regex to find "## Day X" headers. 
    // Note: This depends on the model following the prompt. 
    // If it fails, we fallback to showing the whole text.
    const splitRegex = /(?=##\s*Day\s*\d+)/i;
    const parts = rawText.split(splitRegex).filter(p => p.trim().length > 0);
    
    // If the split didn't work well (e.g. only 1 part that is huge), just return one big block.
    if (parts.length < 2) return [{ title: "Full Itinerary", content: rawText }];

    return parts.map(part => {
      // Extract title from the first line (e.g. "## Day 1: Tokyo - Arrival")
      const lines = part.split('\n');
      const titleLine = lines[0].replace(/^##\s*/, '').trim();
      const content = lines.slice(1).join('\n').trim();
      return { title: titleLine, content };
    });
  }, [data.text]);

  const [activeDay, setActiveDay] = useState(0);

  // Determine an image for the active day based on keywords in the title/content
  const getDayImage = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('tokyo')) return IMAGE_MAP.tokyo;
    if (lower.includes('kyoto')) return IMAGE_MAP.kyoto;
    if (lower.includes('osaka')) return IMAGE_MAP.osaka;
    if (lower.includes('food') || lower.includes('sushi') || lower.includes('market')) return IMAGE_MAP.food;
    if (lower.includes('hike') || lower.includes('mountain') || lower.includes('nature')) return IMAGE_MAP.nature;
    return IMAGE_MAP.default;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Your 14-Day Plan</h2>
        <button 
          onClick={onReset}
          className="text-sm text-slate-500 hover:text-indigo-600 underline decoration-indigo-300 underline-offset-4"
        >
          Start Over
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation (Desktop) / Horizontal Scroll (Mobile) */}
        <div className="lg:w-1/4 flex-shrink-0">
          <div className="sticky top-24 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 font-semibold text-slate-700">
              Timeline
            </div>
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible">
              {days.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveDay(idx)}
                  className={`
                    flex-shrink-0 lg:w-full text-left px-4 py-3 text-sm border-b lg:border-b-0 border-r lg:border-r-0 lg:border-l-4 transition-colors whitespace-nowrap lg:whitespace-normal
                    ${activeDay === idx 
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-900 font-medium' 
                      : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                  `}
                >
                  {day.title.split(':')[0]} {/* Shows "Day 1" */}
                  <span className="hidden lg:block text-xs text-slate-500 font-normal mt-1 truncate">
                    {day.title.split(':')[1] || day.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
              {/* Day Hero Image */}
              <div className="h-48 md:h-64 w-full relative">
                <img 
                  src={getDayImage(days[activeDay].title + days[activeDay].content)} 
                  alt="Day visual" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                   <h3 className="text-white text-2xl md:text-3xl font-bold p-6 md:p-8 w-full">
                     {days[activeDay].title}
                   </h3>
                </div>
              </div>

              {/* Day Details */}
              <div className="p-6 md:p-10 prose prose-slate max-w-none prose-headings:text-indigo-900 prose-a:text-indigo-600">
                 {/* Simple Markdown-ish renderer */}
                 {days[activeDay].content.split('\n').map((line, i) => {
                   if (line.startsWith('###')) {
                     return <h3 key={i} className="text-xl font-semibold mt-6 mb-3 text-indigo-800">{line.replace('###', '')}</h3>;
                   }
                   if (line.startsWith('-') || line.startsWith('*')) {
                     return <li key={i} className="ml-4 list-disc text-slate-700 mb-2">{line.replace(/^[-*]\s/, '')}</li>;
                   }
                   if (line.trim() === '') {
                     return <br key={i} />;
                   }
                   return <p key={i} className="mb-2 text-slate-700 leading-relaxed">{line}</p>;
                 })}
              </div>

              {/* Grounding / Sources Section */}
              {data.groundingChunks && data.groundingChunks.length > 0 && (
                <div className="bg-slate-50 p-6 border-t border-slate-100">
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Sources & References</h4>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {data.groundingChunks.map((chunk, idx) => (
                      chunk.web && (
                        <a 
                          key={idx} 
                          href={chunk.web.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center p-2 bg-white rounded border border-slate-200 hover:border-indigo-300 hover:shadow-sm transition-all text-sm text-indigo-600 truncate"
                        >
                          <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                          <span className="truncate">{chunk.web.title}</span>
                        </a>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  );
};