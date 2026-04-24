import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { SolutionLayout } from '../components/SolutionLayout';

export default function SolutionsTechnology() {
  return (
    <SolutionLayout>
      <SeoHead
        title="AI Financial Education Platform | Interactive Financial Literacy Solution for Educational Institutions"
        description="Finomik is an AI financial education platform and interactive financial education platform. Next-gen financial literacy technology and financial literacy solution for educational institutions."
        path="/solutions/technology"
      />
      <section className="py-20 md:py-28 bg-[#1C386E] text-white">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            AI financial education platform and interactive financial literacy
          </h1>
          <p className="text-xl text-blue-100 mb-10">
            Modern financial literacy technology — an interactive financial education platform and financial literacy solution for educational institutions that scales.
          </p>
          <Link
            to="/more-info"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-bold bg-white text-finomik-navy hover:bg-blue-50 transition-colors"
          >
            Request a demo
          </Link>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <h2 className="text-3xl font-extrabold text-finomik-navy mb-8">Next-gen financial literacy technology</h2>
          <ul className="space-y-6 text-gray-600 leading-relaxed">
            <li><strong className="text-finomik-navy">AI financial education platform</strong> — Smarter content and feedback that adapts to each learner.</li>
            <li><strong className="text-finomik-navy">Interactive financial education platform</strong> — Gamification, scenarios, and daily challenges — not passive videos.</li>
            <li><strong className="text-finomik-navy">Financial literacy solution for educational institutions</strong> — One platform for curriculum, engagement, and measurable outcomes.</li>
            <li><strong className="text-finomik-navy">Built for scale</strong> — Cloud-native, secure, and ready for districts and multi-campus deployments.</li>
          </ul>
          <div className="mt-12">
            <Link to="/more-info" className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-bold bg-accent-gradient text-white hover:opacity-95 transition-colors">
              Get more information
            </Link>
          </div>
        </div>
      </section>
    </SolutionLayout>
  );
}
