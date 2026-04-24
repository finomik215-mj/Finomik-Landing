import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import MoreInfo from './MoreInfo';
import NotFound from './NotFound';
import Privacy from './Privacy';
import Terms from './Terms';
import SolutionsSchools from './pages/SolutionsSchools';
import SolutionsUniversities from './pages/SolutionsUniversities';
import SolutionsPlatform from './pages/SolutionsPlatform';
import SolutionsTechnology from './pages/SolutionsTechnology';
import ArticlePage from './ArticlePage';
import Contact from './Contact';
import ErrorBoundary from './ErrorBoundary';
import { I18nProvider } from './i18n';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <I18nProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/more-info" element={<MoreInfo />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/solutions/schools" element={<SolutionsSchools />} />
            <Route path="/solutions/universities" element={<SolutionsUniversities />} />
            <Route path="/solutions/platform" element={<SolutionsPlatform />} />
            <Route path="/solutions/technology" element={<SolutionsTechnology />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/articulo/:slug" element={<ArticlePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </I18nProvider>
  </React.StrictMode>
);