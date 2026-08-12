import { NextResponse } from 'next/server';

// Uses a public contributions API so no GitHub token is required.
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'Srivatsa03';

const LEVELS = [
  'NONE',
  'FIRST_QUARTILE',
  'SECOND_QUARTILE',
  'THIRD_QUARTILE',
  'FOURTH_QUARTILE',
] as const;

interface JogruberDay {
  date: string;
  count: number;
  level: number;
}
interface JogruberResponse {
  total: Record<string, number>;
  contributions: JogruberDay[];
}

export async function GET() {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      {
        signal: AbortSignal.timeout(6000),
        next: { revalidate: 600 }, // cache 10 minutes
      }
    );

    if (!res.ok) {
      throw new Error(`Contributions API error: ${res.statusText}`);
    }

    const data: JogruberResponse = await res.json();

    // Keep days up to today, then take the last 49 (7 weeks).
    const today = new Date().toISOString().slice(0, 10);
    const recent = data.contributions
      .filter((d) => d.date <= today)
      .slice(-49);

    const contributions = recent.map((d) => ({
      date: d.date,
      count: d.count,
      level: LEVELS[Math.max(0, Math.min(4, d.level))],
    }));

    const totalContributions = contributions.reduce((s, d) => s + d.count, 0);

    return NextResponse.json({ contributions, totalContributions, period: '7 weeks' });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch GitHub contributions' },
      { status: 500 }
    );
  }
}
