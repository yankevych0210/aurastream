"use client";

import LegalSection from "@/components/shared/LegalSection";

export default function PrivacyPage() {
  return (
    <LegalSection title="Privacy Policy" lastUpdated="March 28, 2026">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">1. Introduction</h2>
        <p>
          At AuraStream, we are committed to protecting your privacy. This Privacy Policy
          explains how your personal information is collected, used, and disclosed by
          AuraStream.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">2. Information Collection</h2>
        <p>
          We collect information from you when you sign in via Google OAuth. This includes:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your profile picture</li>
        </ul>
        <p>
          We also collect information about your watchlist (My List) to providing you with
          a personalized experience.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">3. How We Use Your Information</h2>
        <p>
          The information we collect is used to:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Provide, operate, and maintain AuraStream</li>
          <li>Improve, personalize, and expand AuraStream</li>
          <li>Understand and analyze how you use AuraStream</li>
          <li>Communicate with you for customer service and support</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">4. Cookies</h2>
        <p>
          AuraStream uses cookies to personalize your experience and remember your
          preferences. For more information, please see our Cookie Policy.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-white">5. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at
          support@aurastream.com.
        </p>
      </section>
    </LegalSection>
  );
}
