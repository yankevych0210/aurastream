"use client";

import LegalSection from "@/components/shared/LegalSection";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactSuccessPage() {
  return (
    <LegalSection title="Thank You!" lastUpdated="March 28, 2026">
      <div className="flex flex-col items-center justify-center text-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-24 h-24 rounded-full bg-green-500/15 border border-green-500/20 flex items-center justify-center mb-8"
        >
          <CheckCircle className="w-12 h-12 text-green-400" />
        </motion.div>

        <h2 className="text-3xl font-black text-white mb-4 tracking-tight">
          Message Received Successfully
        </h2>
        
        <p className="text-white/45 text-lg max-w-md mx-auto mb-10 leading-relaxed">
          Thank you for reaching out to AuraStream. We have received your message and 
          our support team will get back to you as soon as possible.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-black font-bold text-sm shadow-xl hover:bg-white/90 transition-all active:scale-[0.98]"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" />
            Send Another
          </Link>
        </div>
      </div>
    </LegalSection>
  );
}
