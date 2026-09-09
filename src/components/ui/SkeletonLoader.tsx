interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

/**
 * Loading placeholder with shimmer effect.
 * Uses --bg-elevated and --line colors. No accent color in loading state.
 */
export function SkeletonLoader({
  width = '80px',
  height = '20px',
  borderRadius = 'var(--radius)',
}: SkeletonLoaderProps) {
  return (
    <>
      <div
        className="skeleton-loader"
        style={{
          width,
          height,
          borderRadius,
          backgroundColor: 'var(--bg-elevated)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="skeleton-shimmer" />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .skeleton-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--line) 50%,
            transparent 100%
          );
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </>
  );
}
