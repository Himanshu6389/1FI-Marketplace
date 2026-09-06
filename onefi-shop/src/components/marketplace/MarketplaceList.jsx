import { useMemo, useState } from 'react'
import { PRODUCTS, BRAND_FILTERS } from '../../data/products.js'
import FilterChips from './FilterChips.jsx'
import SortSelect from './SortSelect.jsx'
import ProductCard from './ProductCard.jsx'
import HowItWorks from './HowItWorks.jsx'
import EmiCalculator from './EmiCalculator.jsx'
import Faq from './Faq.jsx'

function sortProducts(list, sortBy) {
  const copy = [...list]
  switch (sortBy) {
    case 'price-low':
      return copy.sort((a, b) => a.storageOptions[0].price - b.storageOptions[0].price)
    case 'price-high':
      return copy.sort((a, b) => b.storageOptions[0].price - a.storageOptions[0].price)
    case 'rating':
      return copy.sort((a, b) => b.rating - a.rating)
    case 'newest':
    default:
      return copy.sort((a, b) => (Date.parse(b.launched) || 0) - (Date.parse(a.launched) || 0))
  }
}

export default function MarketplaceList({ searchQuery, onOpenProduct }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const counts = useMemo(() => {
    const c = { all: PRODUCTS.length }
    PRODUCTS.forEach((p) => {
      p.tags.forEach((t) => {
        c[t] = (c[t] || 0) + 1
      })
    })
    return c
  }, [])

  const filtered = useMemo(() => {
    let list = PRODUCTS
    if (activeFilter !== 'all') {
      list = list.filter((p) => p.tags.includes(activeFilter))
    }
    const q = searchQuery.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      )
    }
    return sortProducts(list, sortBy)
  }, [activeFilter, searchQuery, sortBy])

  return (
    <>
      <section className="section mp-list">
        <h2 className="section-title">Smartphones on EMI</h2>
        <p className="mp-list-sub">
          Every configuration lists its full EMI options \u2014 interest rate, processing fee, cashback and total payable \u2014 so you can compare the real cost of a plan, not just the monthly figure.
        </p>

        <FilterChips filters={BRAND_FILTERS} counts={counts} active={activeFilter} onChange={setActiveFilter} />

        <div className="mp-list-toolbar">
          <span className="mp-list-count">{filtered.length} product{filtered.length === 1 ? '' : 's'}</span>
          <SortSelect value={sortBy} onChange={setSortBy} />
        </div>

        {filtered.length === 0 ? (
          <p className="mp-list-empty">No products match your search or filters.</p>
        ) : (
          <div className="product-grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={onOpenProduct} />
            ))}
          </div>
        )}
      </section>

      <HowItWorks />
      <EmiCalculator />
      <Faq />
    </>
  )
}
