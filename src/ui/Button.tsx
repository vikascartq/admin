import type { ButtonProps } from "./types";

const variants = {
  primary:
    "bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-sm",
  secondary:
    "bg-white dark:bg-[#1F2937] border border-[#D1D5DB] dark:border-[#374151] text-[#111827] dark:text-[#F9FAFB] hover:bg-[#F9FAFB] dark:hover:bg-[#374151]",
  danger:
    "bg-[#EF4444] hover:bg-[#DC2626] text-white shadow-sm",
} as const;

export default function Button({
  variant = "primary",
  loading = false,
  disabled = false,
  children,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2
        h-10 px-5 rounded-lg text-sm font-medium
        transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-[#60A5FA] focus:ring-offset-2 dark:focus:ring-offset-[#0F172A]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
