import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in pb-16">
      <Link to="/" className="btn btn-outline text-xs mb-8 inline-flex">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Link>
      <div className="glass-panel p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="neo-card p-3 !rounded-xl bg-primary">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-black">Privacy Policy</h1>
        </div>
        <p className="text-foreground/50 text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Introduction</h2>
            <p>Welcome to Ledgerly. Your privacy is important to us. This Privacy Policy explains how we handle your information when you use our expense tracking application.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Data Collection & Storage</h2>
            <p>Ledgerly is designed with a <strong>privacy-first approach</strong>. All your financial data, including transactions, categories, and preferences, is stored <strong>exclusively in your browser's local storage</strong>. We do not collect, transmit, or store any of your personal or financial data on external servers.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. No Cookies or Tracking</h2>
            <p>We do not use cookies, analytics trackers, or any third-party tracking services. Your usage of Ledgerly remains entirely private.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Data Export</h2>
            <p>You have complete ownership of your data. Our export feature allows you to download your transaction history as CSV or JSON files at any time. Since data is stored locally, clearing your browser data will remove all stored information.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Third-Party Services</h2>
            <p>Ledgerly uses Google Fonts for typography (Space Grotesk). Google may collect basic request data as outlined in their privacy policy. No other third-party services are integrated.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Open Source</h2>
            <p>Ledgerly is an open-source project. You can review the complete source code on our <a href="https://github.com/Rebaka8" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">GitHub repository</a> to verify our privacy practices.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Changes</h2>
            <p>We may update this policy as the application evolves. Any changes will be reflected on this page with an updated revision date.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. Contact</h2>
            <p>For questions or concerns about this privacy policy, please reach out through our <a href="https://github.com/Rebaka8" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">GitHub</a> or <a href="https://www.linkedin.com/in/rebaka-meda-6832b2367" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">LinkedIn</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
