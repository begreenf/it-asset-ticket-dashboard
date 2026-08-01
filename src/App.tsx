import { useEffect, useState } from 'react'
import type { Ticket, Asset } from './types'
import { loadTickets, saveTickets, loadAssets, saveAssets } from './storage'
import SummaryCards from './components/SummaryCards'
import TicketsView from './components/TicketsView'
import AssetsView from './components/AssetsView'
import './App.css'

type Tab = 'tickets' | 'assets'

function App() {
    const [tab, setTab] = useState<Tab>('tickets')
    const [tickets, setTickets] = useState<Ticket[]>(() => loadTickets())
    const [assets, setAssets] = useState<Asset[]>(() => loadAssets())

  useEffect(() => {
        saveTickets(tickets)
  }, [tickets])

  useEffect(() => {
        saveAssets(assets)
  }, [assets])

  return (
        <div className="app-shell">
                <header className="app-header">
                          <div>
                                      <h1>IT Asset &amp; Ticket Dashboard</h1>
                                    <p className="subtitle">
                                                  Track support tickets and hardware assets in one place.
                                    </p>
                          </div>
                          <nav className="tabs">
                                      <button
                                                    className={tab === 'tickets' ? 'tab active' : 'tab'}
                                                    onClick={() => setTab('tickets')}
                                                  >
                                                    Tickets
                                      </button>
                                      <button
                                                    className={tab === 'assets' ? 'tab active' : 'tab'}
                                                    onClick={() => setTab('assets')}
                                                  >
                                                    Assets
                                      </button>
                          </nav>
                </header>

                <main className="app-main">
                          <SummaryCards tickets={tickets} assets={assets} />
                  {tab === 'tickets' ? (
                    <TicketsView tickets={tickets} onChange={setTickets} />
                  ) : (
                    <AssetsView assets={assets} onChange={setAssets} />
                  )}
                </main>

                <footer className="app-footer">
                          Demo project &middot; data is stored locally in your browser
                          (localStorage) &middot; built with React + TypeScript + Vite
                </footer>
        </div>
      )
}

export default App
