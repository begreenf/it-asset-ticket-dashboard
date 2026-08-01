type BadgeTone = 'neutral' | 'warning' | 'success' | 'danger'

const toneMap: Record<string, BadgeTone> = {
    Open: 'warning',
    'In Progress': 'neutral',
    Resolved: 'success',
    'In Use': 'success',
    'In Storage': 'neutral',
    Retired: 'danger',
    Low: 'success',
    Medium: 'warning',
    High: 'danger',
}

export default function StatusBadge({ label }: { label: string }) {
    const tone = toneMap[label] ?? 'neutral'
    return <span className={`badge badge-${tone}`}>{label}</span>
      }
