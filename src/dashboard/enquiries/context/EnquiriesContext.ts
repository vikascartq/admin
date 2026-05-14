import type { IBusinessEnquiriesList, IGeneralEnquiriesList, IJobEnquiriesList } from "@/dashboard/hooks/useEnquiries";
import { createContext } from "react";

export interface IEnquiriesContext {
    enquiryType: "general" | "business" | "job";
    setEnquiryType: React.Dispatch<React.SetStateAction<"general" | "business" | "job">>;
    handleGeneralEnquiries: () => Promise<void>;
    handleBusinessEnquiries: () => Promise<void>;
    handleJobEnquiries: () => Promise<void>;
    generalEnquiriesList: IGeneralEnquiriesList[]
    businessEnquiriesList: IBusinessEnquiriesList[]
    jobEnquiriesList: IJobEnquiriesList[];
    handleGeneralStatus: (id: string) => Promise<void>;
    handleBusinessStatus: (id: string) => Promise<void>;
    handleJobStatus: (id: string) => Promise<void>;

}

const init: IEnquiriesContext = {
    enquiryType: "general",
    setEnquiryType: () => { },
    handleGeneralEnquiries: async () => { },
    handleBusinessEnquiries: async () => { },
    handleJobEnquiries: async () => { },
    generalEnquiriesList: [],
    businessEnquiriesList: [],
    jobEnquiriesList: [],
    handleBusinessStatus: async () => { },
    handleGeneralStatus: async () => { },
    handleJobStatus: async () => { }
}

export const EnquiriesContext = createContext<IEnquiriesContext>(init);