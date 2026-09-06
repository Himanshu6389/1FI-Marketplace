import { useMemo, useState } from 'react'
import PhoneGlyph from './PhoneGlyph.jsx'
import EmiPlanCard from './EmiPlanCard.jsx'
import PlanConfirmedModal from './PlanConfirmedModal.jsx'
import { computeEmiPlans, formatInr } from '../../utils/emi.js'

function makeSku(product, storage, color) {
  const brandCode = product.name.replace(/[^A-Za-z0-9]/g, '').slice(0, 4).toUpperCase()
  const storageCode = storage.label.replace(/[^A-Za-z0-9]/g, '')
  const colorCode = color.name.slice(0, 4).toUpperCase()
  return `${brandCode}-${storageCode}-${colorCode}`
}

function makeReference() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const part = (n) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `${part(3)}${Math.floor(Math.random() * 10)}-${part(4)}${part(2)}`
}

export default function ProductDetail({ product, onBack }) {
  const [colorIndex, setColorIndex] = useState(0)
  const [storageIndex, setStorageIndex] = useState(0)
  const [selectedMonths, setSelectedMonths] = useState(null)
  const [confirmation, setConfirmation] = useState(null)

  const color = product.colors[colorIndex]
  const storage = product.storageOptions[storageIndex]
  const mrp = Math.round(storage.price / (1 - product.discountPercent / 100))
  const savings = mrp - storage.price

  const plans = useMemo(() => {
    const base = computeEmiPlans(storage.price)
    // mark the longest tenure temporarily unavailable for the top storage tier, for flavor/realism
    if (storageIndex === product.storageOptions.length - 1 && base.length > 1) {
      return base.map((p, i) => (i === base.length - 1 ? { ...p, available: false } : p))
    }
    return base
  }, [storage.price, storageIndex, product.storageOptions.length])

  const availablePlans = plans.filter((p) => p.available !== false)
  const noCostFrom = availablePlans.filter((p) => p.noCost).sort((a, b) => a.months - b.months)[0]
  const selectedPlan = plans.find((p) => p.months === selectedMonths) || null

  const handleSelectColor = (i) => {
    setColorIndex(i)
  }
  const handleSelectStorage = (i) => {
    setStorageIndex(i)
    setSelectedMonths(null)
  }

  const handleProceed = () => {
    if (!selectedPlan) return
    setConfirmation({ reference: makeSku(product, storage, color) + '-' + makeReference().slice(0, 4) })
  }

  return (
    <div className="product-detail">
      <div className="pd-topbar">
        <button className="pd-back" onClick={onBack} aria-label="Back to marketplace">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="pd-topbar-title">{product.name}</span>
      </div>

      <div className="pd-scroll">
        <div className="pd-media">
          <span className="product-card-badge">{product.badge}</span>
          <span className="product-card-off">{product.discountPercent}% off</span>
          <PhoneGlyph colorHex={color.hex} size={168} />
        </div>

        <div className="pd-thumbs">
          {product.colors.map((c, i) => (
            <button
              key={c.name}
              className={`pd-thumb${i === colorIndex ? ' active' : ''}`}
              style={{ background: c.hex }}
              onClick={() => handleSelectColor(i)}
              aria-label={c.name}
            />
          ))}
        </div>

        <div className="pd-info">
          <span className="pd-brand">{product.brand}</span>
          <h1 className="pd-name">{product.name}</h1>
          <p className="pd-tagline">{product.tagline}</p>

          <div className="product-card-rating pd-rating">
            <span className="stars">{'\u2605'.repeat(Math.round(product.rating))}{'\u2606'.repeat(5 - Math.round(product.rating))}</span>
            <span className="rating-num">{product.rating}</span>
            <span className="rating-count">{product.ratingsCount} ratings \u00b7 {product.reviewsCount} reviews \u00b7 Launched {product.launched}</span>
          </div>

          <div className="pd-price-row">
            <span className="price-now pd-price-now">{formatInr(storage.price)}</span>
            <span className="price-mrp">{formatInr(mrp)}</span>
            <span className="price-save">{product.discountPercent}% off</span>
          </div>
          <div className="pd-price-sub">You save {formatInr(savings)} on MRP \u00b7 Inclusive of all taxes</div>
          <div className="pd-stock">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            In stock \u00b7 SKU {makeSku(product, storage, color)}
          </div>

          <div className="pd-field">
            <span className="pd-field-label">Finish \u00b7 {color.name}</span>
            <div className="pd-color-row">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  className={`pd-color-swatch${i === colorIndex ? ' active' : ''}`}
                  style={{ background: c.hex }}
                  onClick={() => handleSelectColor(i)}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          <div className="pd-field">
            <span className="pd-field-label">Storage</span>
            <div className="pd-storage-row">
              {product.storageOptions.map((s, i) => (
                <button
                  key={s.label}
                  className={`pd-storage-card${i === storageIndex ? ' active' : ''}`}
                  onClick={() => handleSelectStorage(i)}
                >
                  <strong>{s.label}</strong>
                  <span>{formatInr(s.price)} \u00b7 {s.ramLabel}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pd-field">
            <div className="pd-plans-head">
              <span className="pd-field-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="5" width="16" height="14" rx="2" />
                  <path d="M4 10h16" />
                </svg>{' '}
                Choose an EMI plan
              </span>
              <span className="pd-plans-sub">
                {availablePlans.length} of {plans.length} available
                {noCostFrom ? ` \u00b7 no-cost from ${noCostFrom.months} months` : ''}
              </span>
            </div>

            <div className="emi-plan-grid">
              {plans.map((plan) => (
                <EmiPlanCard
                  key={plan.months}
                  plan={plan}
                  selected={selectedMonths === plan.months}
                  onSelect={setSelectedMonths}
                />
              ))}
            </div>
          </div>

          {selectedPlan && (
            <div className="pd-summary">
              <div className="pd-summary-head">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="5" width="16" height="14" rx="2" />
                  <path d="M4 10h16" />
                </svg>
                <span>Your plan \u00b7 {selectedPlan.months} months</span>
              </div>
              <div className="pd-summary-amount">
                {formatInr(selectedPlan.monthly)}<span>/month</span>
              </div>
              <p className="pd-summary-note">
                Final instalment {formatInr(selectedPlan.finalInstallment)} \u2014 the last payment absorbs rounding so the total matches exactly.
              </p>
              <div className="pd-summary-rows">
                <div className="modal-row">
                  <span>Item price</span>
                  <strong>{formatInr(storage.price)}</strong>
                </div>
                <div className="modal-row">
                  <span>Interest ({selectedPlan.rate}%)</span>
                  <strong>{selectedPlan.interestAmount ? formatInr(selectedPlan.interestAmount) : 'None'}</strong>
                </div>
                <div className="modal-row">
                  <span>Processing fee</span>
                  <strong>{selectedPlan.fee ? formatInr(selectedPlan.fee) : 'None'}</strong>
                </div>
                <div className="modal-row modal-total">
                  <span>Total payable</span>
                  <strong>{formatInr(selectedPlan.total)}</strong>
                </div>
              </div>
              {selectedPlan.noCost && (
                <p className="pd-summary-nocost">This plan costs exactly {formatInr(storage.price)} \u2014 the same as paying upfront.</p>
              )}

              <button className="pd-proceed-btn" onClick={handleProceed}>
                Proceed with selected plan \u2192
              </button>
              <p className="pd-proceed-note">Your selection is re-priced and confirmed on the server. Illustrative terms \u2014 not a credit offer.</p>
            </div>
          )}

          <div className="pd-trust-row">
            <span>\ud83d\udee1\ufe0f 1 year warranty</span>
            <span>\u21a9\ufe0f 7-day returns</span>
            <span>\ud83d\udd01 7-day replacement</span>
            <span>\ud83e\uddfe GST invoice</span>
            <span>\ud83d\udcb5 Cash on delivery</span>
          </div>
        </div>
      </div>

      {confirmation && selectedPlan && (
        <PlanConfirmedModal
          product={product}
          storage={storage}
          color={color}
          plan={selectedPlan}
          reference={confirmation.reference}
          onClose={() => setConfirmation(null)}
        />
      )}
    </div>
  )
}
