import { useMemo, useState } from 'react'
import type { Ticket, TicketCategory, TicketPriority, TicketStatus } from '../types'
import StatusBadge from './StatusBadge'
import { nextTicketId } from '../storage'

interface Props {
    tickets: Ticket[]
    onChange: (tickets: Ticket[]) => void
}

const CATEGORIES: TicketCategory[] = ['Hardware', 'Software', 'Network', 'Access']
const PRIORITIES: TicketPriority[] = ['Low', 'Medium', 'High']
const STATUSES: TicketStatus[] = ['Open', 'In Progress', 'Resolved']

export default function TicketsView({ tickets, onChange }: Props) {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<TicketStatus | 'All'>('All')
    const [showForm, setShowForm] = useState(false)

  const [title, setTitle] = useState('')
    const [requester, setRequester] = useState('')
    const [category, setCategory] = useState<TicketCategory>('Hardware')
    const [priority, setPriority] = useState<TicketPriority>('Medium')

  const filtered = useMemo(() => {
        return tickets.filter((t) => {
                const matchesSearch =
                          t.title.toLowerCase().includes(search.toLowerCase()) ||
                          t.requester.toLowerCase().includes(search.toLowerCase()) ||
                          t.id.toLowerCase().includes(search.toLowerCase())
                const matchesStatus = statusFilter === 'All' || t.status === statusFilter
                return matchesSearch && matchesStatus
        })
  }, [tickets, search, statusFilter])

  function handleCreate(e: React.FormEvent) {
        e.preventDefault()
        if (!title.trim() || !requester.trim()) return

      const newTicket: Ticket = {
              id: nextTicketId(tickets),
              title: title.trim(),
              requester: requester.trim(),
              category,
              priority,
              status: 'Open',
              createdAt: new Date().toISOString().slice(0, 10),
      }

      onChange([newTicket, ...tickets])
        setTitle('')
        setRequester('')
        setCategory('Hardware')
        setPriority('Medium')
        setShowForm(false)
  }

  function updateStatus(id: string, status: TicketStatus) {
        onChange(tickets.map((t) => (t.id === id ? { ...t, status } : t)))
  }

  return (
        <div>
                <div className="toolbar">
                          <input
                                      className="search-input"
                                      placeholder="Search by title, requester, or ID..."
                                      value={search}
                                      onChange={(e) => setSearch(e.target.value)}
                                    />
                          <select
                                      value={statusFilter}
                                      onChange={(e) => setStatusFilter(e.target.value as TicketStatus | 'All')}
                                    >
                                      <option value="All">All statuses</option>
                            {STATUSES.map((s) => (
                                                  <option key={s} value={s}>
                                                    {s}
                                                  </option>
                                                ))}
                          </select>
                          <button className="primary-button" onClick={() => setShowForm((v) => !v)}>
                            {showForm ? 'Cancel' : '+ New Ticket'}
                          </button>
                </div>

          {showForm && (
                  <form className="inline-form" onSubmit={handleCreate}>
                              <input
                                            placeholder="Ticket title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                          />
                              <input
                                            placeholder="Requester name"
                                            value={requester}
                                            onChange={(e) => setRequester(e.target.value)}
                                            required
                                          />
                              <select value={category} onChange={(e) => setCategory(e.target.value as TicketCategory)}>
                                {CATEGORIES.map((c) => (
                                  <option key={c} value={c}>
                                    {c}
                                  </option>
                                ))}
                              </select>
                              <select value={priority} onChange={(e) => setPriority(e.target.value as TicketPriority)}>
                                {PRIORITIES.map((p) => (
                                  <option key={p} value={p}>
                                    {p}
                                  </option>
                                ))}
                              </select>
                              <button type="submit" className="primary-button">
                                            Create ticket
                              </button>
                  </form>
                )}

                <table className="data-table">
                          <thead>
                                      <tr>
                                                    <th>ID</th>
                                                  <th>Title</th>
                                                  <th>Requester</th>
                                                  <th>Category</th>
                                                  <th>Priority</th>
                                                  <th>Status</th>
                                                  <th>Created</th>
                                      </tr>
                          </thead>
                          <tbody>
                            {filtered.map((t) => (
                      <tr key={t.id}>
                                      <td>{t.id}</td>
                                    <td>{t.title}</td>
                                    <td>{t.requester}</td>
                                    <td>{t.category}</td>
                                    <td>
                                                      <StatusBadge label={t.priority} />
                                    </td>
                                      <td>
                                                        <select
                                                                            className="status-select"
                                                                            value={t.status}
                                                                            onChange={(e) => updateStatus(t.id, e.target.value as TicketStatus)}
                                                                          >
                                                          {STATUSES.map((s) => (
                                                                                                <option key={s} value={s}>
                                                                                                  {s}
                                                                                                  </option>
                                                                                              ))}
                                                        </select>
                                      </td>
                                      <td>{t.createdAt}</td>
                      </tr>
                    ))}
                            {filtered.length === 0 && (
                      <tr>
                                      <td colSpan={7} className="empty-row">
                                                        No tickets match your filters.
                                      </td>
                      </tr>
                    )}
                          </tbody>
                </table>
        </div>
      )
}
