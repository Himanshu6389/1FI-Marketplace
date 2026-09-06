import { useState } from 'react'

const FAQS = [
  {
    q: 'What is a no-cost EMI?',
    a: 'A no-cost plan charges 0% interest and no processing fee, so your total payable across all instalments equals the item price exactly.',
  },
  {
    q: 'Why does a lower monthly payment cost more?',
    a: 'Longer tenures spread the same amount over more months, but they usually carry a higher interest rate, so the total payable is higher even though each instalment is smaller.',
  },
  {
    q: 'Why is one of the tenures greyed out?',
    a: 'A plan can be temporarily unavailable for a specific configuration if it is being re-priced or has hit a lending limit. It will re-appear once available again.',
  },
  {
    q: 'Why is the final instalment a few rupees different?',
    a: 'Monthly instalments are rounded to the nearest rupee. The last instalment absorbs that rounding so the total still matches exactly.',
  },
  {
    q: 'How is cashback applied?',
    a: 'Cashback is credited after your instalments are complete and reduces the effective cost of the plan, but it does not change the amount of any individual instalment.',
  },
  {
    q: 'What happens when I proceed with a plan?',
    a: 'Your selection is re-priced and validated on the server, and you receive a confirmation reference showing the exact terms that applied at that moment.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="section mp-faq">
      <h2 className="section-title">Frequently asked questions</h2>
      <p className="mp-how-sub">How instalments, cashback and eligibility work on this store.</p>
      <div className="mp-faq-list">
        {FAQS.map((item, i) => {
          const open = openIndex === i
          return (
            <div className={`mp-faq-item${open ? ' open' : ''}`} key={item.q}>
              <button className="mp-faq-q" onClick={() => setOpenIndex(open ? null : i)}>
                {item.q}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mp-faq-chevron">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {open && <p className="mp-faq-a">{item.a}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}
