'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import {
  countryCodes,
  defaultCountryIso,
  type CountryCode,
} from '@/constants/countryCodes';

type CountryCodeSelectProps = {
  /** Form field name; submits the dial code, e.g. "+91" */
  name: string;
  className?: string;
};

// Flag images live in public/flags/<ISO>.svg (from country-flag-icons, MIT)
// Decorative: the country name or dial code always sits beside it.
function Flag({ iso }: Pick<CountryCode, 'iso'>) {
  return (
    <Image
      src={`/flags/${iso}.svg`}
      alt=""
      width={20}
      height={15}
      className="ring-ink/10 h-[15px] w-5 shrink-0 rounded-[2px] object-cover ring-1"
    />
  );
}

// Compact dial-code picker for the phone field. The closed control shows just
// the flag and code; the menu adds a search box so a long list stays usable.
// Follows the same listbox pattern as the Select component.
export function CountryCodeSelect({
  name,
  className = '',
}: CountryCodeSelectProps) {
  const [iso, setIso] = useState(defaultCountryIso);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();

  const selected = countryCodes.find((c) => c.iso === iso) ?? countryCodes[0];

  const q = query.trim().toLowerCase().replace(/^\+/, '');
  const rows = q
    ? countryCodes.filter(
        (c) =>
          c.name.toLowerCase().includes(q) || c.dial.slice(1).startsWith(q),
      )
    : countryCodes;

  // While open: focus the search box, close on any click outside
  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  // Keep the highlighted row visible inside the scrolling list
  useEffect(() => {
    if (open) {
      listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' });
    }
  }, [open, active]);

  const openList = () => {
    setQuery('');
    setActive(Math.max(countryCodes.indexOf(selected), 0));
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  const choose = (country: CountryCode) => {
    setIso(country.iso);
    close();
  };

  const onSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const last = rows.length - 1;
    switch (e.key) {
      case 'ArrowDown':
        setActive((i) => Math.min(i + 1, last));
        break;
      case 'ArrowUp':
        setActive((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
        if (rows[active]) choose(rows[active]);
        break;
      case 'Escape':
        close();
        break;
      case 'Tab':
        setOpen(false);
        return; // let focus move on
      default:
        return;
    }
    e.preventDefault();
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label={`Country code: ${selected.name} ${selected.dial}`}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            openList();
          }
        }}
        className="flex h-full cursor-pointer items-center gap-2 pr-2.5 pl-3.5 text-sm outline-none"
      >
        <Flag iso={selected.iso} />
        <span>{selected.dial}</span>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className={`text-ink/60 size-3.5 fill-none stroke-current transition-transform ${open ? 'rotate-180' : ''}`}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <input type="hidden" name={name} value={selected.dial} />

      {open && (
        <div className="border-ink/15 bg-cream absolute top-full left-0 z-20 mt-2 w-64 overflow-hidden rounded-lg border shadow-lg">
          <div className="border-ink/15 flex items-center gap-2 border-b px-3">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="text-ink/50 size-3.5 shrink-0 fill-none stroke-current"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              ref={searchRef}
              role="combobox"
              aria-expanded
              aria-controls={`${id}-list`}
              aria-activedescendant={
                rows[active] ? `${id}-${active}` : undefined
              }
              aria-label="Search country"
              placeholder="Search country or code"
              autoComplete="off"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onSearchKeyDown}
              className="placeholder:text-ink/50 h-10 w-full bg-transparent text-sm outline-none"
            />
          </div>

          <ul
            ref={listRef}
            id={`${id}-list`}
            role="listbox"
            aria-label="Country code"
            className="max-h-52 scrollbar-thin overflow-y-auto py-1"
          >
            {rows.length === 0 && (
              <li className="text-ink/50 px-3 py-2.5 text-sm">No matches</li>
            )}
            {rows.map((country, i) => (
              <li
                key={country.iso}
                id={`${id}-${i}`}
                role="option"
                aria-selected={country.iso === selected.iso}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(country)}
                className={`flex cursor-pointer items-center gap-2.5 px-3 py-2 text-sm ${i === active ? 'bg-ink/5' : ''}`}
              >
                <Flag iso={country.iso} />
                <span className="flex-1 truncate">{country.name}</span>
                <span className="text-ink/60 text-xs">{country.dial}</span>
                {country.iso === selected.iso && (
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="text-olive size-3.5 shrink-0 fill-none stroke-current"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
