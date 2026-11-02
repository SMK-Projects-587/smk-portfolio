// Stone sphere, smoked-glass sphere, chrome and marble balls on two chrome
// orbit rings, drawn on a 580x580 canvas. Materials come from SVG gradients and
// filters: the stone has lit micro-relief, hairline cracks and pores, and the
// marble has two layers of veins.

// Sphere positions, shared by each sphere and its clip path
const STONE = { cx: 285, cy: 305, r: 168 };
const GLASS = { cx: 167, cy: 355, r: 104 };
const CHROME = { cx: 450, cy: 182, r: 31 };
const MARBLE = { cx: 390, cy: 507, r: 45 };

// Orbit rings: placement and radii
const RING_WIDE = {
  transform: 'translate(299 286) rotate(19)',
  rx: 271,
  ry: 160,
};
const RING_TALL = {
  transform: 'translate(332 256) rotate(-14)',
  rx: 133,
  ry: 257,
};

// One half of a chrome ring. Rings are drawn in two halves so they can pass
// behind some spheres and in front of others.
function Ring({
  ring,
  half,
}: {
  ring: typeof RING_WIDE;
  half: 'front' | 'back';
}) {
  return (
    <g transform={ring.transform} fill="none" clipPath={`url(#o-${half})`}>
      <ellipse
        rx={ring.rx}
        ry={ring.ry}
        stroke="url(#o-ring-body)"
        strokeWidth="4.4"
      />
      <ellipse
        rx={ring.rx}
        ry={ring.ry}
        stroke="url(#o-ring-shine)"
        strokeWidth="1.3"
      />
    </g>
  );
}

// Soft ground shadow, kept separate so it stays still while the
// illustration rotates. Same canvas, so it lines up when both fill one box.
export function OrbitShadow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 580 580" className={className} aria-hidden>
      <defs>
        <radialGradient id="o-ground">
          <stop offset="0" stopColor="#6B5A45" stopOpacity="0.35" />
          <stop offset="1" stopColor="#6B5A45" stopOpacity="0" />
        </radialGradient>
        <filter
          id="o-ground-blur"
          x="-20%"
          y="-200%"
          width="140%"
          height="500%"
        >
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <ellipse
        cx="270"
        cy="545"
        rx="230"
        ry="16"
        fill="url(#o-ground)"
        filter="url(#o-ground-blur)"
      />
    </svg>
  );
}

export default function OrbitIllustration({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 580 580"
      className={className}
      role="img"
      aria-label="Stone, glass, chrome and marble spheres on orbit rings"
    >
      <defs>
        {/* Stone (plaster) */}
        <radialGradient id="o-stone" cx="68%" cy="22%" r="96%">
          <stop offset="0" stopColor="#FDFAF5" />
          <stop offset="0.32" stopColor="#F2E8DC" />
          <stop offset="0.6" stopColor="#DCCBBA" />
          <stop offset="0.82" stopColor="#BFAB98" />
          <stop offset="1" stopColor="#9E8A77" />
        </radialGradient>
        {/* bounce light from the floor on the lower edge */}
        <radialGradient id="o-stone-bounce" cx="55%" cy="105%" r="55%">
          <stop offset="0" stopColor="#F3E9DC" stopOpacity="0.55" />
          <stop offset="1" stopColor="#F3E9DC" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="o-stone-core" cx="22%" cy="82%" r="75%">
          <stop offset="0" stopColor="#5A4636" stopOpacity="0.38" />
          <stop offset="0.55" stopColor="#5A4636" stopOpacity="0.12" />
          <stop offset="1" stopColor="#5A4636" stopOpacity="0" />
        </radialGradient>
        <filter
          id="o-stone-surface"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          {/* micro relief lit from the upper right */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.045"
            numOctaves="4"
            seed="3"
            result="relief"
          />
          <feDiffuseLighting
            in="relief"
            surfaceScale="2.2"
            diffuseConstant="1"
            lightingColor="#ffffff"
            result="lit"
          >
            <feDistantLight azimuth="300" elevation="58" />
          </feDiffuseLighting>
          {/* hairline cracks: creases of a turbulence field */}
          <feTurbulence
            type="turbulence"
            baseFrequency="0.05"
            numOctaves="2"
            seed="21"
            result="t"
          />
          <feColorMatrix
            in="t"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0"
            result="ta"
          />
          <feComponentTransfer in="ta" result="crackMask">
            <feFuncA
              type="table"
              tableValues="0.75 0.12 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feFlood floodColor="#A79686" />
          <feComposite in2="crackMask" operator="in" result="cracks" />
          {/* fine pores */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="1"
            seed="5"
            result="p"
          />
          <feColorMatrix
            in="p"
            type="matrix"
            values="0 0 0 0 0.5  0 0 0 0 0.44  0 0 0 0 0.38  -1.1 0 0 0 0.55"
            result="pores"
          />
          <feMerge result="detail">
            <feMergeNode in="cracks" />
            <feMergeNode in="pores" />
          </feMerge>
          <feComponentTransfer in="lit" result="litOnly">
            <feFuncR type="linear" slope="0.5" intercept="0.56" />
            <feFuncG type="linear" slope="0.5" intercept="0.56" />
            <feFuncB type="linear" slope="0.5" intercept="0.56" />
          </feComponentTransfer>
          <feBlend
            in="SourceGraphic"
            in2="litOnly"
            mode="multiply"
            result="shaded"
          />
          <feComposite in="detail" in2="shaded" operator="over" result="all" />
          <feComposite in="all" in2="SourceAlpha" operator="in" />
        </filter>

        {/* Smoked glass */}
        <radialGradient id="o-glass" cx="40%" cy="34%" r="72%">
          <stop offset="0" stopColor="#1C1C12" />
          <stop offset="0.55" stopColor="#0E0E07" />
          <stop offset="1" stopColor="#050503" />
        </radialGradient>
        <radialGradient id="o-glass-caustic" cx="50%" cy="95%" r="62%">
          <stop offset="0" stopColor="#D8CB9C" stopOpacity="0.95" />
          <stop offset="0.3" stopColor="#8E865F" stopOpacity="0.75" />
          <stop offset="0.65" stopColor="#4A4630" stopOpacity="0.35" />
          <stop offset="1" stopColor="#2A2818" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="o-glass-rim" cx="50%" cy="50%" r="50%">
          <stop offset="0.82" stopColor="#B9B196" stopOpacity="0" />
          <stop offset="0.96" stopColor="#B9B196" stopOpacity="0.28" />
          <stop offset="1" stopColor="#E6DEC6" stopOpacity="0.75" />
        </radialGradient>
        <linearGradient id="o-glass-window" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.35" />
        </linearGradient>

        {/* Chrome ball */}
        <linearGradient id="o-chrome" x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0" stopColor="#F7F5F1" />
          <stop offset="0.3" stopColor="#A9A39B" />
          <stop offset="0.47" stopColor="#4A443D" />
          <stop offset="0.53" stopColor="#211E1A" />
          <stop offset="0.75" stopColor="#5E564C" />
          <stop offset="1" stopColor="#D6CBBC" />
        </linearGradient>
        <radialGradient id="o-edge-dark" cx="45%" cy="40%" r="60%">
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.45" />
        </radialGradient>

        {/* Marble */}
        <radialGradient id="o-marble" cx="36%" cy="30%" r="78%">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.5" stopColor="#F3F0EC" />
          <stop offset="0.85" stopColor="#D7D0C7" />
          <stop offset="1" stopColor="#B9AFA3" />
        </radialGradient>
        <filter
          id="o-marble-veins"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="turbulence"
            baseFrequency="0.016 0.032"
            numOctaves="5"
            seed="11"
            result="t"
          />
          <feColorMatrix
            in="t"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0"
            result="ta"
          />
          <feComponentTransfer in="ta" result="m1">
            <feFuncA type="table" tableValues="1 0.6 0.1 0 0 0 0 0 0 0" />
          </feComponentTransfer>
          <feFlood floodColor="#6B5A4B" />
          <feComposite in2="m1" operator="in" result="v1" />
          <feTurbulence
            type="turbulence"
            baseFrequency="0.05 0.03"
            numOctaves="4"
            seed="4"
            result="t2"
          />
          <feColorMatrix
            in="t2"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0"
            result="tb"
          />
          <feComponentTransfer in="tb" result="m2">
            <feFuncA type="table" tableValues="0.7 0.1 0 0 0 0 0 0 0 0 0 0" />
          </feComponentTransfer>
          <feFlood floodColor="#9C9085" />
          <feComposite in2="m2" operator="in" result="v2" />
          <feGaussianBlur in="v1" stdDeviation="0.6" result="v1b" />
          <feMerge>
            <feMergeNode in="v2" />
            <feMergeNode in="v1b" />
          </feMerge>
        </filter>

        {/* Chrome ring tube */}
        <linearGradient id="o-ring-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#BDB6AC" />
          <stop offset="0.3" stopColor="#857C71" />
          <stop offset="0.55" stopColor="#C9C2B7" />
          <stop offset="0.8" stopColor="#7B7268" />
          <stop offset="1" stopColor="#B5ADA2" />
        </linearGradient>
        <linearGradient id="o-ring-shine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="0.6" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.4" />
        </linearGradient>

        <filter id="o-blur-lg" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="o-blur-md" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
        <filter id="o-blur-sm" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.8" />
        </filter>

        <clipPath id="o-clip-stone">
          <circle {...STONE} />
        </clipPath>
        <clipPath id="o-clip-glass">
          <circle {...GLASS} />
        </clipPath>
        <clipPath id="o-clip-marble">
          <circle {...MARBLE} />
        </clipPath>
        <clipPath id="o-clip-chrome">
          <circle {...CHROME} />
        </clipPath>
        <clipPath id="o-front">
          <rect x="-400" y="0" width="800" height="400" />
        </clipPath>
        <clipPath id="o-back">
          <rect x="-400" y="-400" width="800" height="400" />
        </clipPath>
      </defs>

      {/* Back halves of both rings */}
      <Ring ring={RING_WIDE} half="back" />
      <Ring ring={RING_TALL} half="back" />

      {/* Stone */}
      <circle {...STONE} fill="url(#o-stone)" filter="url(#o-stone-surface)" />
      <g clipPath="url(#o-clip-stone)">
        <circle {...STONE} fill="url(#o-stone-core)" />
        <circle {...STONE} fill="url(#o-stone-bounce)" />
        <path
          d="M150 400 C185 455 240 478 300 473"
          stroke="#F6EEE3"
          strokeOpacity="0.55"
          strokeWidth="5"
          fill="none"
          filter="url(#o-blur-md)"
        />
        {/* occlusion where the glass sphere sits in front */}
        <ellipse
          cx="228"
          cy="372"
          rx="92"
          ry="100"
          fill="#5E4C3C"
          opacity="0.26"
          filter="url(#o-blur-lg)"
        />
        {/* broad soft sheen on the lit side */}
        <ellipse
          cx="350"
          cy="215"
          rx="70"
          ry="48"
          fill="#FFFFFF"
          opacity="0.35"
          filter="url(#o-blur-lg)"
        />
      </g>

      {/* tall ring: front half passes over the stone, behind the glass */}
      <Ring ring={RING_TALL} half="front" />

      {/* Chrome ball */}
      <circle {...CHROME} fill="url(#o-chrome)" />
      <g clipPath="url(#o-clip-chrome)">
        <circle {...CHROME} fill="url(#o-edge-dark)" />
        <ellipse
          cx="438"
          cy="166"
          rx="10"
          ry="6"
          transform="rotate(-25 438 166)"
          fill="#fff"
          opacity="0.95"
          filter="url(#o-blur-sm)"
        />
        <ellipse
          cx="462"
          cy="200"
          rx="9"
          ry="3"
          transform="rotate(-25 462 200)"
          fill="#F4E9DA"
          opacity="0.5"
          filter="url(#o-blur-sm)"
        />
      </g>

      {/* Smoked glass */}
      <circle {...GLASS} fill="url(#o-glass)" fillOpacity="0.96" />
      <g clipPath="url(#o-clip-glass)">
        {/* light transmitted through the glass gathers at the bottom */}
        <circle {...GLASS} fill="url(#o-glass-caustic)" />
        {/* warm reflection of the stone sphere on the right */}
        <ellipse
          cx="252"
          cy="335"
          rx="34"
          ry="78"
          fill="#E4D6C2"
          opacity="0.38"
          filter="url(#o-blur-md)"
        />
        <circle {...GLASS} fill="url(#o-glass-rim)" />
        {/* studio window reflection (top left) */}
        <path
          d="M96 292 C104 268 128 254 156 251 C150 262 138 272 124 282 C114 289 104 293 96 292 Z"
          fill="url(#o-glass-window)"
          filter="url(#o-blur-sm)"
        />
        <path
          d="M90 312 C92 305 96 300 101 297"
          stroke="#fff"
          strokeOpacity="0.7"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#o-blur-sm)"
        />
        {/* sharp catch-light */}
        <ellipse
          cx="190"
          cy="268"
          rx="9"
          ry="4"
          transform="rotate(-8 190 268)"
          fill="#fff"
          opacity="0.85"
          filter="url(#o-blur-sm)"
        />
        {/* bright refracted edge at the lower right */}
        <path
          d="M250 372 C244 420 212 452 166 459"
          stroke="#F7EED6"
          strokeOpacity="0.8"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#o-blur-sm)"
        />
        <path
          d="M70 340 C68 395 95 438 138 455"
          stroke="#D8CFB4"
          strokeOpacity="0.4"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          filter="url(#o-blur-md)"
        />
      </g>

      {/* Marble */}
      <circle {...MARBLE} fill="url(#o-marble)" />
      <g clipPath="url(#o-clip-marble)">
        <rect
          x="345"
          y="462"
          width="90"
          height="90"
          filter="url(#o-marble-veins)"
        />
        <circle {...MARBLE} fill="url(#o-edge-dark)" opacity="0.6" />
        <ellipse
          cx="374"
          cy="488"
          rx="13"
          ry="7"
          transform="rotate(-30 374 488)"
          fill="#fff"
          opacity="0.95"
          filter="url(#o-blur-sm)"
        />
        <ellipse
          cx="405"
          cy="532"
          rx="14"
          ry="4"
          transform="rotate(-25 405 532)"
          fill="#fff"
          opacity="0.35"
          filter="url(#o-blur-md)"
        />
      </g>

      {/* wide ring: front half over everything */}
      <Ring ring={RING_WIDE} half="front" />
    </svg>
  );
}
