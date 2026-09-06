export default function FilterChips({ filters, counts, active, onChange }) {
  return (
    <div className="chip-row">
      {filters.map((f) => {
        const count = f.id === 'all' ? counts.all : counts[f.id] || 0
        if (f.id !== 'all' && count === 0) return null
        return (
          <button
            key={f.id}
            className={`chip${active === f.id ? ' active' : ''}`}
            onClick={() => onChange(f.id)}
          >
            {f.label}
            {f.id !== 'all' && <span className="chip-count">{count}</span>}
          </button>
        )
      })}
    </div>
  )
}
