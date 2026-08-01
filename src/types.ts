export type TicketPriority = 'Low' | 'Medium' | 'High'
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved'
export type TicketCategory = 'Hardware' | 'Software' | 'Network' | 'Access'

export interface Ticket {
    id: string
    title: string
    requester: string
    category: TicketCategory
    priority: TicketPriority
    status: TicketStatus
    createdAt: string
    notes?: string
}

export type AssetType = 'Laptop' | 'Desktop' | 'Monitor' | 'Phone' | 'Server' | 'Printer'
export type AssetStatus = 'In Use' | 'In Storage' | 'Retired'

export interface Asset {
    id: string
    name: string
    type: AssetType
    assignedTo: string
    status: AssetStatus
    purchaseDate: string
    serialNumber: string
}
