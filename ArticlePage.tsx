import React, { useEffect } from 'react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, ExternalLink, BookOpen, TrendingUp } from 'lucide-react';
import { SeoHead } from './components/SeoHead';
import { useI18n } from './i18n';
import { getArticleBySlug, ArticleSection } from './articleData';
import { PageFooter } from './components/PageFooter';

function SectionBlock({ section }: { section: ArticleSection }) {
  return (
    <div className="mb-10">
      <h2 className="text-xl md:text-2xl font-extrabold text-[#0B3064] mb-4 leading-snug">
        {section.heading}
      </h2>
      {section.paragraphs.map((p, i) => (
        <p key={i} className="text-[#3C4C67] leading-relaxed mb-4 text-base md:text-[1.05rem]">
          {p}
        </p>
      ))}
      {section.subsections?.map((sub, j) => (
        <div key={j} className="mt-6 pl-5 border-l-2 border-[#C8D0DD] mb-6">
          <h3 className="text-base font-extrabold text-[#0B3064] mb-2">{sub.heading}</h3>
          {sub.paragraphs.map((p, k) => (
            <p key={k} className="text-[#3C4C67] leading-relaxed mb-3 text-sm md:text-base">
              {p}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useI18n();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const navigate = useNavigate();
  const handleBack = () => (window.history.length > 1 ? navigate(-1) : navigate('/'));

  const article = slug ? getArticleBySlug(slug) : undefined;
  if (!article) return <Navigate to="/404" replace />;

  const content = article.content[lang as 'es' | 'en' | 'ca'] ?? article.content.es;
  const seo = article.seo[lang as 'es' | 'en' | 'ca'] ?? article.seo.es;

  const dateLocale = lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES';
  const dateFormatted = new Date(article.meta.date).toLocaleDateString(dateLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-white text-[#0B3064] font-sans overflow-x-hidden">
      <SeoHead
        title={seo.title}
        description={seo.description}
        path={`/articulo/${article.slug}`}
        lang={lang}
      />

      {/* Sticky header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-[#E8EDF5] z-50">
        <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[#0B3064] font-semibold hover:text-[#5574A7] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {lang === 'en' ? 'Back' : lang === 'ca' ? 'Tornar' : 'Volver'}
          </button>
          <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#5574A7] bg-[#EEF2FB] px-3 py-1.5 rounded-full">
            {article.meta.category}
          </span>
        </div>
      </header>

      <main className="pt-20">
        {/* Article hero — light gradient, no heavy navy block */}
        <div className="bg-gradient-to-b from-[#f0f5fc] to-white border-b border-[#E8EDF5] pt-10 pb-10 md:pt-14 md:pb-12">
          <div className="container mx-auto px-6 md:px-12 max-w-3xl">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#8F9EB7] font-semibold uppercase tracking-wider mb-5">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {dateFormatted}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {article.meta.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.meta.readTime} {lang === 'en' ? 'read' : 'de lectura'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black text-[#0B3064] leading-tight mb-8">
              {content.title}
            </h1>

            {/* Stat callout — horizontal card, inline in hero */}
            <div className="flex items-center gap-5 bg-[#0B3064] rounded-2xl px-6 py-5 shadow-lg">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#F5C518] flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-[#0B3064]" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-3xl md:text-4xl font-black text-[#F5C518] leading-none mb-1">
                  {article.meta.stat}
                </span>
                <p className="text-white/85 text-sm leading-snug font-medium">
                  {article.meta.statLabel}
                </p>
                <p className="text-[#8F9EB7] text-xs mt-1 font-semibold uppercase tracking-wider">
                  {article.meta.source}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 max-w-3xl py-10 md:py-14">
          {/* Intro */}
          <p className="text-base md:text-lg text-[#3C4C67] leading-relaxed mb-10 font-medium border-l-4 border-[#F5C518] pl-5">
            {content.intro}
          </p>

          {/* Sections */}
          <div className="mb-12">
            {content.sections.map((section, i) => (
              <SectionBlock key={i} section={section} />
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#0B3064] rounded-2xl p-8 md:p-10 mb-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#F5C518] flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-[#0B3064]" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#8F9EB7] mb-1">
                  Finomik
                </p>
                <p className="text-white font-medium leading-relaxed text-base">
                  {content.ctaText}
                </p>
              </div>
            </div>
            <Link
              to="/more-info"
              className="inline-flex items-center gap-2 bg-[#F5C518] text-[#0B3064] font-extrabold px-6 py-3 rounded-xl text-sm hover:bg-yellow-400 transition-colors"
            >
              {lang === 'en' ? 'Talk to the team' : lang === 'ca' ? 'Parla amb l\'equip' : 'Habla con el equipo'}
            </Link>
          </div>

          {/* References */}
          <div className="border-t border-[#C8D0DD] pt-8">
            <h2 className="text-xs font-bold tracking-[0.18em] uppercase text-[#8F9EB7] mb-5">
              {lang === 'en' ? 'References' : lang === 'ca' ? 'Referències' : 'Referencias'}
            </h2>
            <ol className="space-y-3">
              {article.references.map((ref, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-xs font-bold text-[#8F9EB7] mt-0.5 shrink-0 w-5">
                    {i + 1}.
                  </span>
                  <span className="text-xs text-[#5574A7] leading-relaxed">
                    {ref.citation}
                    {ref.url && (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 ml-1.5 text-[#3C4C67] hover:text-[#0B3064] transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Enlace
                      </a>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  );
}
