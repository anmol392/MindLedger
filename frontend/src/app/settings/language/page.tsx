"use client";

import { useState, useEffect } from "react";
import { Check, Globe } from "lucide-react";

const languages = [
  { code: 'hi', native: 'हिन्दी', english: 'Hindi', flag: '🇮🇳' },
  { code: 'mr', native: 'मराठी', english: 'Marathi', flag: '🇮🇳' },
  { code: 'ta', native: 'தமிழ்', english: 'Tamil', flag: '🇮🇳' },
  { code: 'te', native: 'తెలుగు', english: 'Telugu', flag: '🇮🇳' },
  { code: 'bn', native: 'বাংলা', english: 'Bengali', flag: '🇮🇳' },
  { code: 'gu', native: 'ગુજરાતી', english: 'Gujarati', flag: '🇮🇳' },
  { code: 'kn', native: 'ಕನ್ನಡ', english: 'Kannada', flag: '🇮🇳' },
  { code: 'ml', native: 'മലയാളം', english: 'Malayalam', flag: '🇮🇳' },
  { code: 'pa', native: 'ਪੰਜਾਬੀ', english: 'Punjabi', flag: '🇮🇳' },
  { code: 'ur', native: 'اردو', english: 'Urdu', flag: '🇵🇰' },
  { code: 'en', native: 'English', english: 'English', flag: '🇺🇸' },
  { code: 'fr', native: 'Français', english: 'French', flag: '🇫🇷' },
];

export default function LanguageSettingsPage() {
  const [selectedLang, setSelectedLang] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('i18nextLng');
    if (saved) setSelectedLang(saved);
  }, []);

  const handleSelect = async (code: string) => {
    setSelectedLang(code);
    localStorage.setItem('i18nextLng', code);
    // TODO: Update DB via API /api/user/settings
    // await axios.patch('/api/user/settings', { language: code });
    // i18n.changeLanguage(code);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 lg:p-12">
      <div className="mx-auto max-w-4xl">
        <header className="mb-12 flex flex-col gap-4">
           <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs">
              <Globe className="size-4" />
              Cognitive Localization Settings
           </div>
           <h1 className="text-4xl font-black tracking-tight text-[#0F172A] uppercase sm:text-5xl">Select Your Academic Interface Language</h1>
           <p className="max-w-xl text-muted-foreground font-black uppercase tracking-widest text-xs">Choose your preferred language for problem statements, solvers, and platform interactions.</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`group flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 ${
                 selectedLang === lang.code 
                   ? 'bg-emerald-50 border-emerald-600 shadow-xl shadow-emerald-600/10 scale-[1.02]' 
                   : 'bg-white border-black/5 hover:border-black/10 hover:bg-muted shadow-soft'
              }`}
            >
              <div className="flex items-center gap-4 text-left">
                <span className="text-2xl">{lang.flag}</span>
                <div>
                   <p className="text-lg font-black text-[#0F172A] group-hover:text-primary transition-colors uppercase tracking-tight leading-relaxed">{lang.native}</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{lang.english}</p>
                </div>
              </div>
              {selectedLang === lang.code && (
                <div className="size-8 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-600/20">
                   <Check className="size-5 stroke-[3px]" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-12 p-8 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-6">
           <div className="size-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
              <span className="text-2xl font-black">!</span>
           </div>
           <div>
              <p className="text-sm font-black text-amber-600 uppercase tracking-widest leading-relaxed">Automatic Translation Protocol Enabled</p>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">When selecting a non-English language, all academic problems will be auto-translated via DeepL. Translation job queues will prioritize your selected language.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
