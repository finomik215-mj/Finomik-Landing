import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { I18nProvider } from './i18n';
import App from './App';
import MoreInfo from './MoreInfo';
import Privacy from './Privacy';
import Terms from './Terms';

export function render(url: string): string {
  let element: React.ReactElement;

  if (url === '/more-info') {
    element = <MoreInfo />;
  } else if (url === '/privacy') {
    element = <Privacy />;
  } else if (url === '/terms') {
    element = <Terms />;
  } else {
    element = <App />;
  }

  return renderToString(
    <StaticRouter location={url}>
      <I18nProvider>
        {element}
      </I18nProvider>
    </StaticRouter>
  );
}
