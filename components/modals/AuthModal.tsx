"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Shield, Zap } from "lucide-react";
import { signIn } from "next-auth/react";
import { useModalStore } from "@/store/useModalStore";

const PERKS = [
  { icon: Play, text: "Unlimited movies & TV shows" },
  { icon: Zap, text: "Instant HD & 4K streaming" },
  { icon: Shield, text: "Secure personal watchlist" },
];

export default function AuthModal() {
  const { isAuthOpen, closeAuthModal } = useModalStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: window.location.origin });
    } catch (error) {
      console.error("Google sign in error:", error);
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isAuthOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuthModal}
            className="absolute inset-0 bg-black/85"
            style={{ backdropFilter: "blur(16px)" }}
          />

          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.08] shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
            style={{ background: "linear-gradient(160deg, #1a1a1a 0%, #111111 100%)" }}
          >
            {/* Top gradient accent */}
            <div
              className="absolute inset-x-0 top-0 h-1 rounded-t-3xl"
              style={{ background: "linear-gradient(90deg, #7c3aed, #2563eb, #7c3aed)" }}
            />

            {/* Close */}
            <button
              onClick={closeAuthModal}
              className="absolute right-4 top-4 z-10 rounded-full p-2 text-white/30 hover:text-white hover:bg-white/10 transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="px-6 sm:px-8 py-8 sm:pt-10 sm:pb-9">
              {/* Logo / Icon */}
              <div className="flex justify-center mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
                >
                  <Play className="w-8 h-8 fill-white text-white ml-1" />
                </div>
              </div>

              {/* Heading */}
              <div className="text-center mb-7">
                <h2 className="text-2xl font-black text-white tracking-tight mb-2">
                  Sign in to AuraStream
                </h2>
                <p className="text-white/45 text-sm leading-relaxed">
                  Create a free account to start watching,<br />
                  search content, and build your list.
                </p>
              </div>

              {/* Perks */}
              <div className="space-y-2.5 mb-8">
                {PERKS.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-white/60">
                    <div className="w-7 h-7 rounded-full bg-white/6 border border-white/8 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>

              {/* Google button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="relative flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-bold text-gray-900 shadow-lg hover:bg-gray-50 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg className="w-5 h-5 animate-spin text-gray-500" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                {isLoading ? "Signing in..." : "Continue with Google"}
              </motion.button>

              <p className="mt-5 text-center text-[11px] text-white/22 leading-relaxed">
                By continuing you agree to our{" "}
                <span className="text-white/40 cursor-pointer hover:text-white/60 transition-colors">Terms of Service</span>
                {" "}and{" "}
                <span className="text-white/40 cursor-pointer hover:text-white/60 transition-colors">Privacy Policy</span>.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
