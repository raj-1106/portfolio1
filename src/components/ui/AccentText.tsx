import { type ReactNode, type CSSProperties } from 'react';

interface AccentTextProps {
  children: ReactNode;
  as?: 'span' | 'strong' | 'em';
  underline?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Inline text in the accent color.
 * Optional underline on hover (border-bottom, not text-decoration).
 */
export function AccentText({
  children,
  as: Tag = 'span',
  underline = false,
  className = '',
  style,
}: AccentTextProps) {
  return (
    <Tag
      className={`accent-text ${className}`}
      style={{
        color: 'var(--accent)',
        fontWeight: 'inherit',
        fontStyle: 'inherit',
        borderBottom: underline ? '1px solid transparent' : undefined,
        transition: underline ? 'border-color var(--duration-fast) ease' : undefined,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
