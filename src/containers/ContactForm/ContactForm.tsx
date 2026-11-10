'use client';

import { useState, type FormEvent } from 'react';
import { CountryCodeSelect } from '@/components/CountryCodeSelect';

const MESSAGE_LIMIT = 500;

// Shared look for the single-line fields
const fieldClass =
  'border-ink/15 focus:border-ink placeholder:text-ink/50 h-12 w-full rounded-lg border bg-transparent px-4 text-sm transition-colors outline-none';

export function ContactForm() {
  const [messageLength, setMessageLength] = useState(0);

  // Static export has no server: hook a form service (e.g. Web3Forms) in here
  const onSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 gap-3 lg:gap-4">
      <input
        name="name"
        aria-label="Your name"
        placeholder="Your name *"
        autoComplete="name"
        required
        className={fieldClass}
      />
      <input
        type="email"
        name="email"
        aria-label="Email address"
        placeholder="Email address *"
        autoComplete="email"
        required
        className={fieldClass}
      />

      {/* One wide row: compact country code picker, then the number */}
      <div className="border-ink/15 focus-within:border-ink col-span-2 flex h-12 items-stretch rounded-lg border transition-colors">
        <CountryCodeSelect
          name="countryCode"
          className="border-ink/15 shrink-0 border-r"
        />
        <input
          type="tel"
          name="phone"
          inputMode="tel"
          aria-label="Mobile number"
          placeholder="Mobile number *"
          autoComplete="tel-national"
          pattern="[0-9\s-]{6,15}"
          title="Digits only, 6 to 15 characters"
          required
          className="placeholder:text-ink/50 min-w-0 flex-1 bg-transparent px-4 text-sm outline-none"
        />
      </div>

      <div className="border-ink/15 focus-within:border-ink col-span-2 rounded-lg border px-4 pt-3 pb-2 transition-colors">
        <label htmlFor="message" className="text-ink/70 block text-sm">
          Tell us about your project *
        </label>
        <textarea
          id="message"
          name="message"
          rows={2}
          maxLength={MESSAGE_LIMIT}
          required
          placeholder="What are you trying to build? Any specific requirements?"
          onChange={(e) => setMessageLength(e.target.value.length)}
          className="placeholder:text-ink/50 mt-1 block w-full resize-none bg-transparent text-sm outline-none"
        />
        <p className="text-ink/50 text-right text-xs">
          {messageLength}/{MESSAGE_LIMIT}
        </p>
      </div>

      <button
        type="submit"
        className="bg-ink text-cream col-span-2 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-medium transition-opacity hover:opacity-80"
      >
        Send inquiry
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="size-4 fill-none stroke-current"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7M8 7h9v9" />
        </svg>
      </button>

      <p className="text-ink/60 col-span-2 flex items-center justify-center gap-2 text-xs">
        <svg aria-hidden viewBox="0 0 24 24" className="size-3.5 fill-current">
          <path d="M17 9V7A5 5 0 0 0 7 7v2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zM9 7a3 3 0 0 1 6 0v2H9z" />
        </svg>
        We respect your privacy. Your information is safe with us.
      </p>
    </form>
  );
}
