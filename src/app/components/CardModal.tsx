"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "../types";
import { X } from "lucide-react";

interface CardModalProps {
  mode: "create" | "edit";
  card?: Card;
  onSubmit: (title: string, description: string) => void;
  onClose: () => void;
}

export function CardModal({ mode, card, onSubmit, onClose }: CardModalProps) {
  const [title, setTitle] = useState(card?.title ?? "");
  const [description, setDescription] = useState(card?.description ?? "");
  const [error, setError] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    onSubmit(title, description);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop animate-scale-in"
      onClick={onClose}
      onKeyDown={handleKeyDown}
    >
      <div
        className="rounded-2xl border w-full max-w-md mx-4 overflow-hidden"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border-medium)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            {mode === "create" ? "✨ New Card" : "✏️ Edit Card"}
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Title */}
          <div>
            <label
              className="block text-xs font-medium mb-2"
              style={{ color: "var(--text-secondary)" }}
            >
              Title <span className="text-red-400">*</span>
            </label>
            <input
              ref={titleRef}
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
              placeholder="Enter card title..."
              className="w-full px-3 py-2.5 rounded-lg text-sm border transition-colors"
              style={{
                background: "var(--bg-primary)",
                borderColor: error ? "#ef4444" : "var(--border-medium)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = error ? "#ef4444" : "var(--border-medium)";
              }}
            />
            {error && (
              <p className="text-xs mt-1.5 text-red-400">{error}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              className="block text-xs font-medium mb-2"
              style={{ color: "var(--text-secondary)" }}
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description (optional)..."
              rows={4}
              className="w-full px-3 py-2.5 rounded-lg text-sm border transition-colors resize-none"
              style={{
                background: "var(--bg-primary)",
                borderColor: "var(--border-medium)",
                color: "var(--text-primary)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#3b82f6";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border-medium)";
              }}
            />
          </div>

          {mode === "create" && (
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Card will be added to the <strong style={{ color: "var(--text-secondary)" }}>Pending</strong> column.
            </p>
          )}
        </div>

        {/* Modal Footer */}
        <div
          className="flex gap-3 px-6 py-4 border-t"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors hover:bg-white/5"
            style={{
              borderColor: "var(--border-medium)",
              color: "var(--text-secondary)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              color: "white",
              boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
            }}
          >
            {mode === "create" ? "Create Card" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
