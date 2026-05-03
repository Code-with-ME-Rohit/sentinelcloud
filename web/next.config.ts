import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  // Pin the standalone tracing root to the web directory so the artefact
  // always lands at .next/standalone/server.js. Without this, Next 16's
  // workspace detection can place the artefact under nested folders that
  // depend on the absolute path of the build host.
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: { serverActions: { bodySizeLimit: '2mb' } },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default nextConfig;
