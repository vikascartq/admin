import axiosInstance from "@/config/axios-instance";

export const checkAuthUser = () => {
    return axiosInstance.get(`/admin/check-token`);
}

export const adminLogin = (data: adminLoginI) => {
    return axiosInstance.post(`/admin/login`, data);
}

export const verifyEmailOtp = (data: verifyEmailOtpI) => {
    return axiosInstance.post(`/admin/verify-otp`, data);
}

export const verify2FAOtp = (data: verify2FAI) => {
    return axiosInstance.post(`/admin/verify-2fa`, data);
}

export const logoutApi = () => {
    return axiosInstance.post("/admin/logout")
}

interface adminLoginI {
    email: string,
    password: string
}

interface verifyEmailOtpI {
    email: string;
    otp: string;
}

interface verify2FAI {
    adminId: string,
    token: string
}