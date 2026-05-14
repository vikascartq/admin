import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@heroui/react";
import { useContext } from "react";
import type { IJobEnquiriesList } from "../hooks/useEnquiries";
import { EnquiriesContext } from "./context/EnquiriesContext";

export default function JobDetailsModal({ isOpen, onOpenChange, enquiryDetails }: JobDetailsModalProp) {
    const { handleJobStatus } = useContext(EnquiriesContext);
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
                                Job Enquiry Details
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
                                        <div className="text-[14px]">WhatsApp Number : </div>
                                        <div className="text-[14px] text-gray-500 font-medium">
                                            {enquiryDetails?.whatsAppNumber || "--"}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-[14px]">Job Title : </div>
                                        <div className="text-[14px] text-gray-500 font-medium">
                                            {enquiryDetails?.jobTitle || "--"}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-[14px]">Expected Salary : </div>
                                        <div className="text-[14px] text-gray-500 font-medium">
                                            {enquiryDetails?.expectedSalary || "--"}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-[14px]">Current Location : </div>
                                        <div className="text-[14px] text-gray-500 font-medium">
                                            {enquiryDetails?.currentLocation || "--"}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-[14px]">Interested Job Title : </div>
                                        <div className="text-[14px] text-gray-500 font-medium">
                                            {enquiryDetails?.interestedJobTitle || "--"}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-[14px]">Work Experience In Brief : </div>
                                        <div className="text-[14px] text-gray-500 font-medium">
                                            {enquiryDetails?.workExperienceInBrief || "--"}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="text-[14px]">CV : </div>
                                        <div className="text-[14px] text-gray-500 font-medium">
                                            <a href={enquiryDetails?.cv} target="_blank" rel="noopener noreferrer">view</a>
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
                                            await handleJobStatus(enquiryDetails?._id);
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

interface JobDetailsModalProp {
    isOpen: boolean;
    onOpenChange: () => void;
    enquiryDetails: IJobEnquiriesList | null;
}