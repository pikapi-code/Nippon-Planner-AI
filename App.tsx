import React, { useState, useCallback } from 'react';
import { Hero } from './components/Hero';
import { ItineraryForm } from './components/ItineraryForm';
import { ItineraryDisplay } from './components/ItineraryDisplay';
import { Footer } from './components/Footer';
import { generateItinerary } from './services/geminiService';
import { UserPreferences, GeneratedItinerary } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [itineraryData, setItineraryData] = useState<GeneratedItinerary | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (prefs: UserPreferences) => {
    setIsLoading(true);
    setError(null);
    setItineraryData(null);

    try {
      const data = await generateItinerary(prefs);
      setItineraryData(data);
    } catch (err) {
      console.error("Failed to generate itinerary:", err);
      setError("Something went wrong while crafting your journey. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setItineraryData(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center cursor-pointer" onClick={handleReset}>
              <span className="text-2xl mr-2">🌸</span>
              <span className="font-bold text-xl tracking-tight text-slate-800">NihonPlan AI</span>
            </div>
            <div>
                <a href="#" className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">About</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {!itineraryData && !isLoading && (
          <>
            <Hero />
            <div className="max-w-3xl mx-auto px-4 py-12 -mt-20 relative z-10">
               <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100">
                 <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">Design Your Journey</h2>
                 {error && (
                   <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r">
                     <p>{error}</p>
                   </div>
                 )}
                 <ItineraryForm onSubmit={handleGenerate} />
               </div>
            </div>
          </>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-32 px-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mb-8"></div>
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">Crafting your adventure...</h3>
            <p className="text-slate-500 text-center max-w-md">
              Consulting the AI to find the best sushi spots, hidden temples, and efficient bullet train routes for you.
            </p>
          </div>
        )}

        {itineraryData && (
          <ItineraryDisplay 
            data={itineraryData} 
            onReset={handleReset} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;