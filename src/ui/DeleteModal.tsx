import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";

export default function DeleteModal({ isOpen, onOpenChange, handleDelete, onClose }: DeleteModalProps) {
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} disableAnimation={true} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
                            <ModalBody>
                                <p>
                                    Delete this Item
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" className="bg-(--primary-color)" onPress={handleDelete}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

interface DeleteModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    handleDelete: () => void;
    onClose?: () => void
}