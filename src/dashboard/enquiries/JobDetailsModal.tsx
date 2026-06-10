import { useContext } from "react";
import { EnquiriesContext } from "./context/EnquiriesContext";
import { BaseModal, Button } from "@/ui";
import type { IJobEnquiriesList } from "../hooks/useEnquiries";

interface JobDetailsModalProp {
  isOpen: boolean;
  onOpenChange: () => void;
  enquiryDetails: IJobEnquiriesList | null;
}

export default function JobDetailsModal({
  isOpen,
  onOpenChange,
  enquiryDetails,
}: JobDetailsModalProp) {
  const { handleJobStatus } = useContext(EnquiriesContext);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onOpenChange}
      title="Job Enquiry Details"
      size="md"
      footer={
        <Button
          variant="primary"
          disabled={enquiryDetails?.status === "done"}
          onClick={async () => {
            if (enquiryDetails?._id) {
              await handleJobStatus(enquiryDetails._id);
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
        <DetailRow label="WhatsApp Number" value={enquiryDetails?.whatsAppNumber} />
        <DetailRow label="Job Title" value={enquiryDetails?.jobTitle} />
        <DetailRow label="Expected Salary" value={enquiryDetails?.expectedSalary} />
        <DetailRow label="Current Location" value={enquiryDetails?.currentLocation} />
        <DetailRow label="Interested Job Title" value={enquiryDetails?.interestedJobTitle} />
        <DetailRow label="Work Experience" value={enquiryDetails?.workExperienceInBrief} />
        <DetailRow
          label="CV"
          value={
            enquiryDetails?.cv
              ? undefined
              : "--"
          }
        >
          {enquiryDetails?.cv && (
            <a
              href={enquiryDetails.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3B82F6] dark:text-[#60A5FA] hover:underline"
            >
              View CV
            </a>
          )}
        </DetailRow>
        <DetailRow label="Status" value={enquiryDetails?.status} />
      </dl>
    </BaseModal>
  );
}

function DetailRow({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-2">
      <dt className="text-sm font-medium text-[#374151] dark:text-[#D1D5DB]">{label}:</dt>
      <dd className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
        {children || value || "--"}
      </dd>
    </div>
  );
}
