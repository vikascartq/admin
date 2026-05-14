import { useContext } from "react";
import BusinessTable from "./BusinessTable";
import { EnquiriesContext } from "./context/EnquiriesContext";
import GeneralTable from "./GeneralTable";
import JobTable from "./JobTable";

export default function Enquiries() {
    const { enquiryType, setEnquiryType } = useContext(EnquiriesContext);
    return (
        <>
            <div className="p-4">
                <div className="flex items-center justify-between h-9">
                    <div className="text-xl font-semibold">Enquiries</div>
                </div>
                <div className="flex items-center justify-center gap-4 h-10">
                    <button onClick={() => setEnquiryType("general")} className={`${enquiryType === "general" ? "primary-btn" : ""} border border-[#324467] rounded-lg w-full max-w-28 h-full text-sm`}>General</button>
                    <button onClick={() => setEnquiryType("business")} className={`${enquiryType === "business" ? "primary-btn" : ""} border border-[#324467] rounded-lg w-full max-w-28 h-full text-sm`}>Business</button>
                    <button onClick={() => setEnquiryType("job")} className={`${enquiryType === "job" ? "primary-btn" : ""} border border-[#324467] rounded-lg w-full max-w-28 h-full text-sm`}>Job</button>
                </div>
                <div className="overflow-x-auto h-[calc(100vh-85px)] border rounded-lg mt-4">
                    {
                        enquiryType === "general"
                            ? <GeneralTable />
                            : enquiryType === "business"
                                ? <BusinessTable />
                                : <JobTable />
                    }
                </div>
            </div>
        </>
    )
}
