// Legacy catch-all route - use individual API endpoints instead
export default async function (req: any, res: any) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({
    ok: false,
    message: "Not found. Use individual API endpoints: /api/health, /api/auth/signup, /api/debug/test-email",
    path: req.url
  }));
}
