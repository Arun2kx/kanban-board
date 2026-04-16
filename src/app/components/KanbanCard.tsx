"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Card as CardType, Status } from "../types";
import { Pencil, Trash2, ChevronRight, ChevronLeft } from "lucide-react";

interface KanbanCardProps {
  card: CardType;
  index: number;
  columnId: Status;
  onEdit: (card: CardType) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: "forward" | "backward") => void;
}

const statusOrder: Status[] = ["pending", "in-progress", "completed"];

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function KanbanCard({ card, index, columnId, onEdit, onDelete, onMove }: KanbanCardProps) {
  const currentIndex = statusOrder.indexOf(columnId);
  const canMoveForward = currentIndex < statusOrder.length - 1;
  const canMoveBackward = currentIndex > 0;

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="group bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          style={{
            transform: snapshot.isDragging
              ? `${provided.draggableProps.style?.transform} rotate(1deg)`
              : provided.draggableProps.style?.transform,
            ...provided.draggableProps.style,
          }}
        >
          {/* Title */}
          <h3 className="text-gray-900 font-semibold text-sm mb-2">
            {card.title}
          </h3>

          {/* Description */}
          {card.description && (
            <p className="text-gray-500 text-sm mb-3 line-clamp-3">
              {card.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            
            {/* Date */}
            <span className="text-xs text-gray-400 font-mono">
              {formatDate(card.createdAt)}
            </span>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
              
              {canMoveBackward && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMove(card.id, "backward");
                  }}
                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
                >
                  <ChevronLeft size={14} />
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(card);
                }}
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-blue-100 text-blue-600"
              >
                <Pencil size={13} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(card.id);
                }}
                className="w-6 h-6 flex items-center justify-center rounded hover:bg-red-100 text-red-500"
              >
                <Trash2 size={13} />
              </button>

              {canMoveForward && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onMove(card.id, "forward");
                  }}
                  className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
                >
                  <ChevronRight size={14} />
                </button>
              )}

            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}