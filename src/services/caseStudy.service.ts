import axiosInstance from "@/config/axios-instance";

export const getAllStudy = (page: number, limit: number) => {
    return axiosInstance.get(`/case-study/list?page=${page}&limit=${limit}`);
}
export const getAllCaseStudies = (page: number, limit: number) => {
    return axiosInstance.get(`/case-study/list?page=${page}&limit=${limit}`);
}
export const getAllStudyDetails = (id: string) => {
    return axiosInstance.get(`/case-study/${id}`);
}
export const getCaseStudyDetails = (id: string) => {
    return axiosInstance.get(`/case-study/${id}`);
}

export const createStudy = (data: CaseStudyData) => {
    return axiosInstance.post(`/case-study`, data);
}
export const createCaseStudy = (data: CaseStudyData) => {
    return axiosInstance.post(`/case-study`, data);
}

export const updateStudy = (id: string, data: CaseStudyData) => {
    return axiosInstance.patch(`/case-study/${id}`, data);
}
export const updateCaseStudy = (id: string, data: CaseStudyData) => {
    return axiosInstance.patch(`/case-study/${id}`, data);
}

export const deleteStudy = (id: string) => {
    return axiosInstance.delete(`/case-study/${id}`);
}
export const deleteCaseStudy = (id: string) => {
    return axiosInstance.delete(`/case-study/${id}`);
}


export interface CaseStudyItem {
    order: number;
    title: string;
    description: string;
    list?: IList[];
}

export interface IList {
    icon: string; // this will be svg icon name
    item: string;
}

export interface CaseStudyData {
  title: string;
  subHeading: string;
  challenge: string;
  description: string;
  content: CaseStudyItem[];
}