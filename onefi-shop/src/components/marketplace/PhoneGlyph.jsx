function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16)
  let r = (n >> 16) + amt
  let g = ((n >> 8) & 0xff) + amt
  let b = (n & 0xff) + amt
  r = Math.max(Math.min(255, r), 0)
  g = Math.max(Math.min(255, g), 0)
  b = Math.max(Math.min(255, b), 0)
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export default function PhoneGlyph({ colorHex = '#4a1fc4', size = 120 }) {
  const dark = shade(colorHex, -40)
  const screenA = colorHex
  const screenB = shade(colorHex, -60)
  const gradId = `pg-${colorHex.replace('#', '')}`

  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradId} x1="20" y1="20" x2="120" y2="150" gradientUnits="userSpaceOnUse">
          <stop stopColor={screenA} />
          <stop offset="1" stopColor={screenB} />
        </linearGradient>
      </defs>
      {/* back panel */}
      <rect x="8" y="18" width="72" height="128" rx="16" fill={dark} transform="rotate(-8 44 82)" />
      <circle cx="34" cy="46" r="13" fill="none" stroke={shade(dark, 40)} strokeWidth="1.5" transform="rotate(-8 44 82)" />
      <circle cx="30" cy="42" r="4.2" fill={shade(dark, 60)} transform="rotate(-8 44 82)" />
      <circle cx="40" cy="42" r="4.2" fill={shade(dark, 60)} transform="rotate(-8 44 82)" />
      <circle cx="35" cy="52" r="4.2" fill={shade(dark, 60)} transform="rotate(-8 44 82)" />
      {/* front panel */}
      <rect x="58" y="14" width="70" height="132" rx="16" fill="#101018" transform="rotate(6 93 80)" />
      <rect x="62" y="20" width="62" height="120" rx="12" fill={`url(#${gradId})`} transform="rotate(6 93 80)" />
      <g transform="rotate(6 93 80)">
        <text x="70" y="42" fontFamily="Manrope, sans-serif" fontSize="11" fontWeight="700" fill="#fff" opacity="0.95">
          9:41
        </text>
        <circle cx="118" cy="34" r="2.4" fill="#fff" opacity="0.7" />
        <rect x="70" y="118" width="34" height="3" rx="1.5" fill="#fff" opacity="0.5" />
      </g>
    </svg>
  )
}
