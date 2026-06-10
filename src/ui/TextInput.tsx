import { Input } from "@heroui/react";
import type { TextInputProps } from "./types";

export default function TextInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  disabled = false,
  required = false,
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-sm font-medium text-[#374151] dark:text-[#D1D5DB]"
      >
        {label}
        {required && <span className="text-[#EF4444] ml-0.5">*</span>}
      </label>
      <Input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        isDisabled={disabled}
        isInvalid={!!error && !!touched}
        errorMessage={touched && error ? error : undefined}
        classNames={{
          base: "w-full",
          inputWrapper: `
            h-10 rounded-lg border px-3
            bg-white dark:bg-[#1F2937]
            border-[#D1D5DB] dark:border-[#374151]
            group-data-[focus=true]:border-[#3B82F6] dark:group-data-[focus=true]:border-[#60A5FA]
            group-data-[focus=true]:ring-2 group-data-[focus=true]:ring-[#60A5FA]/30
            data-[invalid=true]:border-[#EF4444] data-[invalid=true]:ring-2 data-[invalid=true]:ring-[#EF4444]/30
            transition-all duration-150
          `,
          input: "text-sm text-[#111827] dark:text-[#F9FAFB] placeholder:text-[#9CA3AF] dark:placeholder:text-[#6B7280]",
        }}
      />
    </div>
  );
}
