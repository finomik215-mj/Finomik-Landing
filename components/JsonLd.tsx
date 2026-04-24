import { useEffect, useId } from 'react';

interface JsonLdProps {
  data: object;
}

export function JsonLd({ data }: JsonLdProps) {
  const id = useId().replace(/:/g, '-');
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    script.id = `json-ld-${id}`;
    document.head.appendChild(script);
    return () => {
      const existing = document.getElementById(script.id);
      if (existing) existing.remove();
    };
  }, [data, id]);

  return null;
}
