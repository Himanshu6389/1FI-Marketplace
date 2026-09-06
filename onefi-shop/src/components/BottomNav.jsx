const ITEMS = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <path d="M4 11.5 12 5l8 6.5M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9" />
    ),
  },
  {
    id: 'shop',
    label: 'Shop',
    icon: (
      <>
        <path d="M4 9h16l-1 11H5L4 9Z" />
        <path d="M8 9V7a4 4 0 0 1 8 0v2" />
      </>
    ),
  },
  {
    id: 'emi',
    label: 'EMI Dues',
    icon: (
      <>
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M9 9h6M9 13h6M9 17h3" />
      </>
    ),
  },
  {
    id: 'limit',
    label: 'Limit',
    icon: <path d="M4 18l5-6 4 4 7-9M20 7v5h-5" />,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c1.2-4 4-6 7-6s5.8 2 7 6" />
      </>
    ),
  },
]

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {ITEMS.map((item) => (
        <button
          key={item.id}
          className={`nav-item${active === item.id ? ' active' : ''}`}
          onClick={() => onChange(item.id)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            {item.icon}
          </svg>
          {item.label}
        </button>
      ))}
    </nav>
  )
}
