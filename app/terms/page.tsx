"use client";

import LegalSection from "@/components/shared/LegalSection";

export default function TermsPage() {
  return (
    <LegalSection title="Terms of Service" lastUpdated="March 28, 2026">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">1. Use of AuraStream</h2>
        <p>
          By using AuraStream, you agree to these Terms of Service. If you do not agree,
          please do not use AuraStream.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">2. Intellectual Property</h2>
        <p>
          The content on AuraStream, including metadata, descriptions, and posters,
          is provided by TMDB. The design and software of AuraStream are our property.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">3. User Conduct</h2>
        <p>
          You agree to use AuraStream only for lawful purposes and in a way that does not
          interfere with the use of others.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">4. Disclaimer of Liability</h2>
        <p>
          AuraStream is provided "as is" and we are not liable for any damages that may
          result from its use.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">5. Changes to Terms</h2>
        <p>
          We may update these Terms of Service at any time. Your continued use of
          AuraStream will mean that you accept the updated terms.
        </p>
      </section>
    </LegalSection>
  );
}
