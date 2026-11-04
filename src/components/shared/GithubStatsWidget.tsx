import React, { useRef, useEffect, useState, useMemo } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import {
  GitCommitHorizontal,
  Github,
  ExternalLink,
  BookMarked,
  Star,
  GitFork,
  Users,
  Code2,
} from 'lucide-react';
import { useAccent } from '@/contexts/AccentContext';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { TerminalWindow, TerminalBadge, TerminalButton } from '@/components/shared/terminal';

interface GithubUser {
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
  login: string;
}

interface GithubRepo {
  name: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

interface CalculatedStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  topLanguages: { name: string; percentage: number }[];
  latestRepo: { name: string; url: string; updatedAt: string } | null;
  memberSince: string;
}

export const GithubStatsWidget: React.FC = () => {
  const { currentAccent } = useAccent();
  const { darkMode } = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [stats, setStats] = useState<CalculatedStats>({
    publicRepos: 18,
    followers: 12,
    following: 15,
    totalStars: 5,
    totalForks: 3,
    topLanguages: [
      { name: 'TypeScript', percentage: 48 },
      { name: 'React / TSX', percentage: 32 },
      { name: 'Java', percentage: 12 },
      { name: 'Python', percentage: 8 },
    ],
    latestRepo: null,
    memberSince: '2022',
  });

  const [isLoading, setIsLoading] = useState(true);

  // Fetch GitHub API data
  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      try {
        const [userRes, reposRes] = await Promise.allSettled([
          fetch('https://api.github.com/users/elli1216'),
          fetch('https://api.github.com/users/elli1216/repos?sort=updated&per_page=100'),
        ]);

        let userData: GithubUser | null = null;
        let reposData: GithubRepo[] = [];

        if (userRes.status === 'fulfilled' && userRes.value.ok) {
          userData = await userRes.value.json();
        }

        if (reposRes.status === 'fulfilled' && reposRes.value.ok) {
          reposData = await reposRes.value.json();
        }

        if (!isMounted) return;

        if (userData || reposData.length > 0) {
          const totalStars = reposData.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
          const totalForks = reposData.reduce((acc, r) => acc + (r.forks_count || 0), 0);

          // Calculate language distribution
          const langCount: Record<string, number> = {};
          reposData.forEach((r) => {
            if (r.language) {
              langCount[r.language] = (langCount[r.language] || 0) + 1;
            }
          });

          const totalLangs = Object.values(langCount).reduce((a, b) => a + b, 0);
          const topLanguages = Object.entries(langCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4)
            .map(([name, count]) => ({
              name,
              percentage: totalLangs > 0 ? Math.round((count / totalLangs) * 100) : 0,
            }));

          const primaryLatestRepo =
            reposData.length > 0
              ? {
                  name: reposData[0].name,
                  url: reposData[0].html_url,
                  updatedAt: new Date(reposData[0].updated_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  }),
                }
              : null;

          const memberYear = userData?.created_at
            ? new Date(userData.created_at).getFullYear().toString()
            : '2022';

          setStats({
            publicRepos: userData?.public_repos ?? reposData.length,
            followers: userData?.followers ?? 12,
            following: userData?.following ?? 15,
            totalStars,
            totalForks,
            topLanguages: topLanguages.length > 0 ? topLanguages : stats.topLanguages,
            latestRepo: primaryLatestRepo,
            memberSince: memberYear,
          });
        }
      } catch (err) {
        console.error('Failed to fetch GitHub statistics:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamic theme colors that scale from inactive to full accent
  const calendarTheme = useMemo(
    () => ({
      light: [
        '#ebedf0',
        `${currentAccent}35`,
        `${currentAccent}70`,
        `${currentAccent}aa`,
        currentAccent,
      ],
      dark: [
        '#161b22',
        `${currentAccent}35`,
        `${currentAccent}70`,
        `${currentAccent}aa`,
        currentAccent,
      ],
    }),
    [currentAccent]
  );

  // Auto-scroll calendar to right on mobile
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full font-mono">
      {/* 2-Column Telemetry & Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Left Card: Git Telemetry Metrics */}
        <TerminalWindow
          title="git://profile-metrics.json"
          command="gh api user --jq '{repos, stars, forks}'"
          className="h-fit flex flex-col shadow-lg"
          bodyClassName="p-5 flex flex-col flex-1 justify-between gap-5"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <div className="flex items-center gap-2">
              <div
                className="size-8 rounded-lg flex items-center justify-center border border-primary/20"
                style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}
              >
                <Github size={16} />
              </div>
              <div>
                <span className="font-bold text-xs sm:text-sm text-foreground">elli1216</span>
                <span className="text-[10px] text-muted-foreground block">github.com/elli1216</span>
              </div>
            </div>

            <TerminalBadge variant="success" label="SYNCED" pulse />
          </div>

          {/* 4-Cell Metric Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* Public Repos */}
            <div className="p-3 rounded-lg bg-muted/25 border border-border/40 flex flex-col justify-between">
              <div className="flex items-center justify-between text-muted-foreground mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider">REPOSITORIES</span>
                <BookMarked size={14} className="text-primary" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-foreground leading-none">
                {isLoading ? '...' : stats.publicRepos}
              </p>
            </div>

            {/* Stars */}
            <div className="p-3 rounded-lg bg-muted/25 border border-border/40 flex flex-col justify-between">
              <div className="flex items-center justify-between text-muted-foreground mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider">TOTAL STARS</span>
                <Star size={14} className="text-amber-400" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-foreground leading-none">
                {isLoading ? '...' : stats.totalStars}
              </p>
            </div>

            {/* Forks */}
            <div className="p-3 rounded-lg bg-muted/25 border border-border/40 flex flex-col justify-between">
              <div className="flex items-center justify-between text-muted-foreground mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider">TOTAL FORKS</span>
                <GitFork size={14} className="text-primary" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-foreground leading-none">
                {isLoading ? '...' : stats.totalForks}
              </p>
            </div>

            {/* Community / Followers */}
            <div className="p-3 rounded-lg bg-muted/25 border border-border/40 flex flex-col justify-between">
              <div className="flex items-center justify-between text-muted-foreground mb-1">
                <span className="text-[10px] uppercase font-bold tracking-wider">FOLLOWERS</span>
                <Users size={14} className="text-emerald-500" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-foreground leading-none">
                {isLoading ? '...' : stats.followers}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-border/40 flex items-center justify-between gap-2">
            <span className="text-[11px] text-muted-foreground">
              MEMBER_SINCE:{' '}
              <span className="text-foreground font-semibold">{stats.memberSince}</span>
            </span>

            <TerminalButton
              command="./view-repos.sh"
              href="https://github.com/elli1216?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              variant="outline"
              icon={ExternalLink}
            />
          </div>
        </TerminalWindow>

        {/* Right Card: Language Stack & Latest Commit Stream */}
        <TerminalWindow
          title="git://ecosystem-breakdown.conf"
          command="git log --summary --languages"
          className="h-fit flex flex-col shadow-lg"
          bodyClassName="p-5 flex flex-col flex-1 justify-between gap-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <div className="flex items-center gap-2">
              <div
                className="size-8 rounded-lg flex items-center justify-center border border-primary/20"
                style={{ backgroundColor: `${currentAccent}1a`, color: currentAccent }}
              >
                <Code2 size={16} />
              </div>
              <div>
                <span className="font-bold text-xs sm:text-sm text-foreground">
                  LANGUAGE_MANIFEST
                </span>
                <span className="text-[10px] text-muted-foreground block">
                  Calculated from public codebases
                </span>
              </div>
            </div>

            <TerminalBadge variant="accent" label="TYPESCRIPT_CORE" />
          </div>

          {/* Language Distribution Progress Bars */}
          <div className="space-y-3">
            {stats.topLanguages.map((lang) => (
              <div key={lang.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-foreground">{lang.name}</span>
                  <span className="text-primary">{lang.percentage}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: currentAccent }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Latest Repository / Stream status */}
          <div className="p-3 rounded-lg bg-muted/25 border border-border/40 flex items-center justify-between gap-2 text-xs">
            <div className="min-w-0">
              <span className="text-[10px] text-muted-foreground font-bold block">
                RECENT_ACTIVE_REPO
              </span>
              <span className="text-foreground font-bold truncate block">
                {stats.latestRepo ? stats.latestRepo.name : 'portfolio'}
              </span>
            </div>

            {stats.latestRepo && (
              <span className="text-[10px] text-primary font-semibold shrink-0 bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                UPDATED {stats.latestRepo.updatedAt}
              </span>
            )}
          </div>
        </TerminalWindow>
      </div>

      {/* Interactive Contribution Heatmap Window */}
      <TerminalWindow
        title="git://contribution-graph.log"
        command='git log --graph --oneline --since="1 year ago"'
        className="w-full shadow-xl"
        bodyClassName="p-4 sm:p-6"
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <GitCommitHorizontal size={16} className="text-primary" />
            <h4 className="text-xs text-foreground uppercase tracking-widest font-bold">
              365-DAY COMMIT TELEMETRY
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <TerminalBadge variant="neutral" label="BRANCH: main" />
            <TerminalBadge variant="success" label="PIPELINE: ACTIVE" pulse />
          </div>
        </div>

        <div className="relative w-full">
          {/* Scroll fade gradients for mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-linear-to-r from-card/90 to-transparent z-10 pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-linear-to-l from-card/90 to-transparent z-10 pointer-events-none md:hidden" />

          <div
            ref={scrollRef}
            className="w-full overflow-x-auto scrollbar-none flex justify-start md:justify-center pb-1 text-xs text-muted-foreground [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="min-w-175 md:min-w-0 md:w-full flex justify-center py-2">
              <GitHubCalendar
                username="elli1216"
                colorScheme={darkMode ? 'dark' : 'light'}
                theme={calendarTheme}
                blockSize={13}
                blockMargin={4}
                fontSize={12}
              />
            </div>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
};

export default GithubStatsWidget;
