import { useState } from 'react'
import { computeEmiPlans, formatInr } from '../../utils/emi.js'

const PRESETS = [30000, 75000, 120000, 200000]

export default function EmiCalculator() {
  const [value, setValue] = useState(75000)
  const plans = computeEmiPlans(value)

  return (
    <section className="section mp-calc">
      <h2 className="section-title">EMI calculator</h2>
      <p className="mp-how-sub">Check what any order value works out to across every available tenure, before you pick a product.</p>

      <div className="mp-calc-value">
        <span className="mp-calc-amount">{formatInr(value)}</span>
        <input
          type="range"
          min={10000}
          max={250000}
          step={1000}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <div className="mp-calc-range-labels">
          <span>{formatInr(10000)}</span>
          <span>{formatInr(250000)}</span>
        </div>
      </div>

      <div className="mp-calc-presets">
        {PRESETS.map((p) => (
          <button
            key={p}
            className={`mp-calc-preset${value === p ? ' active' : ''}`}
            onClick={() => setValue(p)}
          >
            {formatInr(p)}
          </button>
        ))}
      </div>

      <div className="mp-calc-table">
        <div className="mp-calc-row mp-calc-head">
          <span>Tenure</span>
          <span>Interest</span>
          <span>Monthly</span>
          <span>Total</span>
          <span>Extra</span>
        </div>
        {plans.map((p) => (
          <div className="mp-calc-row" key={p.months}>
            <span>{p.months} months {p.noCost && <em className="mp-calc-nocost">No cost</em>}</span>
            <span>{p.rate ? `${p.rate}%` : '0%'}</span>
            <span>{formatInr(p.monthly)}</span>
            <span>{formatInr(p.total)}</span>
            <span className={p.extraCost > 0 ? 'mp-calc-extra' : 'mp-calc-extra nil'}>
              {p.extraCost > 0 ? `+${formatInr(p.extraCost)}` : 'Nil'}
            </span>
          </div>
        ))}
      </div>
      <p className="mp-calc-note">Extra cost is interest plus the processing fee, less cashback. Illustrative terms for demonstration \u2014 not a credit offer.</p>
    </section>
  )
}
