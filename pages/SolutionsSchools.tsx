import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { SolutionLayout } from '../components/SolutionLayout';

export default function SolutionsSchools() {
  return (
    <SolutionLayout>
      <SeoHead
        title="Financial Literacy Software for Educational Institutions | Finomik – Financial Education Platform"
        description="Finomik is the financial education platform for educational institutions. Gamified financial literacy software and digital financial literacy program with LMS integration for K-12."
        path="/solutions/schools"
      />
      <section className="py-20 md:py-28 bg-[#1C386E] text-white">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Financial literacy software for educational institutions that students love
          </h1>
          <p className="text-xl text-blue-100 mb-10">
            The financial education platform for educational institutions — gamified, interactive, and built to fit your curriculum and LMS.
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
          <h2 className="text-3xl font-extrabold text-finomik-navy mb-8">Why educational institutions choose Finomik</h2>
          <ul className="space-y-6 text-gray-600 leading-relaxed">
            <li><strong className="text-finomik-navy">Digital financial literacy program</strong> — Ready-to-use modules that work on any device. No heavy textbooks.</li>
            <li><strong className="text-finomik-navy">Financial literacy curriculum software</strong> — Aligns with standards and fits into existing lesson plans.</li>
            <li><strong className="text-finomik-navy">Financial literacy LMS integration</strong> — Single sign-on and grade sync with your learning management system.</li>
            <li><strong className="text-finomik-navy">Gamified financial literacy platform</strong> — Daily challenges and progress tracking that keep students engaged.</li>
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
