import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');
const ssrDir = path.join(__dirname, 'dist-ssr');

const routes = ['/', '/more-info', '/privacy', '/terms'];

async function main() {
  console.log('Building SSR bundle...');
  await build({
    logLevel: 'warn',
    build: {
      ssr: './entry-server.tsx',
      outDir: 'dist-ssr',
      rollupOptions: {
        output: { format: 'esm' },
      },
    },
  });

  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
  const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

  for (const route of routes) {
    try {
      const html = render(route);
      const output = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

      const routeDir = route === '/' ? distDir : path.join(distDir, route);
      fs.mkdirSync(routeDir, { recursive: true });
      fs.writeFileSync(path.join(routeDir, 'index.html'), output);
      console.log(`✓ Prerendered: ${route}`);
    } catch (err) {
      console.error(`✗ Failed to prerender ${route}:`, err.message);
    }
  }

  fs.rmSync(ssrDir, { recursive: true, force: true });
  console.log('Prerendering complete!');
}

main().catch(console.error);
