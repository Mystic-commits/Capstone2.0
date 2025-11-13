RentEase Frontend (Production Notes)
====================================

Quick commands
--------------

```bash
npm install
npm run build
npm run preview
```

Environment
-----------

- Create a `.env` at project root with:
  - `VITE_API_BASE=` (optional; leave empty to use built-in mocks)

Routing and errors
------------------

- Lazy-loaded routes with suspense fallback
- `src/routes/_ErrorBoundary.jsx` for route-level errors
- `src/routes/NotFound.jsx` catch-all 404

Deployment
----------

- Netlify: `public/_redirects` provides SPA fallback
- Vercel: framework auto-detects Vite; SPA fallback handled automatically


