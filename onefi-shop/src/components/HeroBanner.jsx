export default function HeroBanner() {
  return (
    <section className="hero">
      <span className="hero-badge">✦ No-cost EMIs</span>

      <div className="hero-body">
        <div className="hero-copy">
          <h1 className="hero-title">
            Shop today,
            <em>pay later using</em>
            <span className="accent">mutual funds.</span>
          </h1>
          <p className="hero-sub">
            No credit score required. No interest. Backed by your investments.
          </p>
        </div>

        <div className="hero-art" aria-hidden="true">
          <svg viewBox="0 0 160 190" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* shopping bag */}
            <path d="M28 96h74l7 78a10 10 0 0 1-10 11H31a10 10 0 0 1-10-11l7-78Z" fill="#F2B441" />
            <path d="M44 96V78a21 21 0 0 1 42 0v18" stroke="#D99420" strokeWidth="6" strokeLinecap="round" />
            {/* laptop */}
            <rect x="70" y="18" width="52" height="34" rx="4" fill="#2B1665" />
            <rect x="74" y="22" width="44" height="26" rx="2" fill="url(#screenGrad)" />
            <path d="M64 52h64l4 8H60l4-8Z" fill="#3A1E86" />
            {/* phone */}
            <rect x="8" y="26" width="30" height="58" rx="7" fill="#1E0F52" />
            <rect x="11.5" y="32" width="23" height="44" rx="2" fill="url(#screenGrad2)" />
            {/* sparkles */}
            <circle cx="140" cy="14" r="2.5" fill="#fff" />
            <circle cx="150" cy="40" r="1.6" fill="#fff" />
            <circle cx="8" cy="10" r="1.8" fill="#fff" />
            <defs>
              <linearGradient id="screenGrad" x1="74" y1="22" x2="118" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F2B441" />
                <stop offset="1" stopColor="#8340F0" />
              </linearGradient>
              <linearGradient id="screenGrad2" x1="11" y1="32" x2="34" y2="76" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8340F0" />
                <stop offset="1" stopColor="#F2B441" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  )
}
