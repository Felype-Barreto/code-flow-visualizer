import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // Search several likely places for the built client assets. In some
  // deployment environments the build output may be placed in different
  // locations (repo root `dist/public`, a local `public` folder, or the
  // Vercel prebuilt output directory). If nothing is present we avoid
  // throwing so API routes remain available — the frontend will return
  // a helpful error instead of causing server errors.
  const candidates = [
    path.resolve(__dirname, "..", "dist", "public"), // compiled server layout
    path.resolve(__dirname, "public"), // during local dev
    path.resolve(process.cwd(), "dist", "public"), // runner/workspace
    path.resolve(process.cwd(), ".vercel", "output", "static"), // vercel build output
    path.resolve(__dirname, "..", ".vercel", "output", "static"),
  ];

  let distPath: string | null = null;
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      distPath = p;
      break;
    }
  }

  if (!distPath) {
    // Do not crash the entire server when static assets are missing. Log
    // a clear message and register a small fallback route so clients get a
    // helpful response instead of a 500.
    console.error(
      "Could not find the build directory. Looked in:",
      candidates.join(", "),
    );

    app.get("/", (_req, res) => {
      res
        .status(200)
        .send(
          "Frontend build not found. The server is running but the client assets are missing. Please ensure the project is built (npm run build) and the output is included in the deployment.",
        );
    });

    // Also expose a health endpoint for debugging
    app.get("/build-missing", (_req, res) => {
      res.json({ ok: false, message: "build directory not found", candidates });
    });
    return;
  }

  app.use(
    express.static(distPath, {
      etag: true,
      maxAge: "7d",
      immutable: true,
      setHeaders: (res, filePath) => {
        // Do not cache HTML to avoid stale shell; cache assets aggressively
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-cache");
          if (process.env.NODE_ENV === "production") {
            res.setHeader(
              "Content-Security-Policy",
              [
                "default-src 'self'",
                "script-src 'self'",
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                "img-src 'self' data:",
                "font-src 'self' https://fonts.gstatic.com",
                "connect-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
                "object-src 'none'",
                "base-uri 'self'",
                "frame-ancestors 'none'",
              ].join("; "),
            );
          }
        }
      },
    }),
  );

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
