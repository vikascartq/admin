import axiosInstance from "@/config/axios-instance";

export const getAllTrends = (page: number, limit: number) => {
    return axiosInstance.get(`/trend/list?page=${page}&limit=${limit}`);
}
export const getAllTrendDetails = (id: string) => {
    return axiosInstance.get(`/trend/${id}`);
}

export const createTrend = (data: TrendsData) => {
    return axiosInstance.post(`/trend`, data);
}

export const updateTrend = (id: string, data: TrendsData) => {
    return axiosInstance.patch(`/trend/${id}`, data);
}

export const deleteTrend = (id: string) => {
    return axiosInstance.delete(`/trend/${id}`);
}

export interface TrendItem {
  order: number;
  heading: string;
  description: string;
  list?: string[];
}

export interface TrendsData {
  title: string;
  subHeading: string;
  description: string;
  content: TrendItem[];
}