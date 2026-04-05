import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in pb-16">
      <Link to="/" className="btn btn-outline text-xs mb-8 inline-flex">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Link>
      <div className="glass-panel p-8 md:p-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="neo-card p-3 !rounded-xl bg-primary">
            <FileText className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-black">Terms of Service</h1>
        </div>
        <p className="text-foreground/50 text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using Ledgerly, you agree to be bound by these Terms of Service. If you do not agree, please do not use the application.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">2. Description of Service</h2>
            <p>Ledgerly is a free, open-source personal finance tracking application. It allows users to log transactions, view analytics, export data, and manage their finances through a browser-based interface. <strong>The application is currently under active development</strong> and features may be added, modified, or removed at any time.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">3. No Financial Advice</h2>
            <p>Ledgerly is provided for <strong>personal tracking and educational purposes only</strong>. It does not constitute financial, investment, tax, or legal advice. Always consult a qualified professional for financial decisions.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">4. Data Responsibility</h2>
            <p>All data is stored locally in your browser. You are responsible for backing up your data using our export features. We are not liable for any data loss due to browser actions, device changes, or other causes.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">5. Intellectual Property</h2>
            <p>The Ledgerly name, logo, and design are the property of the developer. The application source code is available under an open-source license on <a href="https://github.com/Rebaka8" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">GitHub</a>.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">6. Limitation of Liability</h2>
            <p>Ledgerly is provided "as is" without warranties of any kind. The developer shall not be held liable for any damages arising from the use of this application, including but not limited to financial losses, data loss, or inaccuracies in tracking or reporting.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">7. Modifications</h2>
            <p>These Terms may be updated as the application evolves. Continued use of Ledgerly after changes constitutes acceptance of the revised Terms. We encourage users to review this page periodically.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3">8. Contact</h2>
            <p>For questions about these terms, please contact the developer via <a href="https://github.com/Rebaka8" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">GitHub</a> or <a href="https://www.linkedin.com/in/rebaka-meda-6832b2367" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">LinkedIn</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
