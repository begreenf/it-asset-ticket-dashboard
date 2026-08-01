import { useMemo, useState } from 'react'
import type { Asset, AssetStatus, AssetType } from '../types'
import StatusBadge from './StatusBadge'
import { nextAssetId } from '../storage'

interface Props {
    assets: Asset[]
    onChange: (assets: Asset[]) => void
}

const TYPES: AssetType[] = ['Laptop', 'Desktop', 'Monitor', 'Phone', 'Server', 'Printer']
const STATUSES: AssetStatus[] = ['In Use', 'In Storage', 'Retired']

export default function AssetsView({ assets, onChange }: Props) {
    const [search, setSearch] = useState('')
    const [typeFilter, setTypeFilter] = useState<AssetType | 'All'>('All')
    const [showForm, setShowForm] = useState(false)

  const [name, setName] = useState('')
    const [type, setType] = useState<AssetType>('Laptop')
    const [assignedTo, setAssignedTo] = useState('')
    const [serialNumber, setSerialNumber] = useState('')

  const filtered = useMemo(() => {
        return assets.filter((a) => {
                const matchesSearch =
                          a.name.toLowerCase().includes(search.toLowerCase()) ||
                          a.assignedTo.toLowerCase().includes(search.toLowerCase()) ||
                          a.serialNumber.toLowerCase().includes(search.toLowerCase())
                const matchesType = typeFilter === 'All' || a.type === typeFilter
                return matchesSearch && matchesType
        })
  }, [assets, search, typeFilter])

  function handleCreate(e: React.FormEvent) {
        e.preventDefault()
        if (!name.trim()) return

      const newAsset: Asset = {
              id: nextAssetId(assets),
              name: name.trim(),
              type,
              assignedTo: assignedTo.trim() || 'Unassigned',
              status: 'In Use',
              purchaseDate: new Date().toISOString().slice(0, 10),
              serialNumber: serialNumber.trim() || 'N/A',
      }

      onChange([newAsset, ...assets])
        setName('')
        setType('Laptop')
        setAssignedTo('')
        setSerialNumber('')
        setShowForm(false)
  }

  function updateStatus(id: string, status: AssetStatus) {
        onChange(assets.map((a) => (a.id === id ? { ...a, status } : a)))
  }

  return (
        <div>
                <div className="toolbar">
                          <input
                                      className="search-input"
                                      placeholder="Search by name, owner, or serial..."
                                      value={search}
                                      onChange={(e) => setSearch(e.target.value)}
                                    />
                          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as AssetType | 'All')}>
                                      <option value="All">All types</option>
                            {TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                          </select>
                          <button className="primary-button" onClick={() => setShowForm((v) => !v)}>
                            {showForm ? 'Cancel' : '+ New Asset'}
                          </button>
                </div>

          {showForm && (
                  <form className="inline-form" onSubmit={handleCreate}>
                              <input
                                            placeholder="Asset name (e.g. Dell Latitude 5440)"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                          />
                              <select value={type} onChange={(e) => setType(e.target.value as AssetType)}>
                                {TYPES.map((t) => (
                                  <option key={t} value={t}>
                                    {t}
                                  </option>
                                ))}
                              </select>
                              <input
                                            placeholder="Assigned to"
                                            value={assignedTo}
                                            onChange={(e) => setAssignedTo(e.target.value)}
                                          />
                              <input
                                            placeholder="Serial number"
                                            value={serialNumber}
                                            onChange={(e) => setSerialNumber(e.target.value)}
                                          />
                              <button type="submit" className="primary-button">
                                            Add asset
                              </button>
                  </form>
                )}

                <table className="data-table">
                          <thead>
                                      <tr>
                                                    <th>ID</th>
                                                  <th>Name</th>
                                                  <th>Type</th>
                                                  <th>Assigned To</th>
                                                  <th>Serial</th>
                                                  <th>Status</th>
                                                  <th>Purchased</th>
                                      </tr>
                          </thead>
                          <tbody>
                            {filtered.map((a) => (
                      <tr key={a.id}>
                                      <td>{a.id}</td>
                                    <td>{a.name}</td>
                                    <td>{a.type}</td>
                                    <td>{a.assignedTo}</td>
                                    <td>{a.serialNumber}</td>
                                    <td>
                                                      <div className="status-cell">
                                                                          <StatusBadge label={a.status} />
                                                                          <select
                                                                                                className="status-select"
                                                                                                value={a.status}
                                                                                                onChange={(e) => updateStatus(a.id, e.target.value as AssetStatus)}
                                                                                              >
                                                                            {STATUSES.map((s) => (
                                                                                                                      <option key={s} value={s}>
                                                                                                                        {s}
                                                                                                                        </option>
                                                                                                                    ))}
                                                                          </select>
                                                      </div>
                                    </td>
                                      <td>{a.purchaseDate}</td>
                      </tr>
                    ))}
                            {filtered.length === 0 && (
                      <tr>
                                      <td colSpan={7} className="empty-row">
                                                        No assets match your filters.
                                      </td>
                      </tr>
                    )}
                          </tbody>
                </table>
        </div>
      )
}
