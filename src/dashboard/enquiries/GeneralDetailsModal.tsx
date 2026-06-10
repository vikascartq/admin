import { useContext } from "react";
import { EnquiriesContext } from "./context/EnquiriesContext";
import { BaseModal, Button } from "@/ui";
import type { IGeneralEnquiriesList } from "../hooks/useEnquiries";

interface GeneralDetailsModalProp {
  isOpen: boolean;
  onOpenChange: () => void;
  enquiryDetails: IGeneralEnquiriesList | null;
}

export default function GeneralDetailsModal({
  isOpen,
  onOpenChange,
  enquiryDetails,
}: GeneralDetailsModalProp) {
  const { handleGeneralStatus } = useContext(EnquiriesContext);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onOpenChange}
      title="General Enquiry Details"
      size="md"
      footer={
        <Button
          variant="primary"
          disabled={enquiryDetails?.status === "done"}
          onClick={async () => {
            if (enquiryDetails?._id) {
              await handleGeneralStatus(enquiryDetails._id);
              onOpenChange();
            }
          }}
        >
          {enquiryDetails?.status === "done" ? "Already Done" : "Mark as Done"}
        </Button>
      }
    >
      <dl className="grid grid-cols-1 gap-4">
        <DetailRow label="Name" value={enquiryDetails?.name} />
        <DetailRow label="Email" value={enquiryDetails?.email} />
        <DetailRow label="Company Name" value={enquiryDetails?.companyName} />
        <DetailRow label="Phone Number" value={enquiryDetails?.phoneNumber} />
        <DetailRow label="Message" value={enquiryDetails?.message} />
        <DetailRow label="Status" value={enquiryDetails?.status} />
      </dl>
    </BaseModal>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-2">
      <dt className="text-sm font-medium text-[#374151] dark:text-[#D1D5DB]">{label}:</dt>
      <dd className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">{value || "--"}</dd>
    </div>
  );
}
