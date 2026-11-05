// Large marble sphere, smoked-glass sphere, chrome and marble balls on two
// chrome orbit rings, drawn on a 580x580 canvas. Materials come from SVG
// gradients and filters: both marbles have clouds and two layers of veins, and
// the chrome pieces have banded studio reflections.

// Sphere positions, shared by each sphere and its clip path
const CORE = { cx: 285, cy: 305, r: 168 };
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
      {/* polished tube: darker edges, banded reflections, a bright specular line */}
      <ellipse
        rx={ring.rx}
        ry={ring.ry}
        stroke="url(#o-ring-edge)"
        strokeWidth="4.4"
      />
      <ellipse
        rx={ring.rx}
        ry={ring.ry}
        stroke="url(#o-ring-body)"
        strokeWidth="3.4"
      />
      <ellipse
        rx={ring.rx}
        ry={ring.ry}
        stroke="url(#o-ring-shine)"
        strokeWidth="1"
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
      aria-label="Marble, glass and chrome spheres on orbit rings"
    >
      <defs>
        {/* Large marble sphere: warm cream body */}
        <radialGradient id="o-core" cx="68%" cy="22%" r="96%">
          <stop offset="0" stopColor="#FDFAF5" />
          <stop offset="0.32" stopColor="#F2E8DC" />
          <stop offset="0.6" stopColor="#DCCBBA" />
          <stop offset="0.82" stopColor="#BFAB98" />
          <stop offset="1" stopColor="#9E8A77" />
        </radialGradient>
        {/* bounce light from the floor on the lower edge */}
        <radialGradient id="o-core-bounce" cx="55%" cy="105%" r="55%">
          <stop offset="0" stopColor="#F3E9DC" stopOpacity="0.55" />
          <stop offset="1" stopColor="#F3E9DC" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="o-core-shadow" cx="22%" cy="82%" r="75%">
          <stop offset="0" stopColor="#5A4636" stopOpacity="0.38" />
          <stop offset="0.55" stopColor="#5A4636" stopOpacity="0.12" />
          <stop offset="1" stopColor="#5A4636" stopOpacity="0" />
        </radialGradient>
        {/* Marble pattern for the large sphere (veins only, drawn over the
            gradient): soft clouds, flowing main veins and fine secondary ones.
            The main veins start as these unevenly spaced lines. */}
        <linearGradient
          id="o-core-veins"
          x1="0"
          y1="0"
          x2="0"
          y2="0.5"
          spreadMethod="repeat"
        >
          <stop offset="0.07" stopColor="#7D6B5B" stopOpacity="0" />
          <stop offset="0.085" stopColor="#7D6B5B" stopOpacity="0.75" />
          <stop offset="0.095" stopColor="#7D6B5B" stopOpacity="0" />
          <stop offset="0.3" stopColor="#8C7B6B" stopOpacity="0" />
          <stop offset="0.306" stopColor="#8C7B6B" stopOpacity="0.45" />
          <stop offset="0.312" stopColor="#8C7B6B" stopOpacity="0" />
          <stop offset="0.36" stopColor="#7D6B5B" stopOpacity="0" />
          <stop offset="0.372" stopColor="#7D6B5B" stopOpacity="0.6" />
          <stop offset="0.38" stopColor="#7D6B5B" stopOpacity="0" />
          <stop offset="0.7" stopColor="#8C7B6B" stopOpacity="0" />
          <stop offset="0.71" stopColor="#8C7B6B" stopOpacity="0.35" />
          <stop offset="0.717" stopColor="#8C7B6B" stopOpacity="0" />
        </linearGradient>
        <filter
          id="o-core-marble"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.011"
            numOctaves="3"
            seed="8"
            result="cloud"
          />
          <feColorMatrix
            in="cloud"
            type="matrix"
            values="0 0 0 0 0.66  0 0 0 0 0.6  0 0 0 0 0.54  0.6 0 0 0 -0.28"
            result="clouds"
          />
          {/* main veins: the straight vein lines painted on the square,
              warped by noise so they flow like real marble */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.005"
            numOctaves="2"
            seed="17"
            result="warp"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale="130"
            xChannelSelector="R"
            yChannelSelector="G"
            result="v1"
          />
          {/* crisp vein plus the soft halo real veins have around them */}
          <feGaussianBlur in="v1" stdDeviation="2.5" result="halo" />
          <feComponentTransfer in="halo" result="haloSoft">
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="v1" stdDeviation="0.4" result="v1b" />
          <feTurbulence
            type="turbulence"
            baseFrequency="0.022 0.012"
            numOctaves="4"
            seed="29"
            result="t2"
          />
          <feColorMatrix
            in="t2"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0"
            result="a2"
          />
          <feComponentTransfer in="a2" result="m2">
            <feFuncA
              type="table"
              tableValues="0.55 0.08 0 0 0 0 0 0 0 0 0 0 0 0"
            />
          </feComponentTransfer>
          <feFlood floodColor="#A69686" />
          <feComposite in2="m2" operator="in" result="v2" />
          <feMerge>
            <feMergeNode in="clouds" />
            <feMergeNode in="haloSoft" />
            <feMergeNode in="v2" />
            <feMergeNode in="v1b" />
          </feMerge>
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

        {/* Chrome ball: bright sky, a sharp dark horizon, warm ground below */}
        <linearGradient id="o-chrome" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.22" stopColor="#DAD6D0" />
          <stop offset="0.4" stopColor="#8C867E" />
          <stop offset="0.47" stopColor="#36312C" />
          <stop offset="0.5" stopColor="#0E0C0A" />
          <stop offset="0.57" stopColor="#2C2722" />
          <stop offset="0.74" stopColor="#6E6558" />
          <stop offset="0.9" stopColor="#C8BDAD" />
          <stop offset="1" stopColor="#F2EADE" />
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
        <linearGradient id="o-ring-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8E867B" />
          <stop offset="0.5" stopColor="#6A635B" />
          <stop offset="1" stopColor="#8A8278" />
        </linearGradient>
        {/* sharp light/dark bands, like a studio reflected in polished metal */}
        <linearGradient id="o-ring-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4F1EC" />
          <stop offset="0.12" stopColor="#A39C92" />
          <stop offset="0.2" stopColor="#5A544D" />
          <stop offset="0.3" stopColor="#D9D4CC" />
          <stop offset="0.42" stopColor="#FFFFFF" />
          <stop offset="0.52" stopColor="#968F85" />
          <stop offset="0.62" stopColor="#4E4943" />
          <stop offset="0.72" stopColor="#C4BDB3" />
          <stop offset="0.86" stopColor="#F7F4EF" />
          <stop offset="1" stopColor="#8A8379" />
        </linearGradient>
        <linearGradient id="o-ring-shine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="0.25" stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="0.65" stopColor="#FFFFFF" stopOpacity="0.25" />
          <stop offset="0.85" stopColor="#FFFFFF" stopOpacity="0.95" />
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

        <clipPath id="o-clip-core">
          <circle {...CORE} />
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

      {/* Large marble sphere */}
      <circle {...CORE} fill="url(#o-core)" />
      <g clipPath="url(#o-clip-core)">
        {/* pattern square covers the sphere; rotated so the veins run diagonally */}
        <rect
          x="25"
          y="45"
          width="520"
          height="520"
          transform="rotate(-32 285 305)"
          fill="url(#o-core-veins)"
          filter="url(#o-core-marble)"
        />
        <circle {...CORE} fill="url(#o-core-shadow)" />
        <circle {...CORE} fill="url(#o-core-bounce)" />
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
        {/* tighter gloss on top, for a polished finish */}
        <ellipse
          cx="352"
          cy="205"
          rx="28"
          ry="15"
          transform="rotate(-32 352 205)"
          fill="#FFFFFF"
          opacity="0.55"
          filter="url(#o-blur-md)"
        />
      </g>

      {/* tall ring: front half passes over the large sphere, behind the glass */}
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
        {/* crisp hotspot inside the soft highlight */}
        <ellipse
          cx="436"
          cy="165"
          rx="4"
          ry="2.4"
          transform="rotate(-25 436 165)"
          fill="#fff"
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
        {/* bright rim where the ball reflects the lit floor */}
        <path
          d="M424.6 196 A29 29 0 0 0 475.4 196"
          stroke="#FFF6EA"
          strokeOpacity="0.8"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
          filter="url(#o-blur-sm)"
        />
      </g>

      {/* Smoked glass */}
      <circle {...GLASS} fill="url(#o-glass)" fillOpacity="0.96" />
      <g clipPath="url(#o-clip-glass)">
        {/* light transmitted through the glass gathers at the bottom */}
        <circle {...GLASS} fill="url(#o-glass-caustic)" />
        {/* warm reflection of the large sphere on the right */}
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
