import { useState } from "react";
import type { TagInputProps } from "./types";

export default function TagInput({
  label,
  tags,
  onAdd,
  onRemove,
  placeholder = "Type and press Enter",
  disabled = false,
}: TagInputProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = input.trim();
      if (trimmed && !tags.includes(trimmed)) {
        onAdd(trimmed);
        setInput("");
      }
    }
  };

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onAdd(trimmed);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#374151] dark:text-[#D1D5DB]">
        {label}
      </label>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            flex-1 h-10 rounded-lg border border-[#D1D5DB] dark:border-[#374151] px-3 text-sm
            bg-white dark:bg-[#1F2937]
            text-[#111827] dark:text-[#F9FAFB]
            placeholder:text-[#9CA3AF] dark:placeholder:text-[#6B7280]
            focus:outline-none focus:border-[#3B82F6] dark:focus:border-[#60A5FA]
            focus:ring-2 focus:ring-[#60A5FA]/30
            transition-all duration-150
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={disabled || !input.trim()}
          className="
            h-10 px-4 rounded-lg text-sm font-medium
            bg-[#3B82F6] hover:bg-[#2563EB] text-white
            focus:outline-none focus:ring-2 focus:ring-[#60A5FA] focus:ring-offset-2 dark:focus:ring-offset-[#0F172A]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-150
          "
        >
          Add
        </button>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="
                inline-flex items-center gap-1.5
                px-3 py-1 rounded-full text-sm
                bg-[#EFF6FF] dark:bg-[#1E3A5F]
                text-[#1D4ED8] dark:text-[#93C5FD]
              "
            >
              {tag}
              <button
                type="button"
                onClick={() => onRemove(tag)}
                disabled={disabled}
                className="text-[#1D4ED8] dark:text-[#93C5FD] hover:text-[#EF4444] dark:hover:text-[#F87171] disabled:opacity-50"
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
