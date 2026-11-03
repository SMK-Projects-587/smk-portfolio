'use client';

import { useEffect, useRef } from 'react';
import OrbitIllustration, { OrbitShadow } from './ui/OrbitIllustration';

// Degrees of rotation per pixel scrolled (down = clockwise, up = counter-clockwise)
const DEG_PER_PX = 0.15;
// How quickly the drawn angle catches up to the target each frame (0–1)
const EASE = 0.12;

const tags = ['IDEAS', 'DESIGN', 'DEVELOP', 'GROW'];

export default function Hero() {
  const illustrationRef = useRef<HTMLDivElement>(null);

  // Rotate the illustration with scroll, eased so it glides instead of jumping
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lastY = window.scrollY;
    let target = 0; // angle we want to reach, driven by scroll
    let current = 0; // angle currently drawn, eased toward target
    let frame = 0;

    // Animate only while there is distance left to cover, then go idle
    const tick = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.01) current = target;
      if (illustrationRef.current) {
        illustrationRef.current.style.transform = `rotate(${current}deg)`;
      }
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const y = window.scrollY;
      target += (y - lastY) * DEG_PER_PX;
      lastY = y;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    // Mobile: copy, illustration and buttons stacked in the rest of the first
    // screen; the illustration takes whatever height is left so the buttons
    // always fit. Desktop: two columns, illustration on the right.
    <section className="flex flex-1 flex-col overflow-x-clip px-6 pt-1 pb-6 md:grid md:grid-cols-2 md:content-center md:gap-x-12 md:px-12 md:pt-6 md:pb-16">
      {/* Copy */}
      <div className="md:col-start-1 md:row-start-1 md:self-end">
        <p className="text-ink/70 text-[0.625rem] tracking-[0.28em] md:text-xs">
          INDEPENDENT DIGITAL STUDIO · INDIA
        </p>

        <h1 className="md:text-hero mt-3 text-[min(11vw,3rem,6.3dvh)] leading-[0.92] font-bold tracking-[-0.035em] md:mt-6 md:leading-[0.98]">
          Digital
          <br />
          experiences
          <br />
          for real
          <br />
          businesses<span className="text-olive">.</span>
        </h1>

        <p className="text-ink/75 mt-3 max-w-sm text-sm leading-[1.5] md:mt-6 md:max-w-md md:text-base">
          We&apos;re SMK — a team of 3 friends who design, develop and support
          modern websites for businesses, with a focus on long-term growth.
        </p>
      </div>

      {/* Illustration. Both layers scale to fit the box, so the static ground
          shadow always lines up under the rotating spheres. */}
      <div className="pointer-events-none relative mt-3 mb-4 min-h-32 flex-1 md:col-start-2 md:row-span-2 md:row-start-1 md:my-0 md:aspect-square md:w-full md:max-w-136 md:flex-none md:self-center md:justify-self-end">
        <OrbitShadow className="absolute inset-0 h-full w-full" />
        <div
          ref={illustrationRef}
          className="absolute inset-0 will-change-transform"
        >
          <OrbitIllustration className="h-full w-full" />
        </div>

        {/* Desktop only: tags and scroll cue stay still, in the drawing's empty corners */}
        <div className="text-ink/70 absolute top-0 right-0 hidden text-[0.6875rem] leading-[1.9] tracking-[0.28em] md:block">
          <ul>
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <div className="bg-ink/25 mt-3 h-px w-full" />
        </div>
        <div
          aria-hidden
          className="text-ink/70 absolute right-0 bottom-0 hidden flex-col items-center gap-2 text-[0.6875rem] tracking-[0.28em] md:flex"
        >
          SCROLL
          <span className="flex flex-col items-center">
            <span className="bg-ink/50 h-14 w-px" />
            <span className="border-ink/60 size-2 rounded-full border" />
          </span>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-2.5 md:col-start-1 md:row-start-2 md:mt-10 md:flex-row md:self-start">
        <a
          href="#work"
          className="bg-ink text-cream flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium whitespace-nowrap transition-opacity hover:opacity-80 md:h-12"
        >
          Explore our work
        </a>
        <a
          href="#contact"
          className="border-ink hover:bg-ink/5 flex h-11 items-center justify-center rounded-full border px-6 text-sm font-medium whitespace-nowrap transition-colors md:h-12"
        >
          Start a conversation
        </a>
      </div>
    </section>
  );
}
