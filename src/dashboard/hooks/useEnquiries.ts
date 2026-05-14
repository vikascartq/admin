import { getAllBusinessEnquiries, getAllGeneralEnquiries, getAllJobEnquiries, updateBusinessStatus, updateGeneralStatus, updateJobStatus } from "@/services/enquiries.service";
import { useState } from "react";

export default function useEnquiries() {
    const [enquiryType, setEnquiryType] = useState<"general" | "business" | "job">("general");
    const [generalEnquiriesList, setGeneralEnquiriesList] = useState<IGeneralEnquiriesList[]>([]);
    const [businessEnquiriesList, setBusinessEnquiriesList] = useState<IBusinessEnquiriesList[]>([]);
    const [jobEnquiriesList, setJobEnquiriesList] = useState<IJobEnquiriesList[]>([]);

    async function handleGeneralEnquiries() {
        const resp = await getAllGeneralEnquiries();
        setGeneralEnquiriesList(resp?.data?.data || []);
    }

    async function handleBusinessEnquiries() {
        const resp = await getAllBusinessEnquiries();
        setBusinessEnquiriesList(resp?.data?.data || []);
    }

    async function handleJobEnquiries() {
        const resp = await getAllJobEnquiries();
        setJobEnquiriesList(resp?.data?.data || []);
    }

    async function handleGeneralStatus(id: string) {
        await updateGeneralStatus(id);
        handleGeneralEnquiries();
    }

    async function handleBusinessStatus(id: string) {
        await updateBusinessStatus(id);
        handleBusinessEnquiries();
    }
    async function handleJobStatus(id: string) {
        await updateJobStatus(id);
        handleJobEnquiries();
    }

    return {
        enquiryType,
        setEnquiryType,
        handleGeneralEnquiries,
        handleBusinessEnquiries,
        handleJobEnquiries,
        generalEnquiriesList,
        businessEnquiriesList,
        jobEnquiriesList,
        handleGeneralStatus,
        handleBusinessStatus,
        handleJobStatus
    }
}

export interface IGeneralEnquiriesList {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    companyName: string;
    message: string;
    status: string;
}

export interface IBusinessEnquiriesList {
    _id: string;
    name: string;
    email: string;
    contactNumber: string;
    companyName: string;
    service: string;
    status: string;
}

export interface IJobEnquiriesList {
    _id: string;
    name: string;
    email: string;
    whatsAppNumber: string;
    companyName: string;
    jobTitle: string;
    expectedSalary: string;
    currentLocation: string;
    interestedJobTitle: string;
    workExperienceInBrief: string;
    cv: string;
    status: string;
}