import Image from 'next/image';
import courtyard from '@/assets/images/contact-courtyard.webp';
import { pillars } from '@/constants/pillars';
import { ContactForm } from '@/containers/ContactForm';

export function Contact() {
  return (
    // Mobile/tablet: photo banner above the copy and form.
    // Desktop: framed by dividers top and bottom; copy and form on the left,
    // photo filling the right side from divider to divider.
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="lg:px-12"
    >
      <div className="lg:border-ink/15 lg:flex lg:border-y">
        {/* Photo with the slogan (and tags on mobile) on its empty wall */}
        <div className="relative aspect-video overflow-hidden lg:order-last lg:aspect-auto lg:w-1/2">
          <Image
            src={courtyard}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            placeholder="blur"
            // Desktop crop keeps the plant in view and the plain wall top-left for the slogan
            className="object-cover lg:object-[45%_center]"
          />
          <div className="absolute inset-y-0 left-6 flex flex-col justify-center lg:left-8 lg:justify-start lg:pt-4">
            <div className="-rotate-6">
              <p className="font-script text-xl leading-tight lg:text-3xl">
                Good
                <br />
                Websites
                <br />
                Better
                <br />
                Businessss
              </p>
              <svg
                aria-hidden
                viewBox="0 0 64 8"
                className="mt-1 w-16 fill-none stroke-current lg:w-24"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M2 6C20 2 44 1 62 3" />
              </svg>
            </div>
            <ul className="text-ink/70 text-2xs mt-4 tracking-widest lg:hidden">
              {pillars.map((pillar) => (
                <li key={pillar}>{pillar}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-6 pt-8 pb-10 md:px-12 lg:flex-1 lg:py-12 lg:pr-12 lg:pl-0">
          <p className="text-ink/70 text-xs tracking-widest">
            HAVE A PROJECT IN MIND?
          </p>
          <h2
            id="contact-heading"
            className="mt-3 text-4xl leading-none font-bold tracking-tight sm:text-5xl lg:mt-6 xl:text-6xl"
          >
            Let&apos;s build
            <br />
            something great
            <br />
            together<span className="text-olive">.</span>
          </h2>
          <p className="text-ink/70 mt-4 text-sm lg:mt-6 lg:text-base">
            Tell us about your business and what you&apos;d like to build.
            We&apos;ll get back to you as soon as possible.
          </p>

          <div className="mt-6 lg:mt-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
