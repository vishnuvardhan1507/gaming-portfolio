import React from 'react';
export function Spider() {
  return (
    <svg viewBox="0 0 100 110" fill="none" aria-hidden="true">
      <path
        d="m50 34-7 14 7 34 7-34zM43 43 26 30 16 6M57 43l17-13L84 6M43 49 17 39 7 20M57 49l26-10 10-19M43 55 20 66 9 94M57 55l23 11 11 28M46 65 32 85l-2 22M54 65l14 20 2 22"
        stroke="currentColor"
        strokeWidth="5"
      />
      <ellipse cx="50" cy="28" rx="6" ry="9" fill="currentColor" />
    </svg>
  );
}
export function Hero() {
  return (
    <svg className="hero-figure" viewBox="0 0 600 800" fill="none" aria-hidden="true">
      <defs>
        <linearGradient
          id="suit"
          x1="100"
          y1="200"
          x2="460"
          y2="720"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#393d4c" />
          <stop offset=".45" stopColor="#12151e" />
          <stop offset="1" stopColor="#03050b" />
        </linearGradient>
      </defs>
      <path
        d="m239 425-57 163-71 181 81 25 109-205 33-8 44 201 95-20-30-253-41-97z"
        fill="url(#suit)"
        stroke="#444655"
        strokeWidth="2"
      />
      <path
        d="m230 258-70 49-56 139-65 119 51 28 97-124 30-69 17 134 168 1 11-145 42 82 63 88 45-32-56-136-50-101-73-32z"
        fill="url(#suit)"
        stroke="#5a3c4a"
        strokeWidth="2"
      />
      <path d="m238 255-61 55 24 97 34 20 9-141m115-31 53 54-18 108-37 18-13-151" fill="#9d142e" />
      <path
        d="M239 198c-14-91 105-118 129-29l-5 65-40 47-40-5-36-30z"
        fill="url(#suit)"
        stroke="#ec3151"
        strokeWidth="3"
      />
      <path
        d="m246 183 41 22-11 35-18-16zm107-4-45 26 10 33 21-15z"
        fill="#fff"
        stroke="#ef2547"
        strokeWidth="7"
      />
      <path
        d="m298 119-3 81 7 69M244 166l114-9M247 195l111-12M258 235l92-17M267 131l13 57m48-63-13 62"
        stroke="#a52b44"
        strokeWidth="1.5"
      />
      <g transform="translate(245 291) scale(1.1)" color="#f52242">
        <path
          d="m50 34-7 14 7 34 7-34zM43 43 26 30 16 6M57 43l17-13L84 6M43 49 17 39 7 20M57 49l26-10 10-19M43 55 20 66 9 94M57 55l23 11 11 28M46 65 32 85l-2 22M54 65l14 20 2 22"
          stroke="currentColor"
          strokeWidth="5"
        />
        <ellipse cx="50" cy="28" rx="6" ry="9" fill="currentColor" />
      </g>
      <path
        d="m39 565-16 31 12 34 17-8 15-26 23-3-17-39zm479-25 17 39 21 16 15-14-8-28-5-25"
        fill="#ac1835"
        stroke="#fb3152"
        strokeWidth="2"
      />
      <path
        d="m182 588-22 78m-33 74-16 29 81 25 19-38m167 26 95-20-5-29-98 20"
        stroke="#c32240"
        strokeWidth="12"
      />
    </svg>
  );
}
export default function Scene({ start }) {
  if (start)
    return (
      <div className="portrait-scene" aria-hidden="true">
        <img src="/assets/hero-portrait.png" alt="" fetchPriority="high" />
        <div className="portrait-shade" />
      </div>
    );
  return (
    <div className="city-scene" aria-hidden="true">
      <svg className="city-svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="night" x2="0" y2="1">
            <stop stopColor="#111828" />
            <stop offset="1" stopColor="#3e1525" />
          </linearGradient>
          <pattern id="windows" width="27" height="32" patternUnits="userSpaceOnUse">
            <rect x="8" y="10" width="6" height="11" fill="#dab778" opacity=".35" />
            <rect x="19" y="10" width="4" height="11" fill="#7b91b1" opacity=".18" />
          </pattern>
        </defs>
        <rect width="1600" height="1000" fill="url(#night)" />
        <circle cx="1180" cy="220" r="90" fill="#bcc7de" opacity=".07" />
        {Array.from({ length: 24 }, (_, i) => {
          const h = 180 + ((i * 97) % 350),
            x = i * 76 - 80;
          return (
            <g key={i}>
              <rect
                x={x}
                y={750 - h}
                width="67"
                height={h + 250}
                fill={i % 2 ? '#121b29' : '#172131'}
              />
              <rect x={x + 2} y={755 - h} width="63" height={h} fill="url(#windows)" />
              <path d={`M${x + 30} ${750 - h}v-25`} stroke="#34364a" />
            </g>
          );
        })}
        <path d="M0 890 650 830l470 170H0z" fill="#090e18" />
        <g fill="#0b111e" stroke="#343046">
          <path d="M0 520h180v480H0zM190 695h135v305H190zM1220 565h155v435h-155zM1390 390h210v610h-210z" />
        </g>
        <path
          d="M0 523h180v470H0zm1220 43h155v435h-155zm170-174h210v610h-210z"
          fill="url(#windows)"
        />
        <path d="M0 953h1600M900 876l490 124M460 852 30 1000" stroke="#5b3240" strokeWidth="2" />
        <path className="traffic" d="M270 856h40m820 78h40" stroke="#f64556" strokeWidth="3" />
      </svg>
      <div className="city-vignette" />
      {start && <Hero />}
    </div>
  );
}
export function Glove() {
  return (
    <svg className="web-glove" viewBox="0 0 300 250" fill="none" aria-hidden="true">
      <path
        d="m22 260 91-134 18-31 12-56 16-13 10 13-6 59 14-12 16-45 17-3 7 13-14 69 22-22 13 4 1 17-41 70-24 26-18 45z"
        fill="#171c29"
        stroke="#e62647"
        strokeWidth="3"
      />
      <path d="m106 159 52 39-16 52H48z" fill="#b51c38" />
      <path
        d="m127 116 57 40m-60-16 41 34m-53-17 45 39m-71-4 51 32m-17-62-48 86m71-70-38 68"
        stroke="#541124"
        strokeWidth="2"
      />
      <ellipse cx="155" cy="137" rx="14" ry="8" fill="#dddce7" stroke="#ef294a" strokeWidth="4" />
    </svg>
  );
}
