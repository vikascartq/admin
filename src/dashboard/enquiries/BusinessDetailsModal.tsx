import { useContext } from "react";
import { EnquiriesContext } from "./context/EnquiriesContext";
import { BaseModal, Button } from "@/ui";
import type { IBusinessEnquiriesList } from "../hooks/useEnquiries";

interface BusinessDetailsModalProp {
  isOpen: boolean;
  onOpenChange: () => void;
  enquiryDetails: IBusinessEnquiriesList | null;
}

export default function BusinessDetailsModal({
  isOpen,
  onOpenChange,
  enquiryDetails,
}: BusinessDetailsModalProp) {
  const { handleBusinessStatus } = useContext(EnquiriesContext);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onOpenChange}
      title="Business Enquiry Details"
      size="md"
      footer={
        <Button
          variant="primary"
          disabled={enquiryDetails?.status === "done"}
          onClick={async () => {
            if (enquiryDetails?._id) {
              await handleBusinessStatus(enquiryDetails._id);
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
        <DetailRow label="Contact Number" value={enquiryDetails?.contactNumber} />
        <DetailRow label="Service" value={enquiryDetails?.service} />
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
