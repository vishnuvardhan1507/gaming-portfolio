import React from 'react';

// Vector adaptations of the supplied visual references, not extracted bitmap assets.
export function DroneArtwork() {
  return (
    <svg className="drone-art" viewBox="0 0 180 140" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="droneArmor" x2=".6" y2="1">
          <stop stopColor="#ff6865" />
          <stop offset=".45" stopColor="#b8313e" />
          <stop offset="1" stopColor="#591523" />
        </linearGradient>
      </defs>
      <path
        d="m26 81 13 40 24 2 15-27m38-4 11 29 23-7 10-40"
        fill="#202837"
        stroke="#a4abb6"
        strokeWidth="2"
      />
      <path
        d="M13 40 45 16 131 11l37 24-6 59-43 17-67-3-40-27z"
        fill="url(#droneArmor)"
        stroke="#181d2a"
        strokeWidth="3"
      />
      <path
        d="m45 16 17 58 48 25 21-88M13 40l49 34M110 99l58-64"
        stroke="#fc8384"
        strokeOpacity=".7"
        strokeWidth="2"
      />
      <path d="m58 40 28 10 17 37 5 23-24-9-22-25z" fill="#8c2734" stroke="#dc7773" />
      <path
        d="m31 24 18 5 8 18-18-5zm97-6 22 10-7 9-22-7zM79 13l23 0 4 10-27-1z"
        fill="#232632"
        stroke="#878d99"
      />
      <path d="m18 58 17 6v18l-17-8m132-13 12-7-3 29-12 6" stroke="#cda965" strokeWidth="4" />
      <path d="m24 85 24 7m73 1 27-10" stroke="#92e2fa" strokeWidth="4" strokeLinecap="round" />
      <path d="m58 87-8 30m74-34 9 28" stroke="#151b24" strokeWidth="11" />
      <circle cx="48" cy="119" r="12" fill="#121823" stroke="#94a0ac" strokeWidth="3" />
      <circle cx="48" cy="119" r="6" fill="#6fc4e5" />
      <circle cx="135" cy="114" r="12" fill="#121823" stroke="#94a0ac" strokeWidth="3" />
      <circle cx="135" cy="114" r="6" fill="#6fc4e5" />
      <rect x="92" y="53" width="13" height="29" rx="3" fill="#141b26" stroke="#caaa6f" />
      <circle cx="98" cy="61" r="3" fill="#8fe4f2" />
      <circle cx="98" cy="73" r="3" fill="#73a0bd" />
      <path d="m68 27 8 2m35 9 11 2m-50 59 9 3M23 46l9 3" stroke="#291c25" strokeWidth="2" />
    </svg>
  );
}

export function ReferenceGlove() {
  return (
    <svg className="web-glove reference-glove" viewBox="0 0 240 300" fill="none" aria-hidden="true">
      <defs>
        <linearGradient
          id="redGlove"
          x1="40"
          y1="10"
          x2="170"
          y2="270"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e85155" />
          <stop offset=".6" stopColor="#b52d40" />
          <stop offset="1" stopColor="#6f1d30" />
        </linearGradient>
        <clipPath id="gloveShape">
          <path d="M55 283 46 213l-10-56 2-40-8-72 4-23 12-5 8 7 11 72 8 24 13-17 19 1 13 9 8-66 9-36 15-1 9 9-3 83-5 49 19-8 24-27 20-7 13 7 5 13-12 17-40 35-35 22-14 36 10 57-36 8z" />
        </clipPath>
      </defs>
      <path
        d="M55 283 46 213l-10-56 2-40-8-72 4-23 12-5 8 7 11 72 8 24 13-17 19 1 13 9 8-66 9-36 15-1 9 9-3 83-5 49 19-8 24-27 20-7 13 7 5 13-12 17-40 35-35 22-14 36 10 57-36 8z"
        fill="url(#redGlove)"
        stroke="#151521"
        strokeWidth="3"
      />
      <g clipPath="url(#gloveShape)" stroke="#401b29" strokeWidth="1.6">
        <path d="M41 15 63 113 66 180 86 286M145 10l-4 115-26 64-11 99M58 100l32 32 8 54 24 95M179 150l-73 58M49 214l171-96M39 134l77 61M45 164l67 38M50 251l79-31M48 276l90-31" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
          <path key={i} d={`M23 ${25 + i * 23}q58 28 104 0t117-7`} />
        ))}
      </g>
      <path
        d="m72 118 4 46 16 13 15-6-1-53m1-5 10 6 4 40-14 12"
        fill="#bf3948"
        stroke="#461e2b"
        strokeWidth="3"
      />
      <path
        d="m79 129 23-1m-22 12 24-1m-21 12 22 0m-18 11 18-1m4-32 11 0m-10 13 11-1m-11 13 11-1"
        stroke="#491d2a"
        strokeWidth="2"
      />
      <path d="m60 189 14 29m42-26 8 17m-56-40 18 17 17 2" stroke="#681e31" strokeWidth="3" />
      <path d="m87 215 9-1 2 20-4 9-5-6z" fill="#b9c4d6" stroke="#20212a" strokeWidth="2" />
      <path d="m88 219 9-1m-8 13 8-1" stroke="#626f84" />
      <circle className="web-emitter" cx="92" cy="217" r="3" fill="#fff" />
    </svg>
  );
}
