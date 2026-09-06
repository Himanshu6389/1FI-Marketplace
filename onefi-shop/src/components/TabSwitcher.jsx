const TABS = [
  { id: 'topBrands', label: 'Top Brands' },
  { id: 'nearbyStores', label: 'Nearby Stores' },
  { id: 'marketplace', label: '1Fi Marketplace' },
]

export default function TabSwitcher({ active, onChange }) {
  return (
    <nav className="tab-wrap" role="tablist" aria-label="Shop sections">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          className={`tab-btn${active === tab.id ? ' active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          <span className="dot" />
        </button>
      ))}
    </nav>
  )
}
