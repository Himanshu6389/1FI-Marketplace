// Illustrative EMI math for the demo. Not a real credit offer.

const TENURE_RULES = [
  { months: 3, rate: 0, feePct: 0, cashbackPct: 0 },
  { months: 6, rate: 0, feePct: 0.3, cashbackPct: 0, tag: 'Most popular' },
  { months: 9, rate: 10.5, feePct: 0.6, cashbackPct: 2 },
  { months: 12, rate: 12, feePct: 1, cashbackPct: 3, tag: 'Best cashback' },
  { months: 18, rate: 13.5, feePct: 1.2, cashbackPct: 1.5, tag: 'Lower monthly' },
]

const roundTo10 = (n) => Math.round(n / 10) * 10

export function formatInr(amount) {
  return `\u20b9${Math.round(amount).toLocaleString('en-IN')}`
}

export function computeEmiPlans(price) {
  return TENURE_RULES.map((rule) => {
    const fee = rule.feePct ? roundTo10((price * rule.feePct) / 100) : 0
    const interestAmount = rule.rate ? Math.round((price * (rule.rate / 100) * rule.months) / 12) : 0
    const cashback = rule.cashbackPct ? roundTo10((price * rule.cashbackPct) / 100) : 0
    const total = price + interestAmount + fee
    const monthly = Math.round(total / rule.months)
    const finalInstallment = total - monthly * (rule.months - 1)
    const extraCost = interestAmount + fee - cashback
    const noCost = rule.rate === 0 && fee === 0

    return {
      months: rule.months,
      rate: rule.rate,
      tag: rule.tag || null,
      fee,
      interestAmount,
      cashback,
      total,
      monthly,
      finalInstallment,
      extraCost,
      noCost,
    }
  })
}

export function cheapestNoCostFrom(plans) {
  const noCostPlans = plans.filter((p) => p.noCost)
  if (noCostPlans.length === 0) return null
  return noCostPlans.reduce((min, p) => (p.months < min.months ? p : min), noCostPlans[0])
}

export function maxCashback(plans) {
  return plans.reduce((max, p) => Math.max(max, p.cashback), 0)
}

export function lowestMonthly(plans) {
  return plans.reduce((min, p) => Math.min(min, p.monthly), plans[0].monthly)
}
