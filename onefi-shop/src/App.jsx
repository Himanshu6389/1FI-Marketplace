import { useState } from 'react'
import HeroBanner from './components/HeroBanner.jsx'
import TabSwitcher from './components/TabSwitcher.jsx'
import SearchBar from './components/SearchBar.jsx'
import EmptyState from './components/EmptyState.jsx'
import BottomNav from './components/BottomNav.jsx'
import MarketplaceList from './components/marketplace/MarketplaceList.jsx'
import ProductDetail from './components/marketplace/ProductDetail.jsx'
import { getProductById } from './data/products.js'

const TAB_CONTENT = {
  topBrands: {
    heading: 'Top Brands',
    placeholder: 'Search online stores...',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9h16l-1 11H5L4 9Z" />
        <path d="M8 9V7a4 4 0 0 1 8 0v2" />
      </svg>
    ),
    title: 'No brands added yet',
    message: 'Top brands offering no-cost EMIs will show up here once they go live.',
  },
  nearbyStores: {
    heading: 'Nearby Stores',
    placeholder: 'Search nearby stores...',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
    title: 'No nearby stores found',
    message: 'Turn on location to discover partner stores near you offering no-cost EMIs.',
  },
  marketplace: {
    heading: '1Fi Marketplace',
    placeholder: 'Search 1Fi Marketplace...',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="8" width="16" height="12" rx="2" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        <path d="M4 13h16" />
      </svg>
    ),
    title: 'Marketplace is warming up',
    message: 'Exclusive deals curated by 1Fi will land here first. Check back soon.',
  },
}

export default function App() {
  const [activeTab, setActiveTab] = useState('topBrands')
  const [activeNav, setActiveNav] = useState('shop')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProductId, setSelectedProductId] = useState(null)
  const content = TAB_CONTENT[activeTab]

  const handleChangeTab = (tab) => {
    setActiveTab(tab)
    setSearchQuery('')
    setSelectedProductId(null)
  }

  const selectedProduct = selectedProductId ? getProductById(selectedProductId) : null

  if (activeTab === 'marketplace' && selectedProduct) {
    return (
      <div className="app-shell">
        <ProductDetail product={selectedProduct} onBack={() => setSelectedProductId(null)} />
        <BottomNav active={activeNav} onChange={setActiveNav} />
      </div>
    )
  }

  return (
    <div className="app-shell">
      <div className="app-scroll">
        <HeroBanner />
        <TabSwitcher active={activeTab} onChange={handleChangeTab} />
        <SearchBar placeholder={content.placeholder} value={searchQuery} onChange={setSearchQuery} />

        {activeTab === 'marketplace' ? (
          <MarketplaceList searchQuery={searchQuery} onOpenProduct={setSelectedProductId} />
        ) : (
          <section className="section">
            <h2 className="section-title">{content.heading}</h2>
            <EmptyState icon={content.icon} title={content.title} message={content.message} />
          </section>
        )}
      </div>

      <BottomNav active={activeNav} onChange={setActiveNav} />
    </div>
  )
}
