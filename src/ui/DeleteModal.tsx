import BaseModal from "./BaseModal";
import Button from "./Button";

interface DeleteModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  handleDelete: () => void;
  onClose?: () => void;
}

export default function DeleteModal({
  isOpen,
  onOpenChange,
  handleDelete,
  onClose,
}: DeleteModalProps) {
  const close = () => {
    onClose?.();
    onOpenChange();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={close}
      title="Confirm Deletion"
      size="sm"
      footer={
        <div className="flex items-center justify-end gap-3 w-full">
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      }
    >
      <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
        Are you sure you want to delete this item? This action cannot be undone.
      </p>
    </BaseModal>
  );
}
