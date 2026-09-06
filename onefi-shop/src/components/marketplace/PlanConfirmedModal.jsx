import { useState } from 'react'
import { formatInr } from '../../utils/emi.js'

export default function PlanConfirmedModal({ product, storage, color, plan, reference, onClose }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reference)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable, ignore silently
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          \u2715
        </button>

        <div className="modal-header">
          <span className="modal-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <h3>Plan confirmed</h3>
          <p>{product.name} \u00b7 {storage.label} \u00b7 {storage.ramLabel} \u00b7 {color.name}</p>
        </div>

        <div className="modal-ref">
          <span>{reference}</span>
          <button onClick={handleCopy}>{copied ? 'Copied' : 'Copy'}</button>
        </div>

        <div className="modal-body">
          <div className="modal-plan-title">
            {plan.noCost ? 'No Cost EMI' : `${plan.rate}% interest`} \u00b7 {plan.months} months at {plan.rate}% interest
          </div>

          <div className="modal-row">
            <span>Monthly instalment</span>
            <strong>{formatInr(plan.monthly)}</strong>
          </div>
          <div className="modal-row">
            <span>Final instalment</span>
            <strong>{formatInr(plan.finalInstallment)}</strong>
          </div>
          <div className="modal-row">
            <span>Item price</span>
            <strong>{formatInr(storage.price)}</strong>
          </div>
          <div className="modal-row">
            <span>Interest</span>
            <strong>{plan.interestAmount ? formatInr(plan.interestAmount) : 'None'}</strong>
          </div>
          <div className="modal-row">
            <span>Processing fee</span>
            <strong>{plan.fee ? formatInr(plan.fee) : 'None'}</strong>
          </div>
          <div className="modal-row modal-total">
            <span>Total payable</span>
            <strong>{formatInr(plan.total)}</strong>
          </div>

          <p className="modal-disclaimer">
            Quoted by 1Fi Credit (illustrative). This is a demo quote for demonstration only \u2014 not a credit offer and not the terms of any financial institution.
          </p>
        </div>

        <button className="modal-back-btn" onClick={onClose}>
          Back to product
        </button>
      </div>
    </div>
  )
}
