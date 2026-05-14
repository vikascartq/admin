import useEnquiries from "@/dashboard/hooks/useEnquiries";
import { EnquiriesContext } from "./EnquiriesContext";

export default function EnquiriesProvider({
    children
}: { children: React.ReactNode }) {
    const {
        enquiryType,
        setEnquiryType,
        handleBusinessEnquiries,
        handleGeneralEnquiries,
        handleJobEnquiries,
        jobEnquiriesList,
        businessEnquiriesList,
        generalEnquiriesList,
        handleBusinessStatus,
        handleGeneralStatus,
        handleJobStatus
    } = useEnquiries();
    return (
        <>
            <EnquiriesContext.Provider value={{
                enquiryType,
                setEnquiryType,
                handleBusinessEnquiries,
                handleGeneralEnquiries,
                handleJobEnquiries,
                jobEnquiriesList,
                businessEnquiriesList,
                generalEnquiriesList,
                handleBusinessStatus,
                handleGeneralStatus,
                handleJobStatus
            }}>
                {children}
            </EnquiriesContext.Provider>
        </>
    )
}
