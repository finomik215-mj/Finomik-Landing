import { useEffect } from 'react';
import { SITE_URL } from '../config';

export interface SeoHeadProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  /** Pass the current lang so meta and hreflang update when user switches language */
  lang?: 'en' | 'es' | 'ca';
}

export function SeoHead({
  title,
  description,
  path = '',
  image,
  noindex,
  lang = 'en',
}: SeoHeadProps) {
  const canonical = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const imageUrl = image?.startsWith('http')
    ? image
    : image
    ? `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`
    : `${SITE_URL}/logo-finomik-on-blue.png`;

  useEffect(() => {
    // Fix: use the title prop, not a hardcoded string
    document.title = title;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', canonical, true);
    setMeta('og:image', imageUrl, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', imageUrl);

    // Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.rel = 'canonical';
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = canonical;

    // Hreflang: all 3 languages on same URL (single-URL multilingual SPA)
    // Remove existing hreflang links first to avoid duplicates on re-render
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());

    const hreflangs: Array<{ hreflang: string; href: string }> = [
      { hreflang: 'es', href: canonical },
      { hreflang: 'en', href: canonical },
      { hreflang: 'ca', href: canonical },
      { hreflang: 'x-default', href: canonical },
    ];
    hreflangs.forEach(({ hreflang, href }) => {
      const el = document.createElement('link');
      el.rel = 'alternate';
      el.setAttribute('hreflang', hreflang);
      el.href = href;
      document.head.appendChild(el);
    });

    if (noindex) {
      setMeta('robots', 'noindex, nofollow');
    }
  }, [title, description, canonical, imageUrl, noindex, lang]);

  return null;
}
