export default function Background() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="bg-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#071227" />
            <stop offset="100%" stopColor="#041026" />
          </linearGradient>
          <radialGradient id="soft-glow-1" cx="20%" cy="10%" r="60%">
            <stop offset="0%" stopColor="#0ea5a4" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#0ea5a4" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="soft-glow-2" cx="80%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
          <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="120" />
          </filter>
        </defs>

        <rect width="100%" height="100%" fill="url(#bg-grad-1)" />

        <g filter="url(#blur)">
          <circle cx="320" cy="120" r="260" fill="url(#soft-glow-1)" />
          <circle cx="1300" cy="720" r="360" fill="url(#soft-glow-2)" />
        </g>

        {/* subtle grain */}
        <rect width="100%" height="100%" fill="#000" opacity="0.02" />
      </svg>
    </div>
  );
}
