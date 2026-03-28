"use client";

import LegalSection from "@/components/shared/LegalSection";
import { Mail, MessageSquare, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/contact-success");
    }, 1200);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "support@aurastream.com" },
    { icon: MessageSquare, label: "Support Chat", value: "Available 24/7" },
    { icon: Phone, label: "Phone", value: "+1 (888) 123-4567" },
    { icon: MapPin, label: "Office", value: "San Francisco, CA" },
  ];

  return (
    <LegalSection title="Contact Us" lastUpdated="March 28, 2026">
      <div className="max-w-2xl mx-auto">
        <section className="bg-white/5 p-8 md:p-10 rounded-3xl border border-white/8 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Get in Touch</h2>
            <p className="text-white/45 text-sm leading-relaxed">
              Have a question, feedback, or need support? Fill out the form below and we'll 
              get back to you as soon as possible.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-white/50 text-xs font-bold uppercase ml-1">Full Name</label>
              <input
                id="name"
                type="text"
                required
                placeholder="Enter your name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-purple-500/50 transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-white/50 text-xs font-bold uppercase ml-1">Email Address</label>
              <input
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-purple-500/50 transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-white/50 text-xs font-bold uppercase ml-1">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="How can we help?"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none focus:border-purple-500/50 transition-all resize-none font-medium"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black text-sm shadow-xl shadow-purple-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Sending Message..." : "Send Message"}
            </button>
          </form>
        </section>
      </div>
    </LegalSection>
  );
}
