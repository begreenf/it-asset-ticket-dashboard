import type { Ticket, Asset } from '../types'

interface Props {
    tickets: Ticket[]
    assets: Asset[]
}

export default function SummaryCards({ tickets, assets }: Props) {
    const openTickets = tickets.filter((t) => t.status !== 'Resolved').length
    const highPriority = tickets.filter(
          (t) => t.priority === 'High' && t.status !== 'Resolved',
        ).length
    const assetsInUse = assets.filter((a) => a.status === 'In Use').length
    const totalAssets = assets.length

  const cards = [
    { label: 'Open tickets', value: openTickets },
    { label: 'High priority (open)', value: highPriority },
    { label: 'Assets in use', value: `${assetsInUse} / ${totalAssets}` },
      ]

  return (
        <div className="summary-cards">
          {cards.map((card) => (
                  <div className="summary-card" key={card.label}>
                            <span className="summary-value">{card.value}</span>
                            <span className="summary-label">{card.label}</span>
                  </div>
                ))}
        </div>
      )
}
