import path from "path"
import fs from "fs"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import type { Plugin } from 'vite'

// Read GITHUB_TOKEN from .env for local dev (Vite doesn't auto-populate process.env from .env)
function readEnvToken(): string {
  try {
    const envFile = fs.readFileSync(path.resolve(__dirname, '.env'), 'utf-8');
    const match = envFile.match(/^GITHUB_TOKEN=(.+)$/m);
    return match ? match[1].trim() : (process.env.GITHUB_TOKEN ?? '');
  } catch {
    return process.env.GITHUB_TOKEN ?? '';
  }
}

// ── Dev-only plugin: handles /api/github-contributions inside Vite ──────────
function githubApiPlugin(): Plugin {
  const token = readEnvToken();
  return {
    name: 'github-api-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/github-contributions', async (req, res) => {
        const url = new URL(req.url ?? '', 'http://localhost');
        const year = url.searchParams.get('year') ?? new Date().getFullYear().toString();

        const QUERY = `
          query($userName: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $userName) {
              contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays { contributionCount date }
                  }
                }
              }
            }
          }
        `;

        try {
          const ghRes = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: QUERY,
              variables: {
                userName: 'adilcr01',
                from: `${year}-01-01T00:00:00Z`,
                to: `${year}-12-31T23:59:59Z`,
              },
            }),
          });

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const json = await ghRes.json() as any;
          const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;

          if (!calendar) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Unexpected GitHub API response' }));
            return;
          }

          const allDays = calendar.weeks.flatMap(
            (w: { contributionDays: { contributionCount: number; date: string }[] }) =>
              w.contributionDays
          );
          const maxCount = Math.max(
            ...allDays.map((d: { contributionCount: number }) => d.contributionCount),
            1
          );
          const contributions = allDays.map((d: { contributionCount: number; date: string }) => ({
            date: d.date,
            count: d.contributionCount,
            intensity:
              d.contributionCount === 0
                ? '0'
                : String(Math.min(4, Math.ceil((d.contributionCount / maxCount) * 4))),
          }));

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ year, total: calendar.totalContributions, contributions }));
        } catch {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to fetch from GitHub' }));
        }
      });
    },
  };
}
// ────────────────────────────────────────────────────────────────────────────

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [inspectAttr(), react(), githubApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
