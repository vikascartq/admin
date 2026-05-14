import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@heroui/react";
import { useContext } from "react";
import type { IGeneralEnquiriesList } from "../hooks/useEnquiries";
import { EnquiriesContext } from "./context/EnquiriesContext";

export default function GeneralDetailsModal({ isOpen, onOpenChange, enquiryDetails }: GeneralDetailsModalProp) {
    const { handleGeneralStatus } = useContext(EnquiriesContext);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                disableAnimation
                classNames={{
                    backdrop: "bg-[#32446740]"
                }}
                onClose={() => {
                    // formik.resetForm();
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                General Enquiry Details
                            </ModalHeader>

                            <ModalBody>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-[14px]">Name : </div>
                                        <div className="text-[14px] text-gray-500 font-medium">
                                            {enquiryDetails?.name || "--"}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-[14px]">Email : </div>
                                        <div className="text-[14px] text-gray-500 font-medium">
                                            {enquiryDetails?.email || "--"}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-[14px]">Company Name : </div>
                                        <div className="text-[14px] text-gray-500 font-medium">
                                            {enquiryDetails?.companyName || "--"}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-[14px]">Phone Number : </div>
                                        <div className="text-[14px] text-gray-500 font-medium">
                                            {enquiryDetails?.phoneNumber || "--"}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-[14px]">Message : </div>
                                        <div className="text-[14px] text-gray-500 font-medium">
                                            {enquiryDetails?.message || "--"}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-[14px]">Status : </div>
                                        <div className="text-[14px] text-gray-500 font-medium">
                                            {enquiryDetails?.status || "--"}
                                        </div>
                                    </div>
                                </div>

                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    className="primary-btn"
                                    isDisabled={enquiryDetails?.status === "done"}
                                    color="primary"
                                    onPress={async () => {
                                        if (enquiryDetails?._id) {
                                            await handleGeneralStatus(enquiryDetails?._id);
                                            onClose();
                                        }
                                    }}
                                >
                                    Mark as done
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

interface GeneralDetailsModalProp {
    isOpen: boolean;
    onOpenChange: () => void;
    enquiryDetails: IGeneralEnquiriesList | null;
}