'use client';

import { motion, AnimatePresence } from 'framer-motion';
import * as Accordion from '@radix-ui/react-accordion';
import { experience, type ExperienceEntry } from '@/content/experience';
import { useMotionPreference } from '@/components/common/ReducedMotionContext';

function ExperienceItem({
  entry,
  isLast,
  value,
}: {
  entry: ExperienceEntry;
  isLast: boolean;
  value: string;
}) {
  const reduced = useMotionPreference();

  return (
    <Accordion.Item value={value} asChild>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {/* Timeline Column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '0.45rem', // Visually aligns dot with the <h3> text
          }}
        >
          <div
            style={{
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              border: '2px solid var(--text-secondary)',
              backgroundColor: 'var(--bg-primary)',
              flexShrink: 0,
            }}
          />
          {!isLast && (
            <div
              style={{
                flex: 1,
                width: '1px',
                backgroundColor: 'var(--line)',
                marginTop: '0.25rem',
              }}
            />
          )}
        </div>

        {/* Content Column */}
        <div style={{ flex: 1, paddingBottom: isLast ? '0' : '2.5rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '0.5rem',
            }}
          >
            <div>
              <h3 style={{ marginBottom: '0.2rem', fontSize: '1.125rem' }}>{entry.role}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                {entry.company} <span style={{ opacity: 0.5 }}>·</span> {entry.location}
              </p>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                whiteSpace: 'nowrap',
              }}
            >
              {entry.startDate} – {entry.endDate}
            </span>
          </div>

          <Accordion.Header style={{ margin: 0 }}>
            <Accordion.Trigger
              suppressHydrationWarning
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                cursor: 'pointer',
                padding: '0.25rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                marginBottom: '1rem',
              }}
              className="expand-toggle"
            >
              <span className="expand-text-show">+ Show details</span>
              <span className="expand-text-hide">− Hide details</span>
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="AccordionContent">
            <ul style={{ paddingLeft: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0, paddingBottom: '1rem' }}>
              {entry.bullets.map((bullet, j) => (
                <li key={j} style={{ marginBottom: '0.4rem' }}>
                  {bullet}
                </li>
              ))}
            </ul>
          </Accordion.Content>
        </div>

        <style jsx>{`
          .expand-toggle:hover {
            text-decoration: underline;
          }
          .expand-toggle:focus-visible {
            outline: 2px solid var(--accent);
            outline-offset: 2px;
            border-radius: 2px;
          }
          .expand-text-hide {
            display: none;
          }
          :global([data-state='open']) > .expand-toggle .expand-text-hide {
            display: inline;
          }
          :global([data-state='open']) > .expand-toggle .expand-text-show {
            display: none;
          }
          
          /* Radix Accordion Animation */
          :global(.AccordionContent) {
            overflow: hidden;
          }
          :global(.AccordionContent[data-state='open']) {
            animation: slideDown ${reduced ? '0s' : '0.3s'} cubic-bezier(0.87, 0, 0.13, 1);
          }
          :global(.AccordionContent[data-state='closed']) {
            animation: slideUp ${reduced ? '0s' : '0.3s'} cubic-bezier(0.87, 0, 0.13, 1);
          }
          
          @keyframes slideDown {
            from { height: 0; opacity: 0; }
            to { height: var(--radix-accordion-content-height); opacity: 1; }
          }
          @keyframes slideUp {
            from { height: var(--radix-accordion-content-height); opacity: 1; }
            to { height: 0; opacity: 0; }
          }
        `}</style>
      </div>
    </Accordion.Item>
  );
}

export function ExperienceList() {
  if (experience.length === 0) {
    return (
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        Experience details coming soon.
      </p>
    );
  }

  // We set the default expanded item using defaultValue on the Root
  const firstValue = `${experience[0].company}-${experience[0].startDate}`;

  return (
    <Accordion.Root type="multiple" defaultValue={[firstValue]} style={{ display: 'flex', flexDirection: 'column' }}>
      {experience.map((entry, i) => {
        const val = `${entry.company}-${entry.startDate}`;
        return (
          <ExperienceItem
            key={val}
            value={val}
            entry={entry}
            isLast={i === experience.length - 1}
          />
        );
      })}
    </Accordion.Root>
  );
}
