import { useDisclosure } from "@heroui/react";
import { useContext, useEffect, useState } from "react";
import type { IJobEnquiriesList } from "../hooks/useEnquiries";
import { EnquiriesContext } from "./context/EnquiriesContext";
import JobDetailsModal from "./JobDetailsModal";

export default function JobTable() {
    const { handleJobEnquiries, jobEnquiriesList } = useContext(EnquiriesContext);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [details, setDetails] = useState<IJobEnquiriesList | null>(null);

    useEffect(() => {
        handleJobEnquiries();
    }, [])
    return (
        <>
            <table className="min-w-full">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left sticky top-0 bg-gray-100 z-10 w-12">
                            S.No
                        </th>
                        <th className="px-4 py-2 text-left sticky top-0 bg-gray-100 z-10">
                            Name
                        </th>
                        <th className="px-4 py-2 text-left sticky top-0 bg-gray-100 z-10">
                            Status
                        </th>
                        <th className="px-4 py-2 sticky top-0 bg-gray-100 z-10 text-end">
                            Details
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        jobEnquiriesList.map((item, i) => (
                            <tr className="border-t" key={`job-${i + 1}`}>
                                <td className="px-4 py-2">{i + 1}</td>
                                <td className="px-4 py-2">{item?.name || "-"}</td>
                                <td className="px-4 py-2">{item?.status || "-"}</td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center justify-end gap-x-4">
                                        <button onClick={() => {
                                            setDetails(item);
                                            onOpen();
                                        }}>view</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <JobDetailsModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                enquiryDetails={details}
            />
        </>
    )
}
