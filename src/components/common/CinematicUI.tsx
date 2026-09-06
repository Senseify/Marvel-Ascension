import React from 'react';

/**
 * Circular Progress Ring matching the "MISSION PROGRESS 72%" element in the reference image.
 */
interface CircularProgressRingProps {
  progress: number; // 0 to 100
  size?: number; // width/height in px
  strokeWidth?: number;
  color?: 'violet' | 'gold' | 'cyan' | 'emerald' | 'crimson';
  label?: string;
  sublabel?: string;
  showPercent?: boolean;
}

export function CircularProgressRing({
  progress,
  size = 90,
  strokeWidth = 7,
  color = 'violet',
  label,
  sublabel,
  showPercent = true,
}: CircularProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;

  const gradientId = `ring-gradient-${color}-${Math.floor(Math.random() * 10000)}`;

  const getGradientColors = () => {
    switch (color) {
      case 'gold':
        return { start: '#F59E0B', stop: '#FDE68A', glow: 'rgba(245, 158, 11, 0.4)' };
      case 'cyan':
        return { start: '#06B6D4', stop: '#38BDF8', glow: 'rgba(6, 182, 212, 0.4)' };
      case 'emerald':
        return { start: '#10B981', stop: '#34D399', glow: 'rgba(16, 185, 129, 0.4)' };
      case 'crimson':
        return { start: '#E62429', stop: '#F87171', glow: 'rgba(230, 36, 41, 0.4)' };
      case 'violet':
      default:
        return { start: '#8B5CF6', stop: '#C084FC', glow: 'rgba(139, 92, 246, 0.4)' };
    }
  };

  const colors = getGradientColors();

  return (
    <div className="relative inline-flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
          style={{ filter: `drop-shadow(0 0 8px ${colors.glow})` }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.start} />
              <stop offset="100%" stopColor={colors.stop} />
            </linearGradient>
          </defs>

          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
          />

          {/* Active Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Percentage */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {showPercent && (
            <span className="font-heading font-black text-white text-base sm:text-lg leading-none">
              {Math.round(clampedProgress)}%
            </span>
          )}
          {sublabel && (
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mt-0.5">
              {sublabel}
            </span>
          )}
        </div>
      </div>

      {label && (
        <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-300">
          {label}
        </span>
      )}
    </div>
  );
}

/**
 * Standardized High-End Panel Container
 */
interface CinematicPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  kicker?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function CinematicPanel({
  title,
  kicker,
  action,
  children,
  className = '',
  ...rest
}: CinematicPanelProps) {
  return (
    <div
      className={`bg-[#12141C] border border-white/[0.08] shadow-[0_14px_40px_-8px_rgba(0,0,0,0.75)] rounded-2xl p-4 sm:p-5 relative overflow-hidden ${className}`}
      {...rest}
    >
      {(title || kicker || action) && (
        <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/[0.06]">
          <div>
            {kicker && (
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 block">
                {kicker}
              </span>
            )}
            {title && (
              <h3 className="font-heading font-black text-sm sm:text-base text-white tracking-wide uppercase">
                {title}
              </h3>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

/**
 * Modern High-Contrast Progress Bar
 */
interface CinematicProgressBarProps {
  progress: number; // 0 to 100
  color?: 'violet' | 'gold' | 'cyan' | 'emerald' | 'crimson';
  height?: number; // in px
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export function CinematicProgressBar({
  progress,
  color = 'violet',
  height = 4,
  showLabel = false,
  label,
  className = '',
}: CinematicProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const getGradient = () => {
    switch (color) {
      case 'gold':
        return 'from-amber-500 via-amber-400 to-yellow-300 shadow-[0_0_12px_rgba(245,158,11,0.6)]';
      case 'cyan':
        return 'from-cyan-500 to-sky-400 shadow-[0_0_12px_rgba(6,182,212,0.6)]';
      case 'emerald':
        return 'from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.6)]';
      case 'crimson':
        return 'from-red-600 to-rose-400 shadow-[0_0_12px_rgba(230,36,41,0.6)]';
      case 'violet':
      default:
        return 'from-violet-600 via-purple-500 to-indigo-400 shadow-[0_0_12px_rgba(139,92,246,0.6)]';
    }
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between text-[11px] font-bold">
          {label && <span className="text-slate-400 uppercase tracking-wider">{label}</span>}
          {showLabel && <span className="font-mono text-white">{Math.round(clampedProgress)}%</span>}
        </div>
      )}
      <div
        className="w-full bg-black/60 rounded-full overflow-hidden border border-white/[0.08]"
        style={{ height }}
      >
        <div
          className={`h-full rounded-full bg-gradient-to-r transition-all duration-500 ease-out ${getGradient()}`}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}

/**
 * Metric Stat Counter Module
 */
interface CinematicStatProps {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  trend?: string;
  color?: 'default' | 'gold' | 'violet' | 'cyan';
}

export function CinematicStat({ label, value, icon, trend, color = 'default' }: CinematicStatProps) {
  const getValueColor = () => {
    switch (color) {
      case 'gold':
        return 'text-amber-400';
      case 'violet':
        return 'text-purple-300';
      case 'cyan':
        return 'text-cyan-400';
      default:
        return 'text-white';
    }
  };

  return (
    <div className="p-3 bg-[#161824] border border-white/[0.07] rounded-xl flex items-center justify-between gap-3">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 block">
          {label}
        </span>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={`font-heading font-black text-lg sm:text-xl leading-none ${getValueColor()}`}>
            {value}
          </span>
          {trend && (
            <span className="text-[10px] font-bold font-mono text-emerald-400">
              {trend}
            </span>
          )}
        </div>
      </div>
      {icon && (
        <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-slate-300 shrink-0">
          {icon}
        </div>
      )}
    </div>
  );
}

/**
 * Sleek Tag/Badge Component
 */
interface CinematicBadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'violet' | 'cyan' | 'crimson' | 'emerald' | 'slate';
  icon?: React.ReactNode;
  className?: string;
}

export function CinematicBadge({
  children,
  variant = 'slate',
  icon,
  className = '',
}: CinematicBadgeProps) {
  const getStyles = () => {
    switch (variant) {
      case 'gold':
        return 'bg-amber-950/70 border-amber-500/50 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]';
      case 'violet':
        return 'bg-purple-950/70 border-purple-500/50 text-purple-200 shadow-[0_0_12px_rgba(139,92,246,0.2)]';
      case 'cyan':
        return 'bg-cyan-950/70 border-cyan-500/50 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.2)]';
      case 'crimson':
        return 'bg-red-950/70 border-red-500/50 text-red-200 shadow-[0_0_12px_rgba(230,36,41,0.2)]';
      case 'emerald':
        return 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.2)]';
      case 'slate':
      default:
        return 'bg-slate-900/80 border-white/10 text-slate-300';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-black uppercase tracking-wider ${getStyles()} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
