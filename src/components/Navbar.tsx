'use client';

import { useEffect, useState } from 'react';
import Logo from './Logo';

// Nav items shared by the desktop inline nav and the mobile menu
const links = ['Work', 'Studio', 'Approach', 'Services', 'Contact'];

export default function Navbar() {
  // Whether the mobile menu is open (desktop nav doesn't use this)
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // While the mobile menu is open: lock page scroll, close on Escape
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <header className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12">
      {/* Logo, far left on both mobile and desktop */}
      <a href="#" aria-label="SMK home" onClick={close}>
        <Logo className="h-6 w-auto" />
      </a>

      {/* Desktop inline nav links, hidden on mobile */}
      <nav className="hidden items-center gap-8 md:flex">
        {links.map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            className="text-ink/70 hover:text-ink text-sm transition-colors"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Desktop CTA button, hidden on mobile */}
      <a
        href="#contact"
        className="bg-ink text-cream hidden rounded-full px-6 py-3 text-sm transition-opacity hover:opacity-80 md:inline-block"
      >
        Start a project
      </a>

      {/* Mobile menu toggle, hidden on desktop */}
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="-mr-2 flex h-10 w-10 cursor-pointer items-center justify-center md:hidden"
      >
        {/* Single icon whose path swaps between hamburger and X */}
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 fill-none stroke-current"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d={open ? 'M5 5l14 14M19 5L5 19' : 'M3 6h18M3 12h18M3 18h18'} />
        </svg>
      </button>

      {/* Full-screen mobile menu, only rendered while open */}
      {open && (
        <nav className="bg-cream fixed inset-0 -z-10 px-6 pt-24 md:hidden">
          <ul>
            {links.map((label) => (
              <li key={label} className="border-ink/10 border-b">
                <a
                  href={`#${label.toLowerCase()}`}
                  onClick={close}
                  className="hover:text-ink/70 block py-5 text-4xl font-bold tracking-tight transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
