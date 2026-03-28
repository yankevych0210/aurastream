"use client";

import LegalSection from "@/components/shared/LegalSection";

export default function CookiesPage() {
  return (
    <LegalSection title="Cookie Policy" lastUpdated="March 28, 2026">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">1. What Are Cookies?</h2>
        <p>
          Cookies are small text files that are stored on your computer or mobile device
          when you visit AuraStream. They help us remember your preferences and
          provide a better experience.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">2. Essential Cookies</h2>
        <p>
          These cookies are necessary for AuraStream to function. They include:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Authentication cookies to keep you signed in</li>
          <li>Session cookies to manage your interaction with the platform</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">3. Analytics and Personalization</h2>
        <p>
          We use these cookies to understand how you use AuraStream and to personalize
          your experience, such as remembering your watchlist.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">4. Your Cookie Choices</h2>
        <p>
          You can manage your cookie preferences through the Cookie Banner that appears
          when you visit AuraStream. You can also disable cookies in your browser settings.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">5. Changes to This Policy</h2>
        <p>
          We may update this Cookie Policy at any time. Your continued use of
          AuraStream will mean that you accept the updated policy.
        </p>
      </section>
    </LegalSection>
  );
}
