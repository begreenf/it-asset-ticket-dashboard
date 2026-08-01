import type { Ticket, Asset } from './types'
import { sampleTickets, sampleAssets } from './data/sampleData'

const TICKETS_KEY = 'itdash_tickets'
const ASSETS_KEY = 'itdash_assets'

export function loadTickets(): Ticket[] {
    const raw = localStorage.getItem(TICKETS_KEY)
    if (!raw) return sampleTickets
    try {
          return JSON.parse(raw) as Ticket[]
    } catch {
          return sampleTickets
    }
}

export function saveTickets(tickets: Ticket[]): void {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets))
}

export function loadAssets(): Asset[] {
    const raw = localStorage.getItem(ASSETS_KEY)
    if (!raw) return sampleAssets
    try {
          return JSON.parse(raw) as Asset[]
    } catch {
          return sampleAssets
    }
}

export function saveAssets(assets: Asset[]): void {
    localStorage.setItem(ASSETS_KEY, JSON.stringify(assets))
}

export function nextTicketId(tickets: Ticket[]): string {
    const max = tickets.reduce((acc, t) => {
          const num = parseInt(t.id.replace('TCK-', ''), 10)
          return Number.isNaN(num) ? acc : Math.max(acc, num)
    }, 1000)
    return `TCK-${max + 1}`
}

export function nextAssetId(assets: Asset[]): string {
    const max = assets.reduce((acc, a) => {
          const num = parseInt(a.id.replace('AST-', ''), 10)
          return Number.isNaN(num) ? acc : Math.max(acc, num)
    }, 2000)
    return `AST-${max + 1}`
}
