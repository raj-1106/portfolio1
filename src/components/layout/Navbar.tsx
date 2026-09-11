'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems, siteConfig } from '@/content/config';
import { useMotionPreference } from '@/components/common/ReducedMotionContext';
import { ResumeModal } from '@/components/resume/ResumeModal';

/**
 * Fixed top navbar.
 * --bg-primary background, border-bottom: 1px --line. No glass blur.
 * Connector-line underline on hover, node-dot active indicator.
 */
export function Navbar() {
  const pathname = usePathname();
  const reduced = useMotionPreference();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');

  // Scroll spy to detect active section
  useEffect(() => {
    // Only run on homepage
    if (pathname !== '/') return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the visible section that intersects the most
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio to get the most visible one
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const topId = visibleEntries[0].target.id;
          if (topId === 'hero') {
            setActiveHash('');
          } else {
            setActiveHash(`/#${topId}`);
          }
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    // Observe all sections mapped to nav items
    navItems.forEach((item) => {
      if (item.href.startsWith('/#')) {
        const id = item.href.split('#')[1];
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    });

    // Observe hero section to clear active state when at the top
    const heroEl = document.getElementById('hero');
    if (heroEl) observer.observe(heroEl);

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <nav
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        {/* Logo / Name */}
        <Link
          href="/"
          style={{
            color: 'var(--text-primary)',
            fontWeight: 600,
            fontSize: '1.125rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {/* Node dot before name */}
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              display: 'inline-block',
            }}
          />
          {siteConfig.name}
        </Link>

        {/* Desktop nav links */}
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            gap: '2rem',
            alignItems: 'center',
          }}
          className="nav-links-desktop"
        >
          {navItems.map((item) => {
            // Active if exact match (for subpages) or activeHash match (for homepage)
            const isActive =
              pathname === item.href ||
              (pathname === '/' && activeHash === item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="nav-link"
                  onClick={() => {
                    if (pathname === '/') setActiveHash(item.href);
                  }}
                  style={{
                    color: isActive
                      ? 'var(--text-primary)'
                      : 'var(--text-secondary)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    position: 'relative',
                    paddingBottom: '4px',
                    transition: 'color var(--duration-fast) ease',
                  }}
                >
                  {item.label}

                  {/* Active indicator: node dot */}
                  {isActive && (
                    <motion.span
                      layoutId={reduced ? undefined : 'nav-active-dot'}
                      style={{
                        position: 'absolute',
                        bottom: '-8px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent)',
                      }}
                      transition={reduced ? undefined : {
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ResumeModal />

          {/* Mobile hamburger */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav-mobile-menu"
            initial={reduced ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '64px',
              left: 0,
              right: 0,
              backgroundColor: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--line)',
              padding: '1rem 1.5rem',
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '1rem',
                      display: 'block',
                      padding: '0.5rem 0',
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background-color: var(--accent);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform var(--duration-normal) var(--ease-out-expo);
        }
        .nav-link:hover::after {
          transform: scaleX(1);
        }

        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none !important;
          }
          .nav-mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
