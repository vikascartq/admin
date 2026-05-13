import axiosInstance from "@/config/axios-instance";

export const getAllJobs = () => {
    return axiosInstance.get(`/job/all`);
}

export const createJob = (data: JobPayload) => {
    return axiosInstance.post(`/job/create`, data);
}

export const updateJob = (id: string, data: JobPayload) => {
    return axiosInstance.patch(`/job/update/${id}`, data);
}

export const deleteJob = (id: string) => {
    return axiosInstance.delete(`/job/delete/${id}`);
}

interface JobPayload {
    name: string;
    location: string;
    skills: string[];
}