import axiosInstance from "@/config/axios-instance";

export const getAllTestimonial = () => {
    return axiosInstance.get(`/testimonial/all`);
}

export const createTestimonial = (data: TestimonialPayload) => {
    return axiosInstance.post(`/testimonial/create`, data);
}

export const updateTestimonial = (id: string, data: TestimonialPayload) => {
    return axiosInstance.patch(`/testimonial/update/${id}`, data);
}

export const deleteTestimonial = (id: string) => {
    return axiosInstance.delete(`/testimonial/delete/${id}`);
}

interface TestimonialPayload {
    role: string;
    description: string;
    name: string;
}