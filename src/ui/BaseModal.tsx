import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import type { BaseModalProps } from "./types";

const sizeMap = {
  sm: "max-w-[500px]",
  md: "max-w-[700px]",
  lg: "max-w-[900px]",
} as const;

export default function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: BaseModalProps) {
  return (
    <Modal
      {...({
        isOpen,
        onOpenChange: (open: boolean) => { if (!open) onClose(); },
        size: "xl",
        classNames: {
          base: `${sizeMap[size]} w-full mx-4`,
          wrapper: "items-center",
          body: "overflow-y-auto py-4 px-6",
          header: "border-b border-[#E5E7EB] dark:border-[#374151] px-6 py-4",
          closeButton: "top-4 right-4",
          backdrop: "bg-black/40",
        },
        scrollBehavior: "inside",
        placement: "center",
      } as any)}
    >
      <ModalContent className="bg-white dark:bg-[#111827] max-h-[90vh]">
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-[#111827] dark:text-[#F9FAFB]">
                {title}
              </h2>
            </ModalHeader>

            <ModalBody>{children}</ModalBody>

            {footer && (
              <div className="border-t border-[#E5E7EB] dark:border-[#374151] px-6 py-4 flex items-center justify-end gap-3">
                {footer}
              </div>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
