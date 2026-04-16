# KanbanFlow — Mini Kanban Board

A Trello-like Kanban board built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS** as part of the Next.js Intern Assignment.

## Live Demo

> Add your deployed Vercel link here after deployment

---

## Features

### Core
- ✅ **Create Cards** — Title + description, auto-added to Pending column
- ✅ **View Board** — Three columns: Pending, In Progress, Completed
- ✅ **Move Cards** — Via drag & drop OR arrow buttons on each card
- ✅ **Edit Cards** — Inline modal to update title and description
- ✅ **Delete Cards** — With confirmation dialog to prevent accidents

### Bonus
- ✅ **Drag & Drop** — Powered by `@hello-pangea/dnd`
- ✅ **Data Persistence** — Cards saved to `localStorage`, survive page refresh
- ✅ **Search / Filter** — Real-time search across title and description
- ✅ **Loading & Empty States** — Handled gracefully in each column
- ✅ **Optimistic UI** — State updates instantly without server round-trips

---

## Tech Stack

| Technology | Usage |
|---|---|
| Next.js 14 (App Router) | Framework, routing |
| TypeScript | Type safety throughout |
| Tailwind CSS | Utility-first styling |
| React (Functional Components) | UI components |
| @hello-pangea/dnd | Drag and drop |
| uuid | Unique card IDs |
| lucide-react | Icons |

---

## Architecture

```
src/app/
├── layout.tsx          # Root layout (Server Component)
├── page.tsx            # Home page (Server Component)
├── globals.css         # Global styles + CSS variables
├── types/
│   └── index.ts        # TypeScript types and constants
└── components/
    ├── KanbanBoard.tsx  # Main board logic (Client Component)
    ├── KanbanColumn.tsx # Column with Droppable (Client Component)
    ├── KanbanCard.tsx   # Card with Draggable (Client Component)
    ├── CardModal.tsx    # Create/Edit modal (Client Component)
    └── SearchBar.tsx    # Search input (Client Component)
```

**Server vs Client Components:**
- `layout.tsx` and `page.tsx` are **Server Components** — they render the shell and static content
- All interactive components use `"use client"` directive — they handle state, drag & drop, modals, and localStorage

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/kanban-board.git
cd kanban-board

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## Deployment

This project is ready to deploy on **Vercel**:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Click Deploy (zero config needed for Next.js)

---

## Usage

| Action | How |
|---|---|
| Create a card | Click **"New Card"** button → Fill title & description → Submit |
| Edit a card | Hover a card → Click pencil icon |
| Delete a card | Hover a card → Click trash icon → Confirm |
| Move a card | Drag & drop across columns, OR hover → use ◀ ▶ arrows |
| Search | Type in the search bar to filter by title or description |

---

## Screenshots

> Add screenshots of your deployed app here

---

## Author

Built for the **Next.js Intern Assignment — Mini Kanban Board**  
Submission deadline: 16-04-2026, 11:30 AM
