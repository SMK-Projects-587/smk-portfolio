'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';

type SelectProps = {
  name: string;
  placeholder: string;
  options: string[];
  required?: boolean;
  className?: string;
};

// Custom dropdown (ARIA listbox). The first row is the placeholder, so picking
// it clears the choice. The list scrolls once it outgrows its max height.
export function Select({
  name,
  placeholder,
  options,
  required,
  className = '',
}: SelectProps) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  // Highlighted row; 0 is the placeholder row
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();

  const rows = ['', ...options];
  const placeholderText = required ? `${placeholder} *` : placeholder;

  // While open: take keyboard focus, close on any click outside
  useEffect(() => {
    if (!open) return;
    listRef.current?.focus();
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
    setActive(rows.indexOf(value));
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  const choose = (row: string) => {
    setValue(row);
    close();
  };

  const onListKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const last = rows.length - 1;
    switch (e.key) {
      case 'ArrowDown':
        setActive((i) => Math.min(i + 1, last));
        break;
      case 'ArrowUp':
        setActive((i) => Math.max(i - 1, 0));
        break;
      case 'Home':
        setActive(0);
        break;
      case 'End':
        setActive(last);
        break;
      case 'Enter':
      case ' ':
        choose(rows[active]);
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
        aria-label={value ? `${placeholder}: ${value}` : placeholder}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            openList();
          }
        }}
        className={`focus-visible:border-ink flex h-12 w-full cursor-pointer items-center justify-between gap-2 rounded-lg border px-4 text-left text-sm transition-colors outline-none ${open ? 'border-ink' : 'border-ink/15'}`}
      >
        <span className={`truncate ${value ? '' : 'text-ink/50'}`}>
          {value || placeholderText}
        </span>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className={`size-4 shrink-0 fill-none stroke-current transition-transform ${open ? 'rotate-180' : ''}`}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Carries the value into the form and makes "required" block submit */}
      <input
        aria-hidden
        tabIndex={-1}
        name={name}
        value={value}
        required={required}
        onChange={() => {}}
        className="pointer-events-none absolute inset-0 opacity-0"
      />

      {open && (
        <ul
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          aria-label={placeholder}
          aria-activedescendant={`${id}-${active}`}
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          className="border-ink/15 bg-cream absolute inset-x-0 top-full z-20 mt-2 max-h-48 scrollbar-thin overflow-y-auto rounded-lg border py-1 shadow-lg outline-none"
        >
          {rows.map((row, i) => (
            <li
              key={row || 'placeholder'}
              id={`${id}-${i}`}
              role="option"
              aria-selected={row === value}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(row)}
              className={`flex cursor-pointer items-center justify-between gap-2 px-4 py-2.5 text-sm ${i === active ? 'bg-ink/5' : ''} ${row ? '' : 'text-ink/50'}`}
            >
              {row || placeholderText}
              {row && row === value && (
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="size-4 shrink-0 fill-none stroke-current"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12l5 5 9-10" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
