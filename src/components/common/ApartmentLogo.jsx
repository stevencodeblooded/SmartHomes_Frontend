export const ApartmentLogoNested = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="building1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#22c55e", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#15803d", stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="building2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#f59e0b", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#d97706", stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="building3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#ef4444", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#b91c1c", stopOpacity: 1 }} />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Background Circle */}
    <circle cx="100" cy="100" r="80" fill="#1e293b" opacity="0.1" />

    {/* Building 1 (Back) */}
    <rect
      x="50"
      y="80"
      width="35"
      height="90"
      fill="url(#building1)"
      rx="4"
      filter="url(#glow)"
    />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <rect
        key={i}
        x="55"
        y={90 + i * 13}
        width="10"
        height="8"
        fill="white"
        opacity="0.3"
        rx="1"
      />
    ))}
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <rect
        key={i}
        x="70"
        y={90 + i * 13}
        width="10"
        height="8"
        fill="white"
        opacity="0.3"
        rx="1"
      />
    ))}

    {/* Building 2 (Middle) */}
    <rect
      x="85"
      y="60"
      width="40"
      height="110"
      fill="url(#building2)"
      rx="4"
      filter="url(#glow)"
    />
    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
      <g key={i}>
        <rect
          x="92"
          y={70 + i * 13}
          width="10"
          height="8"
          fill="white"
          opacity="0.3"
          rx="1"
        />
        <rect
          x="108"
          y={70 + i * 13}
          width="10"
          height="8"
          fill="white"
          opacity="0.3"
          rx="1"
        />
      </g>
    ))}

    {/* Building 3 (Front) */}
    <rect
      x="115"
      y="50"
      width="35"
      height="120"
      fill="url(#building3)"
      rx="4"
      filter="url(#glow)"
    />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <g key={i}>
        <rect
          x="122"
          y={60 + i * 13}
          width="10"
          height="8"
          fill="white"
          opacity="0.3"
          rx="1"
        />
        <rect
          x="135"
          y={60 + i * 13}
          width="10"
          height="8"
          fill="white"
          opacity="0.3"
          rx="1"
        />
      </g>
    ))}

    {/* Foundation */}
    <rect
      x="45"
      y="172"
      width="110"
      height="5"
      fill="#0f172a"
      opacity="0.3"
      rx="2"
    />
  </svg>
);
