import axiosInstance from "@/config/axios-instance";

export const getAllGeneralEnquiries = () => {
    return axiosInstance.get(`/enquiry/general/all`);
}


export const getAllBusinessEnquiries = () => {
    return axiosInstance.get(`/enquiry/business/all`);
}

export const getAllJobEnquiries = () => {
    return axiosInstance.get(`/enquiry/job/all`);
}

export const updateBusinessStatus = async (id: string) => {
    return axiosInstance.patch(`/enquiry/business/${id}`)
}

export const updateGeneralStatus = async (id: string) => {
    return axiosInstance.patch(`/enquiry/general/${id}`)
}
export const updateJobStatus = async (id: string) => {
    return axiosInstance.patch(`/enquiry/job/${id}`)
}