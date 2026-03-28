"use client";

import LegalSection from "@/components/shared/LegalSection";

export default function HelpPage() {
  const faqs = [
    {
      q: "What is AuraStream?",
      a: "AuraStream is a premium, Netflix-inspired streaming platform where you can discover and watch movies and TV shows."
    },
    {
      q: "Is AuraStream free?",
      a: "Yes, AuraStream is currently free to use for educational purposes. All content is provided by the TMDB API."
    },
    {
      q: "How do I add movies to My List?",
      a: "Simply hover over any movie card and click the '+' icon, or click on a movie to open details and add it from there."
    },
    {
      q: "Where can I watch movies?",
      a: "Movies can be played directly within the platform. Click 'Play' or the play icon on any movie card or detail modal."
    },
    {
      q: "Do I need to sign in?",
      a: "Yes, to ensure your watchlist is saved and personalized, you need to sign in using your Google account."
    }
  ];

  return (
    <LegalSection title="Help Center" lastUpdated="March 28, 2026">
      <div className="space-y-10">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-white/60 mb-8">
            Find answers to common questions about AuraStream below.
          </p>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/8 transition-colors">
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 pt-8 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white">Technological Overview</h2>
          <p>
            AuraStream is built using the latest web technologies, including:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Next.js 16</strong> for blazing fast performance</li>
            <li><strong>Supabase</strong> for database and authentication</li>
            <li><strong>TMDB API</strong> for movie and TV show data</li>
            <li><strong>Tailwind CSS 4</strong> for a modern design system</li>
          </ul>
        </section>
      </div>
    </LegalSection>
  );
}
