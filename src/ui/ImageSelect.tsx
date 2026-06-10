import type { ImageSelectProps } from "./types";

const imageCategories = [
  {
    label: "Girl Black",
    images: [
      "girl-black-image-1",
      "girl-black-image-2",
      "girl-black-image-3",
    ],
  },
  {
    label: "Boy Black",
    images: [
      "boy-black-image-1",
      "boy-black-image-2",
      "boy-black-image-3",
      "boy-black-image-4",
    ],
  },
  {
    label: "Girl White",
    images: [
      "girl-white-image-1",
      "girl-white-image-2",
      "girl-white-image-3",
    ],
  },
  {
    label: "Boy White",
    images: [
      "boy-white-image-1",
      "boy-white-image-2",
      "boy-white-image-3",
    ],
  },
  {
    label: "Asian Girl",
    images: [
      "asian-girl-image-1",
      "asian-girl-image-2",
      "asian-girl-image-3",
    ],
  },
  {
    label: "Asian Boy",
    images: [
      "asian-boy-image-1",
      "asian-boy-image-2",
      "asian-boy-image-3",
      "asian-boy-image-4",
    ],
  },
  {
    label: "Middle East Girl",
    images: [
      "middle-east-girl-image-1",
      "middle-east-girl-image-2",
      "middle-east-girl-image-3",
    ],
  },
  {
    label: "Middle East Boy",
    images: [
      "middle-east-boy-image-1",
      "middle-east-boy-image-2",
      "middle-east-boy-image-3",
    ],
  },
];

function getImageColor(name: string): string {
  if (name.includes("black")) return "bg-[#1F2937]";
  if (name.includes("white")) return "bg-[#F3F4F6]";
  if (name.includes("asian")) return "bg-[#FDE68A]";
  if (name.includes("middle-east")) return "bg-[#D97706]";
  return "bg-[#E5E7EB]";
}

function getImageLabel(name: string): string {
  const parts = name.split("-");
  const gender = parts[0] === "girl" ? "👩" : parts[0] === "boy" ? "👨" : "👤";
  const idx = parts[parts.length - 1];
  return `${gender} #${idx}`;
}

export default function ImageSelect({
  label,
  value,
  onChange,
  error,
  touched,
}: ImageSelectProps) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-[#374151] dark:text-[#D1D5DB]">
        {label}
      </label>

      {value && (
        <div className="flex items-center gap-4 p-4 rounded-lg border-2 border-[#3B82F6] dark:border-[#60A5FA] bg-[#EFF6FF] dark:bg-[#1E3A5F]">
          <div
            className={`
              w-16 h-16 rounded-xl ${getImageColor(value)}
              ring-2 ring-[#3B82F6] dark:ring-[#60A5FA]
              flex items-center justify-center text-2xl
              shadow-sm
            `}
          >
            {getImageLabel(value).split(" ")[0]}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium text-[#1D4ED8] dark:text-[#93C5FD]">
              {value}
            </span>
            <span className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">
              {getImageLabel(value)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="ml-auto text-[#9CA3AF] dark:text-[#6B7280] hover:text-[#EF4444] dark:hover:text-[#F87171] transition-colors"
            aria-label="Clear selection"
          >
            ✕
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[280px] overflow-y-auto pr-1">
        {imageCategories.map((cat) => (
          <div key={cat.label} className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] dark:text-[#9CA3AF]">
              {cat.label}
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {cat.images.map((img) => {
                const isSelected = value === img;
                return (
                  <button
                    key={img}
                    type="button"
                    onClick={() => onChange(img)}
                    className={`
                      flex flex-col items-center gap-1 p-2 rounded-lg border-2 transition-all duration-150
                      ${isSelected
                        ? "border-[#3B82F6] dark:border-[#60A5FA] bg-[#EFF6FF] dark:bg-[#1E3A5F]"
                        : "border-transparent hover:border-[#D1D5DB] dark:hover:border-[#374151]"
                      }
                      focus:outline-none focus:ring-2 focus:ring-[#60A5FA]
                    `}
                  >
                    <div
                      className={`
                        w-8 h-8 rounded-md ${getImageColor(img)}
                        ${isSelected ? "ring-2 ring-[#3B82F6] dark:ring-[#60A5FA]" : ""}
                        flex items-center justify-center text-xs
                      `}
                    >
                      {getImageLabel(img).split(" ")[0]}
                    </div>
                    <span
                      className={`
                        text-[10px] leading-tight text-center
                        ${isSelected
                          ? "text-[#1D4ED8] dark:text-[#93C5FD] font-medium"
                          : "text-[#6B7280] dark:text-[#9CA3AF]"
                        }
                      `}
                    >
                      {img}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {touched && error && (
        <p className="text-sm text-[#EF4444]">{error}</p>
      )}
    </div>
  );
}
