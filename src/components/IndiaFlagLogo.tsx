import React from 'react';

interface IndiaFlagLogoProps {
  className?: string;
  variant?: 'emblem' | 'flag' | 'badge';
  showText?: boolean;
}

/**
 * Authentic, beautiful Indian National Flag (Tiranga) vector logo.
 * - Saffron (Kesari): #FF9933
 * - White: #FFFFFF
 * - India Green: #138808
 * - Navy Blue Ashoka Chakra: #000080 with 24 radial spokes
 */
export const IndiaFlagLogo: React.FC<IndiaFlagLogoProps> = ({
  className = 'w-9 h-9',
  variant = 'emblem'
}) => {
  // 24 Ashoka Chakra spokes
  const renderChakra = (cx: number, cy: number, r: number) => {
    const hubR = r * 0.18;
    const rimR = r * 0.95;
    return (
      <g>
        {/* Outer Wheel Rim */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#000080" strokeWidth={r * 0.09} />
        {/* Inner Hub */}
        <circle cx={cx} cy={cy} r={hubR} fill="#000080" />
        {/* Hub Accent Circle */}
        <circle cx={cx} cy={cy} r={hubR * 1.5} fill="none" stroke="#000080" strokeWidth={r * 0.03} />
        {/* 24 Spokes (15 deg interval) */}
        {Array.from({ length: 24 }, (_, i) => {
          const angle = (i * 15 * Math.PI) / 180;
          const x1 = cx + hubR * Math.cos(angle);
          const y1 = cy + hubR * Math.sin(angle);
          const x2 = cx + rimR * Math.cos(angle);
          const y2 = cy + rimR * Math.sin(angle);
          return (
            <line
              key={`spoke-${i}`}
              x1={x1.toFixed(2)}
              y1={y1.toFixed(2)}
              x2={x2.toFixed(2)}
              y2={y2.toFixed(2)}
              stroke="#000080"
              strokeWidth={r * 0.05}
              strokeLinecap="round"
            />
          );
        })}
      </g>
    );
  };

  if (variant === 'flag') {
    return (
      <div className={`relative overflow-hidden rounded-md border border-slate-300 shadow-sm inline-flex shrink-0 select-none ${className}`}>
        <svg
          viewBox="0 0 90 60"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="National Flag of India"
        >
          {/* Top: Saffron */}
          <rect x="0" y="0" width="90" height="20" fill="#FF9933" />
          {/* Middle: White */}
          <rect x="0" y="20" width="90" height="20" fill="#FFFFFF" />
          {/* Bottom: India Green */}
          <rect x="0" y="40" width="90" height="20" fill="#138808" />
          {/* Ashoka Chakra in Center */}
          {renderChakra(45, 30, 8.5)}
        </svg>
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div className={`relative overflow-hidden rounded-xl border border-slate-200/90 shadow-sm inline-flex shrink-0 select-none ${className}`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Indian Flag Badge"
        >
          <rect x="0" y="0" width="100" height="33.33" fill="#FF9933" />
          <rect x="0" y="33.33" width="100" height="33.34" fill="#FFFFFF" />
          <rect x="0" y="66.67" width="100" height="33.33" fill="#138808" />
          {renderChakra(50, 50, 13)}
        </svg>
      </div>
    );
  }

  // Default: Elegant Circular Indian National Emblem with polished ring
  return (
    <div className={`relative overflow-hidden rounded-full border border-slate-200 shadow-md inline-flex shrink-0 select-none ${className} ring-2 ring-slate-100 hover:ring-blue-400 transition-all`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Indian Tricolour Emblem"
      >
        {/* Clip to circle */}
        <defs>
          <clipPath id="circle-clip">
            <circle cx="50" cy="50" r="49" />
          </clipPath>
        </defs>

        <g clipPath="url(#circle-clip)">
          {/* Saffron Band */}
          <rect x="0" y="0" width="100" height="33.33" fill="#FF9933" />
          {/* White Band */}
          <rect x="0" y="33.33" width="100" height="33.34" fill="#FFFFFF" />
          {/* India Green Band */}
          <rect x="0" y="66.67" width="100" height="33.33" fill="#138808" />

          {/* Ashoka Chakra in Center */}
          {renderChakra(50, 50, 13.5)}
        </g>

        {/* Outer Circular Rim */}
        <circle cx="50" cy="50" r="48.5" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
      </svg>
    </div>
  );
};
