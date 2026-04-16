"use client";

import { Droppable } from "@hello-pangea/dnd";
import { Card as CardType, Column } from "../types";
import { KanbanCard } from "./KanbanCard";
import { StickyNote } from "lucide-react";

interface KanbanColumnProps {
  column: Column;
  cards: CardType[];
  allCardsCount: number;
  searchActive: boolean;
  onEdit: (card: CardType) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: "forward" | "backward") => void;
}

const columnConfig = {
  pending: {
    dotColor: "#f59e0b",
  },
  "in-progress": {
    dotColor: "#3b82f6",
  },
  completed: {
    dotColor: "#10b981",
  },
};

export function KanbanColumn({
  column,
  cards,
  allCardsCount,
  searchActive,
  onEdit,
  onDelete,
  onMove,
}: KanbanColumnProps) {
  const config = columnConfig[column.id];
  const isEmpty = cards.length === 0;

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-4 w-80 shadow-sm min-h-[500px]">
      
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: config.dotColor }}
          />
          <h2 className="text-sm font-semibold text-gray-700">
            {column.title}
          </h2>
        </div>

        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
          {allCardsCount}
        </span>
      </div>

      {/* Droppable Area */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 flex flex-col gap-3 ${
              snapshot.isDraggingOver ? "bg-gray-50" : ""
            } rounded-lg p-2`}
          >
            {/* Cards */}
            {cards.map((card, index) => (
              <KanbanCard
                key={card.id}
                card={card}
                index={index}
                columnId={column.id}
                onEdit={onEdit}
                onDelete={onDelete}
                onMove={onMove}
              />
            ))}

            {provided.placeholder}

            {/* Empty State */}
            {isEmpty && (
  <div className="flex-1 flex flex-col items-center justify-center py-16 text-gray-400">
                <StickyNote size={32} className="mb-3 text-gray-300" />
               <p className="text-sm text-gray-500 text-center">
                  {searchActive ? "No matching cards" : "No cards yet"}
                </p>
                {!searchActive && column.id === "pending" && (
                  <p className="text-xs mt-1 opacity-60">
                    Create a card to get started
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}