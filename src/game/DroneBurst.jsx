import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { DroneArtwork } from './Equipment';

export default function DroneBurst({ reduced }) {
  const [finished, setFinished] = useState(false);
  if (reduced)
    return (
      <span className="capture-net">
        <Check />
      </span>
    );
  if (finished) return null;
  return (
    <span
      className="drone-burst"
      aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setFinished(true);
      }}
    >
      <span className="blast-flash" />
      {Array.from({ length: 12 }, (_, i) => {
        const col = i % 4,
          row = Math.floor(i / 4);
        return (
          <span
            className="drone-fragment"
            key={i}
            style={{
              clipPath: `polygon(${col * 25}% ${row * 33.34}%, ${(col + 1) * 25}% ${row * 33.34}%, ${(col + 1) * 25}% ${(row + 1) * 33.34}%, ${col * 25}% ${(row + 1) * 33.34}%)`,
              '--scatter': `${(col - 1.5) * (48 + row * 18)}px`,
              '--lift': `${-45 - (i % 3) * 22}px`,
              '--fall': `${280 + row * 55}px`,
              '--spin': `${(i % 2 ? 1 : -1) * (120 + i * 29)}deg`,
            }}
          >
            <DroneArtwork />
          </span>
        );
      })}
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className="blast-smoke"
          style={{
            '--smoke-x': `${(i - 2) * 24}px`,
            '--smoke-y': `${-35 - (i % 3) * 20}px`,
            animationDelay: `${i * 35}ms`,
          }}
        />
      ))}
    </span>
  );
}
