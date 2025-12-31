import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const path = require('path');
const express = require('express');
const { createServer } = require('http');

let appPromise = null;
async function getApp() {
  if (appPromise) return appPromise;
  appPromise = (async () => {
    const app = express();
    const httpServer = createServer(app);

    app.disable('x-powered-by');

    try {
      // Load the compiled server bundle (CommonJS)
      const compiled = require(path.resolve(process.cwd(), 'dist', 'index.cjs'));
      const registerRoutes = compiled && (compiled.registerRoutes || (compiled.default && compiled.default.registerRoutes));
      if (typeof registerRoutes === 'function') {
        await registerRoutes(httpServer, app);
        return app;
      }
      throw new Error('registerRoutes not found in compiled bundle');
    } catch (err) {
      console.error('[api/index.js] failed to load compiled server bundle:', err && (err.message || err));
      app.get('/api/health', (req, res) => res.json({ ok: false, error: 'server bundle missing' }));
      return app;
    }
  })();
  return appPromise;
}

export default async function handler(req, res) {
  const app = await getApp();
  try {
    if (typeof req.url === 'string' && !req.url.startsWith('/api')) {
      req.url = '/api' + (req.url.startsWith('/') ? req.url : '/' + req.url);
    }
  } catch (e) {}
  return app(req, res);
}
