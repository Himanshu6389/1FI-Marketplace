export default function EmptyState({ icon, title, message }) {
  return (
    <div className="empty-state">
      <span className="icon-ring" aria-hidden="true">
        {icon}
      </span>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  )
}
