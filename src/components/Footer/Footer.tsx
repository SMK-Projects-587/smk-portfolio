import type { ReactNode } from 'react';
import Logo from '@/components/ui/Logo';
import { services } from '@/constants/services';

const navLinks = ['Work', 'Studio', 'Approach', 'Services', 'Contact'];

// TODO: replace with SMK's real profile links and email address
const socials: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/',
    icon: (
      <g className="fill-none stroke-current" strokeWidth="1.6">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" className="fill-current" />
      </g>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/',
    icon: (
      <path
        className="fill-current"
        d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-1.96c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"
      />
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/',
    icon: (
      <path
        className="fill-current"
        d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.75 9.75h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4z"
      />
    ),
  },
  {
    label: 'Email',
    href: 'mailto:',
    icon: (
      <g
        className="fill-none stroke-current"
        strokeWidth="1.6"
        strokeLinejoin="round"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </g>
    ),
  },
];

// Desktop-only link column, separated from its neighbour by a thin rule
function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-ink/15 hidden border-l pl-8 lg:block">
      <h2 className="text-sm font-semibold">{title}</h2>
      <ul className="text-ink/70 mt-3 space-y-1 text-sm">{children}</ul>
    </div>
  );
}

export function Footer() {
  return (
    // Mobile: brand block, then copyright row.
    // Desktop: brand, Navigate and Services columns and a handwritten note in
    // one row, copyright on the left and tagline on the right below.
    <footer className="mx-auto w-full max-w-6xl px-6 md:px-12">
      <div className="border-ink/15 border-t pt-10 pb-8 lg:border-t-0">
        <div className="lg:flex lg:items-start lg:gap-8">
          <div>
            <Logo className="h-8 w-auto" />
            <p className="text-ink/70 mt-4 max-w-sm text-xs leading-relaxed">
              A digital studio by three friends, building thoughtful websites
              for businesses and supporting them beyond launch.
            </p>

            <ul className="mt-6 flex gap-6">
              {socials.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    {...(href.startsWith('http') && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                    className="block transition-opacity hover:opacity-60"
                  >
                    <svg aria-hidden viewBox="0 0 24 24" className="size-5">
                      {icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title="Navigate">
            {navLinks.map((label) => (
              <li key={label}>
                <a
                  href={`#${label.toLowerCase()}`}
                  className="hover:text-ink transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Services">
            {services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </FooterColumn>

          {/* Desktop only: handwritten sign-off */}
          <div className="ml-auto hidden -rotate-12 self-center pr-8 lg:block">
            <p className="font-script text-2xl leading-tight">
              Let&apos;s
              <br />
              create
              <br />
              something
              <br />
              meaningful.
            </p>
            <svg
              aria-hidden
              viewBox="0 0 64 8"
              className="mt-1 w-24 fill-none stroke-current"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M2 6C20 2 44 1 62 3" />
            </svg>
          </div>
        </div>

        <div className="border-ink/15 mt-8 flex items-center justify-between gap-4 border-t pt-6 lg:gap-8">
          <div className="text-ink/60 text-sm lg:flex lg:flex-1 lg:justify-between">
            <p>© {new Date().getFullYear()} SMK. All rights reserved.</p>
            <p className="mt-1 lg:mt-0">
              Built with care. Supported beyond launch.
            </p>
          </div>
          <a
            href="#"
            aria-label="Back to top"
            className="transition-opacity hover:opacity-60"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-6 fill-none stroke-current"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21V3M5 10l7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
