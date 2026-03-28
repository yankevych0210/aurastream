"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Check, ChevronDown } from "lucide-react";
import { useLanguageStore, LanguageCode } from "@/store/useLanguageStore";

const languages: { code: LanguageCode; label: string; flag: string }[] = [
  { code: "en-US", label: "English", flag: "🇺🇸" },
  { code: "uk-UA", label: "Ukrainian", flag: "🇺🇦" },
  { code: "ru-RU", label: "Russian", flag: "🇷🇺" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs font-bold text-white/80 hover:text-white"
      >
        <Globe className="w-3.5 h-3.5 text-purple-400" />
        <span className="hidden sm:inline uppercase tracking-wider">{currentLang.code.split('-')[0]}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute right-0 mt-2 w-48 py-2 rounded-2xl bg-[#1A1A1A]/95 backdrop-blur-xl border border-white/10 shadow-2xl z-50 overflow-hidden"
          >
            <div className="px-4 py-2 border-b border-white/5 mb-1">
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Select Language</span>
            </div>
            
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all hover:bg-white/5 ${
                  language === lang.code ? "text-purple-400 font-bold" : "text-white/60 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg leading-none">{lang.flag}</span>
                  <span>{lang.label}</span>
                </div>
                {language === lang.code && <Check className="w-4 h-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
