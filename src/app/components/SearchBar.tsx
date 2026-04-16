"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div
      className="relative flex items-center rounded-lg border overflow-hidden"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border-medium)",
        width: "260px",
      }}
    >
      <Search
        size={14}
        className="absolute left-3 pointer-events-none"
        style={{ color: "var(--text-muted)" }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search cards..."
        className="w-full pl-9 pr-8 py-2 text-sm bg-transparent"
        style={{ color: "var(--text-primary)" }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-2 w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
          style={{ color: "var(--text-muted)" }}
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
}
