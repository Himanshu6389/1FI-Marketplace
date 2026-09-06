export default function SearchBar({ placeholder, value = '', onChange }) {
  return (
    <div className="search-wrap">
      <div className="search-box">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="#a9a4c6" strokeWidth="2" />
          <path d="M21 21l-4.3-4.3" stroke="#a9a4c6" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder={placeholder}
          aria-label={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
      </div>
    </div>
  )
}
