const STEPS = [
  {
    n: '01',
    title: 'Pick a configuration',
    body: 'Storage, RAM and colour each carry their own price, so the plans you see are always priced against the exact variant you selected.',
  },
  {
    n: '02',
    title: 'Compare the real cost',
    body: 'Every plan lists its interest rate, processing fee and cashback \u2014 not just the monthly figure. The lowest instalment is usually the most expensive plan overall.',
  },
  {
    n: '03',
    title: 'Check the total, not the monthly',
    body: 'Total payable is your instalments plus the processing fee. Effective cost deducts cashback. A no-cost plan repays exactly the item price.',
  },
  {
    n: '04',
    title: 'Confirm your plan',
    body: 'Your selection is re-priced and validated before it is confirmed, and you get a reference for the exact terms you were shown.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section mp-how">
      <h2 className="section-title">How it works</h2>
      <p className="mp-how-sub">Four things worth knowing before you choose a plan.</p>
      <div className="mp-how-list">
        {STEPS.map((s) => (
          <div className="mp-how-item" key={s.n}>
            <span className="mp-how-n">{s.n}</span>
            <h4>{s.title}</h4>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
