# IT Asset & Ticket Dashboard

## Problem
Small IT teams juggle two things constantly: who's asking for help right now, and what hardware
the company actually owns and who has it. Most teams end up tracking this in a spreadsheet, a
shared inbox, or two different tools that don't talk to each other, so nobody has a single place
to check what's open and what the company owns at a glance.

## Solution
A single-page dashboard that combines a ticket queue and an asset register, built as a real,
interactive app, not a static mockup. It's a React + TypeScript single-page app that runs
entirely in the browser, with data persisted locally so the demo is fully functional: create
tickets, change their status, add assets, reassign them, filter and search, all live.

## Key features
Ticket queue with search by title, requester or ID, a status filter, an inline new-ticket form,
one-click status changes from Open to In Progress to Resolved, and color-coded priority badges.
Asset register with search by name, owner or serial number, a type filter, an inline new-asset
form, and status tracking across In Use, In Storage and Retired. Summary cards showing open
ticket count, high-priority-open count, and assets-in-use ratio, computed live from the current
data. Clean dark-theme UI, fully responsive, built with plain CSS and no UI framework dependency.
State persists in the browser via localStorage, so refreshing the page never loses changes.

## Tech stack
React, TypeScript, Vite, plain CSS

## Running it
```
npm install
npm run dev
# open http://localhost:5173
```
or build a production bundle:
```
npm run build
```

## Why this matters for clients
This shows I can deliver a modern frontend, not just backend scripts: component structure, typed
data models, state management, and a UI that looks like a real internal tool rather than a
tutorial project. For a client, it's proof that building a dashboard for tickets, assets,
inventory or requests, anything with a list-and-detail shape, is something I can build end to end
in React, and just as easily wire up to a real API or database on a client project.

---
Personal/demo project. Data is sample data stored in the browser (localStorage), no backend or
real ticketing/asset system behind it. Happy to connect this to a real API (Flask, Django,
Node/Express) or an existing ticketing/asset system (Freshservice, Zendesk, Snipe-IT, etc.) on a
client project.
