"use client";

import { useState, useEffect, useCallback } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import { Card, Status, COLUMNS } from "../types";
import { KanbanColumn } from "./KanbanColumn";
import { CardModal } from "./CardModal";
import { SearchBar } from "./SearchBar";
import { Plus, LayoutDashboard } from "lucide-react";

const STORAGE_KEY = "kanban-cards";

const SAMPLE_CARDS: Card[] = [
  {
    id: uuidv4(),
    title: "Design wireframes",
    description: "Create initial wireframes for the new dashboard UI.",
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Set up Next.js project",
    description: "Initialize the project with App Router, Tailwind CSS, and TypeScript.",
    status: "in-progress",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Configure ESLint",
    description: "Set up ESLint and Prettier for consistent code formatting.",
    status: "completed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function KanbanBoard() {
  const [cards, setCards] = useState<Card[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: "create" | "edit";
    card?: Card;
  }>({ isOpen: false, mode: "create" });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCards(JSON.parse(stored));
      } else {
        setCards(SAMPLE_CARDS);
      }
    } catch {
      setCards(SAMPLE_CARDS);
    }
    setIsLoaded(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    }
  }, [cards, isLoaded]);

  const filteredCards = useCallback(
    (status: Status) =>
      cards.filter(
        (c) =>
          c.status === status &&
          (searchQuery === "" ||
            c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description.toLowerCase().includes(searchQuery.toLowerCase()))
      ),
    [cards, searchQuery]
  );

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStatus = destination.droppableId as Status;
    setCards((prev) =>
      prev.map((card) =>
        card.id === draggableId
          ? { ...card, status: newStatus, updatedAt: new Date().toISOString() }
          : card
      )
    );
  };

  const handleCreateCard = (title: string, description: string) => {
    const newCard: Card = {
      id: uuidv4(),
      title: title.trim(),
      description: description.trim(),
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCards((prev) => [...prev, newCard]);
    setModalState({ isOpen: false, mode: "create" });
  };

  const handleEditCard = (title: string, description: string) => {
    if (!modalState.card) return;
    setCards((prev) =>
      prev.map((c) =>
        c.id === modalState.card!.id
          ? { ...c, title: title.trim(), description: description.trim(), updatedAt: new Date().toISOString() }
          : c
      )
    );
    setModalState({ isOpen: false, mode: "create" });
  };

  const handleMoveCard = (cardId: string, direction: "forward" | "backward") => {
    const statusOrder: Status[] = ["pending", "in-progress", "completed"];
    setCards((prev) =>
      prev.map((card) => {
        if (card.id !== cardId) return card;
        const currentIndex = statusOrder.indexOf(card.status);
        const newIndex =
          direction === "forward"
            ? Math.min(currentIndex + 1, 2)
            : Math.max(currentIndex - 1, 0);
        return {
          ...card,
          status: statusOrder[newIndex],
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const handleDeleteCard = (cardId: string) => {
    setDeleteConfirm(cardId);
  };

  const confirmDelete = () => {
    if (deleteConfirm) {
      setCards((prev) => prev.filter((c) => c.id !== deleteConfirm));
      setDeleteConfirm(null);
    }
  };

  const openEditModal = (card: Card) => {
    setModalState({ isOpen: true, mode: "edit", card });
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-sm" style={{ color: "var(--text-muted)" }}>
          Loading board...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-8">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div className="flex items-center gap-3">
          <LayoutDashboard size={18} style={{ color: "var(--text-muted)" }} />
          <h2 className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
            {cards.length} {cards.length === 1 ? "card" : "cards"} total
          </h2>
        </div>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <button
          onClick={() => setModalState({ isOpen: true, mode: "create" })}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 hover:opacity-90 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #3b82f6, #6366f1)",
            color: "white",
            boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
          }}
        >
          <Plus size={16} />
          New Card
        </button>
      </div>

      {/* Board Columns */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              column={col}
              cards={filteredCards(col.id)}
              allCardsCount={cards.filter((c) => c.status === col.id).length}
              searchActive={searchQuery !== ""}
              onEdit={openEditModal}
              onDelete={handleDeleteCard}
              onMove={handleMoveCard}
            />
          ))}
        </div>
      </DragDropContext>

      {/* Create/Edit Modal */}
      {modalState.isOpen && (
        <CardModal
          mode={modalState.mode}
          card={modalState.card}
          onSubmit={modalState.mode === "create" ? handleCreateCard : handleEditCard}
          onClose={() => setModalState({ isOpen: false, mode: "create" })}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop animate-scale-in"
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            className="rounded-2xl border p-6 w-full max-w-sm mx-4"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border-medium)",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-2xl mb-3">🗑️</div>
            <h3 className="text-base font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
              Delete this card?
            </h3>
            <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
              This action cannot be undone. The card will be permanently removed from your board.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2 rounded-lg text-sm font-medium border transition-colors hover:bg-white/5"
                style={{
                  borderColor: "var(--border-medium)",
                  color: "var(--text-secondary)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  color: "white",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
