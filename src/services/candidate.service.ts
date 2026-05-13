import axiosInstance from "@/config/axios-instance";

export const getAllCandidates = () => {
    return axiosInstance.get(`/candidate/all`);
}

export const createCandidate = (data: CandidatePayload) => {
    return axiosInstance.post(`/candidate/create`, data);
}

export const updateCandidate = (id: string, data: CandidatePayload) => {
    return axiosInstance.patch(`/candidate/update/${id}`, data);
}

export const deleteCandidate = (id: string) => {
    return axiosInstance.delete(`/candidate/delete/${id}`);
}

interface CandidatePayload {
    role: string;
    description: string;
    imageName: string;
    skills: string[];
}