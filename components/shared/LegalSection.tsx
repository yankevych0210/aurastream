"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LegalSectionProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export default function LegalSection({ title, lastUpdated, children }: LegalSectionProps) {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 bg-[#0a0a0a]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          {title}
        </h1>
        <p className="text-white/40 text-sm mb-12">
          Last Updated: {lastUpdated}
        </p>

        <div className="prose prose-invert prose-purple max-w-none space-y-8 text-white/70 leading-relaxed">
          {children}
        </div>
      </motion.div>
    </main>
  );
}
