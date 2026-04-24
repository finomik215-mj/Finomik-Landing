import React from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';
import { SolutionLayout } from '../components/SolutionLayout';

export default function SolutionsUniversities() {
  return (
    <SolutionLayout>
      <SeoHead
        title="Financial Literacy Program for Universities | Financial Education for Students"
        description="Finomik delivers a financial literacy program for universities and financial education for students. Personal finance course for educational institutions and higher ed with measurable outcomes."
        path="/solutions/universities"
      />
      <section className="py-20 md:py-28 bg-[#1C386E] text-white">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Financial literacy program for universities
          </h1>
          <p className="text-xl text-blue-100 mb-10">
            Financial education for students at scale. A personal finance course for educational institutions and higher ed that builds real skills — not just theory.
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
          <h2 className="text-3xl font-extrabold text-finomik-navy mb-8">Built for higher education</h2>
          <ul className="space-y-6 text-gray-600 leading-relaxed">
            <li><strong className="text-finomik-navy">Financial education for students</strong> — Content designed for young adults: budgeting, saving, investing basics, and real-life scenarios.</li>
            <li><strong className="text-finomik-navy">Personal finance course for educational institutions</strong> — Flexible curriculum that fits credit-bearing courses or optional programs.</li>
            <li><strong className="text-finomik-navy">Financial literacy education tools</strong> — Dashboards, assessments, and progress tracking for faculty and administrators.</li>
            <li><strong className="text-finomik-navy">Scalable delivery</strong> — Deploy to thousands of students with LMS integration and single sign-on.</li>
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
