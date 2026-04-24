import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { SolutionLayout } from '../components/SolutionLayout';

export default function SolutionsPlatform() {
  return (
    <SolutionLayout>
      <SeoHead
        title="Financial Literacy LMS Integration & Curriculum Software | Finomik"
        description="Finomik offers financial literacy LMS integration and financial literacy curriculum software. Deploy a digital financial literacy program that fits your existing ed-tech stack."
        path="/solutions/platform"
      />
      <section className="py-20 md:py-28 bg-[#1C386E] text-white">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Financial literacy LMS integration and curriculum software
          </h1>
          <p className="text-xl text-blue-100 mb-10">
            A digital financial literacy program that plugs into your LMS. One platform for curriculum, progress, and reporting.
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
          <h2 className="text-3xl font-extrabold text-finomik-navy mb-8">Platform that fits your stack</h2>
          <ul className="space-y-6 text-gray-600 leading-relaxed">
            <li><strong className="text-finomik-navy">Financial literacy LMS integration</strong> — SSO, roster sync, and grade passback with major learning management systems.</li>
            <li><strong className="text-finomik-navy">Financial literacy curriculum software</strong> — Modular, standards-aligned content you can customize and sequence.</li>
            <li><strong className="text-finomik-navy">Digital financial literacy program</strong> — Web and mobile access so students learn anywhere, anytime.</li>
            <li><strong className="text-finomik-navy">Reporting and analytics</strong> — Engagement and learning outcomes at the class, institution, or district level.</li>
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
