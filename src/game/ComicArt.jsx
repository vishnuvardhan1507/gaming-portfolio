import React from 'react';

// Lightweight suit-inspired vector artwork, shared by the mission cards.
export function WebPattern() {
  return (
    <svg className="card-web" viewBox="0 0 400 300" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.1">
        <path d="M400 0 0 300M400 0 0 100M400 0 110 300M400 0 270 300M400 0 380 300M400 0 0 0" />
        {[45, 95, 160, 240, 340, 460].map((r) => (
          <path
            key={r}
            d={`M${400 - r} 0 Q${400 - r * 0.85} ${r * 0.2} ${400 - r * 0.97} ${r * 0.24} Q${400 - r * 0.55} ${r * 0.22} ${400 - r * 0.8} ${r * 0.6} Q${400 - r * 0.44} ${r * 0.4} ${400 - r * 0.55} ${r * 0.82} Q${400 - r * 0.24} ${r * 0.58} ${400 - r * 0.29} ${r * 0.96} Q${400 - r * 0.06} ${r * 0.7} 400 ${r}`}
          />
        ))}
      </g>
    </svg>
  );
}

export function MaskArt() {
  return (
    <svg className="mask-art" viewBox="0 0 220 260" fill="none" aria-hidden="true">
      <path
        d="M110 10C31 10 18 78 31 143c8 43 49 105 79 107 30-2 71-64 79-107C202 78 189 10 110 10Z"
        fill="#e22236"
        stroke="#070d29"
        strokeWidth="7"
      />
      <g stroke="#650f25" strokeWidth="2.5">
        <path d="M110 12v235M110 130 45 40m65 90L176 40M110 130 28 90m82 40 82-40M110 130 43 173m67-43 67 43M110 130 72 221m38-91 38 91" />
        <path d="M65 30q45 27 90 0M39 60q71 43 142 0M29 101q81 42 162 0M31 141q79 55 158 0M48 181q62 43 124 0M76 220q34 18 68 0" />
      </g>
      <path
        d="m39 91 60 34c0 26-12 43-26 31-19-15-27-34-34-65Zm142 0-60 34c0 26 12 43 26 31 19-15 27-34 34-65Z"
        fill="white"
        stroke="#070d29"
        strokeWidth="9"
        strokeLinejoin="round"
      />
    </svg>
  );
}
