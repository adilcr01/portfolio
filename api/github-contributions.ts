import type { VercelRequest, VercelResponse } from '@vercel/node';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = 'adilcr01';

const QUERY = `
  query($userName: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $userName) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Allow CORS so the frontend can call this
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const year = (req.query.year as string) || new Date().getFullYear().toString();

    if (!GITHUB_TOKEN) {
        return res.status(500).json({ error: 'GitHub token not configured' });
    }

    const variables = {
        userName: GITHUB_USERNAME,
        from: `${year}-01-01T00:00:00Z`,
        to: `${year}-12-31T23:59:59Z`,
    };

    try {
        const ghRes = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: QUERY, variables }),
        });

        if (!ghRes.ok) {
            return res.status(ghRes.status).json({ error: 'GitHub API error' });
        }

        const json = await ghRes.json();

        const calendar =
            json?.data?.user?.contributionsCollection?.contributionCalendar;

        if (!calendar) {
            return res.status(500).json({ error: 'Unexpected GitHub API response' });
        }

        // Flatten weeks → days and compute intensity (0–4 scale)
        const allDays = calendar.weeks.flatMap(
            (week: { contributionDays: { contributionCount: number; date: string }[] }) =>
                week.contributionDays
        );

        const maxCount = Math.max(...allDays.map((d: { contributionCount: number }) => d.contributionCount), 1);

        const contributions = allDays.map((d: { contributionCount: number; date: string }) => ({
            date: d.date,
            count: d.contributionCount,
            intensity: d.contributionCount === 0
                ? '0'
                : String(Math.min(4, Math.ceil((d.contributionCount / maxCount) * 4))),
        }));

        return res.status(200).json({
            year,
            total: calendar.totalContributions,
            contributions,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to fetch from GitHub' });
    }
}
