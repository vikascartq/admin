import { Select as HeroSelect, SelectItem } from "@heroui/react";
import type { SelectProps } from "./types";

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  touched,
  placeholder,
  disabled = false,
  required = false,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-sm font-medium text-[#374151] dark:text-[#D1D5DB]"
      >
        {label}
        {required && <span className="text-[#EF4444] ml-0.5">*</span>}
      </label>
      <HeroSelect
        {...({
          id: name,
          name,
          placeholder,
          selectedKeys: value ? [value] : [],
          onSelectionChange: (keys: any) => {
            const selected = Array.from(keys as Set<string>)[0];
            if (selected) onChange(selected);
          },
          isDisabled: disabled,
          isInvalid: !!error && !!touched,
          errorMessage: touched && error ? error : undefined,
          classNames: {
            base: "w-full",
            trigger: `
              h-10 rounded-lg border px-3
              bg-white dark:bg-[#1F2937]
              border-[#D1D5DB] dark:border-[#374151]
              data-[focus=true]:border-[#3B82F6] dark:data-[focus=true]:border-[#60A5FA]
              data-[focus=true]:ring-2 data-[focus=true]:ring-[#60A5FA]/30
              data-[invalid=true]:border-[#EF4444]
              transition-all duration-150
            `,
            value: "text-sm text-[#111827] dark:text-[#F9FAFB]",
            listbox: "bg-white dark:bg-[#1F2937]",
          },
          children: options.map((opt) => (
            <SelectItem key={opt.value}>{opt.label}</SelectItem>
          )),
        } as any)}
      />
    </div>
  );
}
