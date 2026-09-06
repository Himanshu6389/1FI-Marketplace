const OPTIONS = [
  { id: 'newest', label: 'Newest first' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'rating', label: 'Rating' },
]

export default function SortSelect({ value, onChange }) {
  return (
    <label className="sort-select">
      <span>Sort by</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  )
}
