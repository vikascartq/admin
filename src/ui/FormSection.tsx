import type { FormSectionProps } from "./types";

export default function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-base font-semibold text-[#111827] dark:text-[#F9FAFB]">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mt-0.5">
            {description}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}
