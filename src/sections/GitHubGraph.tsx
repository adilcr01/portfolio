import { useState, useEffect, useMemo } from 'react';
import { useInView } from '@/hooks/useInView';
import { useTheme } from '@/hooks/useTheme';
import { GitCommitHorizontal } from 'lucide-react';

const GITHUB_USERNAME = 'adilcr01';
const API_BASE = `https://corsproxy.io/?url=https://github-contributions.vercel.app/api/v1/${GITHUB_USERNAME}`;

type Year = '2026' | '2025' | '2024';
const years: Year[] = ['2026', '2025', '2024'];

interface Contribution {
    date: string;   // "YYYY-MM-DD"
    count: number;
    intensity: string; // "0" | "1" | "2" | "3" | "4"
}

interface ApiResponse {
    years: { year: string; total: number }[];
    contributions: Contribution[];
}

// 5 intensity levels for the site's primary color (indigo)
// Light mode: white → lightest → dark primary
// Dark mode:  dark card bg → ... → bright primary
const LIGHT_LEVELS = [
    'hsl(239 84% 96%)',     // level 0 – near-white tint
    'hsl(239 84% 85%)',     // level 1
    'hsl(239 84% 73%)',     // level 2
    'hsl(239 84% 60%)',     // level 3
    'hsl(239 84% 50%)',     // level 4 – deepest
];

const DARK_LEVELS = [
    'hsl(240 6% 15%)',      // level 0 – near card bg
    'hsl(239 50% 28%)',     // level 1
    'hsl(239 65% 45%)',     // level 2
    'hsl(239 75% 60%)',     // level 3
    'hsl(239 84% 73%)',     // level 4 – primary-dark
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const CELL = 12;   // cell size px
const GAP = 3;    // gap px
const STEP = CELL + GAP;

function buildGrid(contributions: Contribution[], year: string) {
    // Filter to the selected year only
    const yearContribs = contributions.filter(c => c.date.startsWith(year));

    // Build a lookup map date → contribution
    const map: Record<string, Contribution> = {};
    yearContribs.forEach(c => { map[c.date] = c; });

    // Find the first Sunday on or before Jan 1 of that year
    const jan1 = new Date(`${year}-01-01`);
    const startDay = new Date(jan1);
    startDay.setDate(jan1.getDate() - jan1.getDay()); // go back to Sunday

    // Last day: Dec 31 of the year
    const endDay = new Date(`${year}-12-31`);

    // Build columns (each column = one week, Sunday→Saturday)
    const columns: Contribution[][] = [];
    const iter = new Date(startDay);
    while (iter <= endDay) {
        const week: Contribution[] = [];
        for (let d = 0; d < 7; d++) {
            const dateStr = iter.toISOString().split('T')[0];
            week.push(map[dateStr] ?? { date: dateStr, count: 0, intensity: '0' });
            iter.setDate(iter.getDate() + 1);
        }
        columns.push(week);
    }

    // Build month label positions
    const monthLabels: { label: string; col: number }[] = [];
    let lastMonth = -1;
    columns.forEach((week, colIdx) => {
        const sundayDate = new Date(week[0].date);
        const month = sundayDate.getMonth();
        if (month !== lastMonth) {
            // Only label if within the selected year
            if (sundayDate.getFullYear() === parseInt(year)) {
                monthLabels.push({ label: MONTHS[month], col: colIdx });
            }
            lastMonth = month;
        }
    });

    return { columns, monthLabels };
}

export function GitHubGraph() {
    const { ref: sectionRef, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
    const { isDark } = useTheme();

    const [activeYear, setActiveYear] = useState<Year>('2025'); // 2025 has the most data
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch once
    useEffect(() => {
        setLoading(true);
        fetch(API_BASE)
            .then(r => r.json())
            .then((json: ApiResponse) => {
                setData(json);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load contribution data.');
                setLoading(false);
            });
    }, []);

    // Build grid for active year
    const { columns, monthLabels } = useMemo(() => {
        if (!data) return { columns: [], monthLabels: [] };
        return buildGrid(data.contributions, activeYear);
    }, [data, activeYear]);

    const levels = isDark ? DARK_LEVELS : LIGHT_LEVELS;

    // Total for selected year
    const yearTotal = data?.years.find(y => y.year === activeYear)?.total ?? 0;

    // SVG dimensions
    const svgWidth = columns.length * STEP + 4;
    const svgHeight = 7 * STEP + 20; // 7 rows + month label row above

    return (
        <section
            id="github-activity"
            ref={sectionRef}
            className="relative py-16 lg:py-20 overflow-hidden bg-muted/30 dark:bg-muted/10"
        >
            {/* Background Lines */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>

            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-1/4 h-1/3 bg-gradient-to-tl from-secondary/5 to-transparent rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span
                        className={`inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                    >
                        Open Source
                    </span>
                    <h2
                        className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                        style={{ transitionDelay: '100ms' }}
                    >
                        GitHub{' '}
                        <span className="gradient-text">Activity</span>
                    </h2>
                    <p
                        className={`text-muted-foreground max-w-2xl mx-auto transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                            }`}
                        style={{ transitionDelay: '200ms' }}
                    >
                        A snapshot of my contribution history — consistency, curiosity, and code.
                    </p>
                </div>

                {/* Graph Card */}
                <div
                    className={`group relative rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-700 p-6 sm:p-8 shadow-sm hover:shadow-xl ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    style={{ transitionDelay: '300ms' }}
                >
                    <div className="absolute inset-0 rounded-2xl gradient-bg opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative flex flex-col gap-5">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <GitCommitHorizontal className="h-4 w-4 text-primary" />
                                <span>
                                    {loading
                                        ? 'Loading…'
                                        : yearTotal > 0
                                            ? `${yearTotal.toLocaleString()} contributions in ${activeYear}`
                                            : `Contributions in ${activeYear}`}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                {years.map(year => (
                                    <button
                                        key={year}
                                        onClick={() => setActiveYear(year)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${activeYear === year
                                            ? 'gradient-bg text-white shadow-md'
                                            : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                                            }`}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chart area */}
                        {error ? (
                            <p className="text-sm text-destructive py-8 text-center">{error}</p>
                        ) : loading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            </div>
                        ) : (
                            <div className="w-full overflow-x-auto rounded-xl">
                                <svg
                                    width={svgWidth}
                                    height={svgHeight}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mx-auto"
                                    style={{ display: 'block', minWidth: `${svgWidth}px` }}
                                >
                                    {/* Month labels */}
                                    {monthLabels.map(({ label, col }) => (
                                        <text
                                            key={`${label}-${col}`}
                                            x={col * STEP + 2}
                                            y={11}
                                            fontSize={10}
                                            fill="currentColor"
                                            className="text-muted-foreground"
                                            style={{ fill: isDark ? 'hsl(240 5% 65%)' : 'hsl(240 4% 46%)', fontSize: 10 }}
                                        >
                                            {label}
                                        </text>
                                    ))}

                                    {/* Contribution cells */}
                                    {columns.map((week, colIdx) =>
                                        week.map((day, rowIdx) => {
                                            const level = Math.min(parseInt(day.intensity || '0'), 4);
                                            const fill = levels[level];
                                            const isInYear = day.date.startsWith(activeYear);
                                            return (
                                                <rect
                                                    key={day.date}
                                                    x={colIdx * STEP + 2}
                                                    y={rowIdx * STEP + 16}
                                                    width={CELL}
                                                    height={CELL}
                                                    rx={2}
                                                    ry={2}
                                                    fill={isInYear ? fill : levels[0]}
                                                    opacity={isInYear ? 1 : 0.3}
                                                    style={{ transition: 'fill 0.3s ease' }}
                                                >
                                                    <title>{`${day.date}: ${day.count} contributions`}</title>
                                                </rect>
                                            );
                                        })
                                    )}
                                </svg>
                            </div>
                        )}

                        {/* Legend row */}
                        {!loading && !error && (
                            <div className="flex items-center justify-between flex-wrap gap-3">
                                <a
                                    href={`https://github.com/${GITHUB_USERNAME}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200 underline underline-offset-4"
                                >
                                    View on GitHub →
                                </a>
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <span>Less</span>
                                    {levels.map((c, i) => (
                                        <div
                                            key={i}
                                            style={{ width: CELL, height: CELL, background: c, borderRadius: 2 }}
                                        />
                                    ))}
                                    <span>More</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
