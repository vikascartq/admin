import { addToast } from "@heroui/react";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import axios from "axios";

export type ErrObject = Record<string, string>;

export interface ErrResp {
    response: {
        data: {
            data: { [key: string]: string };
            message: string;
            success: boolean;
        };
        status: number;
    };
}

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "ngrok-skip-browser-warning": "true",
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: ErrResp) => {
        if (!error.response) {
            console.error("Network error:", error);
            return Promise.reject(new Error("Network error. Please try again later."));
        }

        const { status, data } = error.response;

        switch (status) {
            case 400:
                addToast({
                    title: data?.message || "Validation error",
                    color: "danger"
                });
                break;

            case 401:
                addToast({
                    title: "Session expired. Please login.",
                    color: "danger"
                });
                break;

            case 403:
                addToast({
                    title: data?.message || "Forbidden. No access.",
                    color: "danger"
                });
                break;

            case 404:
                addToast({
                    title: data?.message || "Resource not found",
                    color: "danger"
                });
                break;

            case 500:
                addToast({
                    title: data?.message || "Server error",
                    color: "danger"
                });
                break;

            default:
                addToast({
                    title: data?.message || "Unknown error",
                    color: "danger"
                });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;