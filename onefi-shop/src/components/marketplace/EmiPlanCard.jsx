import { formatInr } from '../../utils/emi.js'

export default function EmiPlanCard({ plan, selected, onSelect }) {
  return (
    <button
      className={`emi-plan-card${selected ? ' selected' : ''}${!plan.available ? ' unavailable' : ''}`}
      onClick={() => plan.available !== false && onSelect(plan.months)}
      disabled={plan.available === false}
    >
      <div className="emi-plan-top">
        <span className="emi-plan-months">{plan.months} months</span>
        <span className="emi-plan-rate">{plan.rate ? `${plan.rate}% p.a.` : '0% interest'}</span>
      </div>
      <div className="emi-plan-amount">{formatInr(plan.monthly)}<span>/mo</span></div>
      {plan.available === false ? (
        <span className="emi-plan-unavailable">Temporarily unavailable</span>
      ) : (
        <>
          {plan.tag && <span className="emi-plan-tag">{plan.tag}</span>}
          {plan.noCost && <span className="emi-plan-tag nocost">No cost</span>}
          <div className="emi-plan-foot">
            <span>Total {formatInr(plan.total)} \u00b7 Fee {plan.fee ? formatInr(plan.fee) : 'None'}</span>
            {plan.cashback > 0 && <span className="emi-plan-cashback">\u21a9 {formatInr(plan.cashback)} back</span>}
            <span className={plan.extraCost > 0 ? 'emi-plan-extra' : 'emi-plan-extra nil'}>
              {plan.extraCost > 0 ? `Costs ${formatInr(plan.extraCost)} extra` : 'No extra cost'}
            </span>
          </div>
        </>
      )}
    </button>
  )
}
