import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

interface LangString {
  es: string;
  en: string;
  ca: string;
}

interface PageFooterProps {
  topTitle?: LangString;
  ctaLabel?: LangString;
  contactEmail?: 'hello' | 'schools' | 'banks';
}

const WaveFooter = () => (
  <svg
    viewBox="0 0 1440 80"
    preserveAspectRatio="none"
    className="absolute bottom-0 left-0 w-full h-[55%] text-[#0B3064] z-0"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
    />
  </svg>
);

const EMAIL_CONFIG = {
  hello: {
    address: 'hello@finomik.com',
    subject: {
      es: 'Me ha interesado Finomik, quiero saber más',
      en: "I'm interested in Finomik — I'd like to know more",
      ca: "M'ha interessat Finomik, vull saber-ne més",
    },
    body: {
      es: `Hola equipo de Finomik,

He visto vuestra plataforma y me ha parecido muy interesante. Me gustaría saber más sobre cómo funciona y explorar si encaja con lo que estoy buscando.

¿Cuándo podríamos conectar para que me contéis más?

Gracias,
[Tu nombre]`,
      en: `Hi Finomik team,

I came across your platform and found it really interesting. I'd like to learn more about how it works and explore whether it could be a good fit for what I'm looking for.

When could we connect so you can tell me more?

Thanks,
[Your name]`,
      ca: `Hola equip de Finomik,

He vist la vostra plataforma i m'ha semblat molt interessant. M'agradaria saber més sobre com funciona i explorar si encaixa amb el que estic buscant.

Quan podríem connectar perquè m'ho expliquéssiu?

Gràcies,
[El teu nom]`,
    },
  },
  schools: {
    address: 'schools@finomik.com',
    subject: {
      es: 'Me ha interesado Finomik para nuestro colegio, quiero saber más',
      en: "I'm interested in Finomik for our school — I'd like to know more",
      ca: "M'ha interessat Finomik per al nostre centre, vull saber-ne més",
    },
    body: {
      es: `Hola equipo de Finomik,

He visto vuestra plataforma y me ha parecido muy interesante para nuestro centro educativo. Me gustaría saber más sobre el programa para colegios y explorar si encaja con lo que buscamos.

¿Cuándo podríamos conectar para que me contéis más?

Gracias,
[Tu nombre]`,
      en: `Hi Finomik team,

I came across your platform and found it really interesting for our school. I'd like to learn more about the programme for schools and explore whether it could be a good fit for us.

When could we connect so you can tell me more?

Thanks,
[Your name]`,
      ca: `Hola equip de Finomik,

He vist la vostra plataforma i m'ha semblat molt interessant per al nostre centre educatiu. M'agradaria saber més sobre el programa per a col·legis i explorar si encaixa amb el que busquem.

Quan podríem connectar perquè m'ho expliquéssiu?

Gràcies,
[El teu nom]`,
    },
  },
  banks: {
    address: 'banks@finomik.com',
    subject: {
      es: 'Me ha interesado Finomik para nuestro banco, quiero saber más',
      en: "I'm interested in Finomik for our bank — I'd like to know more",
      ca: "M'ha interessat Finomik per al nostre banc, vull saber-ne més",
    },
    body: {
      es: `Hola equipo de Finomik,

He visto vuestra plataforma y me ha parecido muy interesante para nuestra entidad. Me gustaría saber más sobre cómo funciona la integración para bancos y explorar si encaja con lo que buscamos.

¿Cuándo podríamos conectar para que me contéis más?

Gracias,
[Tu nombre]`,
      en: `Hi Finomik team,

I came across your platform and found it really interesting for our institution. I'd like to learn more about how the integration works for banks and explore whether it could be a good fit for us.

When could we connect so you can tell me more?

Thanks,
[Your name]`,
      ca: `Hola equip de Finomik,

He vist la vostra plataforma i m'ha semblat molt interessant per a la nostra entitat. M'agradaria saber més sobre com funciona la integració per a bancs i explorar si encaixa amb el que busquem.

Quan podríem connectar perquè m'ho expliquéssiu?

Gràcies,
[El teu nom]`,
    },
  },
};

export function buildMailto(variant: 'hello' | 'schools' | 'banks', lang: string): string {
  const l = lang === 'ca' ? 'ca' : lang === 'en' ? 'en' : 'es';
  const cfg = EMAIL_CONFIG[variant];
  return `mailto:${cfg.address}?subject=${encodeURIComponent(cfg.subject[l])}&body=${encodeURIComponent(cfg.body[l])}`;
}

export const PageFooter: React.FC<PageFooterProps> = ({
  topTitle,
  ctaLabel,
  contactEmail = 'hello',
}) => {
  const { lang } = useI18n();
  const l = lang === 'ca' ? 'ca' : lang === 'en' ? 'en' : 'es';

  const defaultTitle: LangString = {
    es: 'Hacer de la educación financiera la norma, no la excepción.',
    en: 'Making financial education the standard, not an exception.',
    ca: "Fer de l'educació financera la norma, no l'excepció.",
  };

  const defaultCta: LangString = {
    es: 'Solicitar información',
    en: 'Request information',
    ca: 'Sol·licitar informació',
  };

  const title = topTitle ?? defaultTitle;
  const cta = ctaLabel ?? defaultCta;
  const mailtoHref = buildMailto(contactEmail, lang);
  const emailAddress = EMAIL_CONFIG[contactEmail].address;

  return (
    <footer className="overflow-hidden">
      {/* Top zone — wave + tagline + CTA */}
      <div className="bg-[#114076] relative pt-14 pb-36 text-center overflow-hidden">
        <WaveFooter />
        <div className="relative z-10 px-6">
          <p className="text-xl md:text-2xl font-black text-white leading-snug max-w-xl mx-auto mb-6">
            {title[l]}
          </p>
          <Link
            to="/more-info"
            className="inline-flex items-center gap-2 bg-[#F5C518] text-[#0B3064] font-extrabold px-7 py-3.5 rounded-xl text-sm hover:bg-yellow-400 transition-colors"
          >
            {cta[l]}
          </Link>
        </div>
      </div>

      {/* Bottom zone — contact + legal */}
      <div className="bg-[#0B3064] pt-6 pb-8">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-5 text-xs text-white/50">
            <a href={mailtoHref} className="hover:text-white transition-colors">
              {emailAddress}
            </a>
            <a href="tel:+34673319335" className="hover:text-white transition-colors">
              +34 673 319 335
            </a>
            <a
              href="https://www.linkedin.com/company/finomik"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40 border-t border-white/10 pt-5">
            <span>© {new Date().getFullYear()} Finomik. Financial Education.</span>
            <nav className="flex gap-5">
              <Link to="/contact" className="hover:text-white transition-colors">
                {l === 'ca' ? 'Contacte' : l === 'es' ? 'Contacto' : 'Contact'}
              </Link>
              <Link to="/privacy" className="hover:text-white transition-colors">
                {l === 'ca' ? 'Privadesa' : l === 'es' ? 'Privacidad' : 'Privacy'}
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                {l === 'ca' ? 'Termes' : l === 'es' ? 'Términos' : 'Terms'}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
