import type { FormFooterProps } from "./types";

export default function FormFooter({ children }: FormFooterProps) {
  return (
    <div className="flex items-center justify-end gap-3">
      {children}
    </div>
  );
}
