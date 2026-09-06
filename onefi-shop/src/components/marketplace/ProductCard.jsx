import PhoneGlyph from './PhoneGlyph.jsx'
import { computeEmiPlans, cheapestNoCostFrom, maxCashback, lowestMonthly, formatInr } from '../../utils/emi.js'

export default function ProductCard({ product, onOpen }) {
  const basePrice = product.storageOptions[0].price
  const mrp = Math.round(basePrice / (1 - product.discountPercent / 100))
  const savings = mrp - basePrice
  const plans = computeEmiPlans(basePrice)
  const noCostPlan = cheapestNoCostFrom(plans)
  const cashback = maxCashback(plans)
  const fromMonthly = lowestMonthly(plans)
  const maxTenure = plans[plans.length - 1].months

  return (
    <button className="product-card" onClick={() => onOpen(product.id)}>
      <div className="product-card-media">
        <span className="product-card-badge">{product.badge}</span>
        <span className="product-card-off">{product.discountPercent}% off</span>
        <PhoneGlyph colorHex={product.colors[0].hex} size={92} />
      </div>

      <div className="product-card-body">
        <span className="product-card-brand">{product.brand}</span>
        <h3 className="product-card-name">{product.name}</h3>

        <div className="product-card-rating">
          <span className="stars">{'\u2605'.repeat(Math.round(product.rating))}{'\u2606'.repeat(5 - Math.round(product.rating))}</span>
          <span className="rating-num">{product.rating}</span>
          <span className="rating-count">{product.ratingsCount} ratings \u00b7 {product.reviewsCount} reviews</span>
        </div>

        <div className="product-card-price">
          <span className="price-now">{formatInr(basePrice)}</span>
          <span className="price-mrp">{formatInr(mrp)}</span>
          <span className="price-save">Save {formatInr(savings)}</span>
        </div>

        <div className="product-card-emi">
          <span className="emi-icon" aria-hidden="true">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="5" width="16" height="14" rx="2" />
              <path d="M4 10h16" />
            </svg>
          </span>
          EMI from {formatInr(fromMonthly)} /mo
        </div>
        <div className="product-card-meta">{plans.length} plans \u00b7 up to {maxTenure} months</div>
        {noCostPlan && (
          <div className="product-card-cashback">
            No-cost EMI \u00b7 {formatInr(cashback)} cashback
          </div>
        )}

        <div className="product-card-foot">
          <span className="color-dots">
            {product.colors.map((c) => (
              <span key={c.name} className="dot" style={{ background: c.hex }} />
            ))}
          </span>
          <span className="option-count">{product.storageOptions.length} options \u00b7 {product.storageOptions[0].label} - {product.storageOptions[product.storageOptions.length - 1].label}</span>
        </div>

        <div className="product-card-bottom">
          <span className="in-stock">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            In stock
          </span>
          <span className="view-plans">View EMI plans</span>
        </div>
      </div>
    </button>
  )
}
