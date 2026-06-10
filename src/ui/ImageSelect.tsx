import type { ImageSelectProps } from "./types";

const imageOptions = [
  { value: "", label: "Select an image" },
  { value: "girl-black-image-1", label: "👩 Girl Black #1" },
  { value: "girl-black-image-2", label: "👩 Girl Black #2" },
  { value: "girl-black-image-3", label: "👩 Girl Black #3" },
  { value: "boy-black-image-1", label: "👨 Boy Black #1" },
  { value: "boy-black-image-2", label: "👨 Boy Black #2" },
  { value: "boy-black-image-3", label: "👨 Boy Black #3" },
  { value: "boy-black-image-4", label: "👨 Boy Black #4" },
  { value: "girl-white-image-1", label: "👩 Girl White #1" },
  { value: "girl-white-image-2", label: "👩 Girl White #2" },
  { value: "girl-white-image-3", label: "👩 Girl White #3" },
  { value: "boy-white-image-1", label: "👨 Boy White #1" },
  { value: "boy-white-image-2", label: "👨 Boy White #2" },
  { value: "boy-white-image-3", label: "👨 Boy White #3" },
  { value: "asian-girl-image-1", label: "👩 Asian Girl #1" },
  { value: "asian-girl-image-2", label: "👩 Asian Girl #2" },
  { value: "asian-girl-image-3", label: "👩 Asian Girl #3" },
  { value: "asian-boy-image-1", label: "👨 Asian Boy #1" },
  { value: "asian-boy-image-2", label: "👨 Asian Boy #2" },
  { value: "asian-boy-image-3", label: "👨 Asian Boy #3" },
  { value: "asian-boy-image-4", label: "👨 Asian Boy #4" },
  { value: "middle-east-girl-image-1", label: "👩 Middle East Girl #1" },
  { value: "middle-east-girl-image-2", label: "👩 Middle East Girl #2" },
  { value: "middle-east-girl-image-3", label: "👩 Middle East Girl #3" },
  { value: "middle-east-boy-image-1", label: "👨 Middle East Boy #1" },
  { value: "middle-east-boy-image-2", label: "👨 Middle East Boy #2" },
  { value: "middle-east-boy-image-3", label: "👨 Middle East Boy #3" },
];

export default function ImageSelect({
  label,
  value,
  onChange,
  error,
  touched,
}: ImageSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#374151] dark:text-[#D1D5DB]">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full px-3 py-2 rounded-lg border text-sm bg-white dark:bg-[#1F2937]
          ${value
            ? "border-[#3B82F6] dark:border-[#60A5FA]"
            : "border-[#D1D5DB] dark:border-[#374151]"
          }
          focus:outline-none focus:ring-2 focus:ring-[#60A5FA]
          text-[#374151] dark:text-[#D1D5DB]
        `}
      >
        {imageOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {touched && error && (
        <p className="text-sm text-[#EF4444]">{error}</p>
      )}
    </div>
  );
}
