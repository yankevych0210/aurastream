"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ShieldCheck, Settings2 } from "lucide-react";

const STORAGE_KEY = "aurastream-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, date: Date.now() }));
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: false, date: Date.now() }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[500] w-full max-w-2xl px-4"
        >
          <div
            className="relative rounded-2xl border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden"
            style={{ background: "rgba(18,18,20,0.97)", backdropFilter: "blur(24px)" }}
          >
            {/* Top accent */}
            <div className="absolute inset-x-0 top-0 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)" }} />

            <div className="p-5 md:p-6">
              <div className="flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center mt-0.5">
                  <Cookie className="w-5 h-5 text-purple-400" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-white font-bold text-sm">Cookie Preferences</h3>
                    <button
                      onClick={decline}
                      className="flex-shrink-0 w-7 h-7 rounded-full hover:bg-white/8 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-white/45 text-xs leading-relaxed mb-4">
                    We use cookies to improve your experience, personalize content, and analyze
                    performance. By clicking <strong className="text-white/60">Accept All</strong>,
                    you agree to the use of cookies as described in our{" "}
                    <span className="text-purple-400 cursor-pointer hover:text-purple-300 transition-colors">
                      Privacy Policy
                    </span>.
                  </p>

                  {/* Expandable details */}
                  <AnimatePresence>
                    {showDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 pb-2">
                          {[
                            { name: "Essential", desc: "Required for the site to function", required: true },
                            { name: "Analytics", desc: "Help us improve the platform", required: false },
                            { name: "Personalization", desc: "Save your preferences", required: false },
                          ].map(({ name, desc, required }) => (
                            <div key={name} className="flex items-start gap-2 bg-white/4 rounded-xl p-3 border border-white/6">
                              <div className={`w-4 h-4 rounded-sm mt-0.5 flex-shrink-0 flex items-center justify-center ${
                                required ? "bg-green-500/80" : "bg-white/15"
                              }`}>
                                {required && <ShieldCheck className="w-3 h-3 text-white" />}
                              </div>
                              <div>
                                <p className="text-white/80 text-xs font-semibold">{name}</p>
                                <p className="text-white/35 text-[10px] leading-snug mt-0.5">{desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={accept}
                      className="px-5 py-2 rounded-xl text-xs font-bold text-white shadow-lg transition-all"
                      style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
                    >
                      Accept All
                    </motion.button>
                    <button
                      onClick={decline}
                      className="px-5 py-2 rounded-xl text-xs font-semibold text-white/50 hover:text-white/80 bg-white/5 hover:bg-white/10 border border-white/8 transition-all"
                    >
                      Reject Non-Essential
                    </button>
                    <button
                      onClick={() => setShowDetails((v) => !v)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white/35 hover:text-white/60 transition-colors ml-auto"
                    >
                      <Settings2 className="w-3.5 h-3.5" />
                      {showDetails ? "Hide details" : "Customize"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
