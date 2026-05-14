// import { createJob, deleteJob, getAllCandidates, updateJob } from "@/services/job.service";
import { createTestimonial, deleteTestimonial, getAllTestimonial, updateTestimonial } from "@/services/testimonial.service";
import type { ITestimonialForm } from "@/types/category.type";
import { addToast, useDisclosure } from "@heroui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const initialValues: ITestimonialForm = {
    role: "",
    description: "",
    id: "",
    name: ""
}

export default function useTestimonial() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [testimonialList, setTestimonialList] = useState<TestimonialListI[]>([]);

    const formik = useFormik({
        initialValues,
        onSubmit: async (val: ITestimonialForm) => {
            const payload = {
                role: val?.role,
                description: val?.description,
                name: val?.name
            };

            if (val?.id) {
                const resp = await updateTestimonial(val?.id, payload);
                addToast({
                    title: resp?.data.message || "candidate updated",
                    color: "success"
                });
            } else {
                const resp = await createTestimonial(payload);
                addToast({
                    title: resp?.data.message || "candidate created",
                    color: "success"
                });
            }
            formik.resetForm();
            onClose()
            handleGetAllCategory();
        }
    });

    async function handleGetAllCategory() {
        const resp = await getAllTestimonial();
        setTestimonialList(resp?.data?.data || []);
    }


    useEffect(() => {
        const fetchCategory = async () => {
            const resp = await getAllTestimonial();
            setTestimonialList(resp?.data?.data || []);
        };

        fetchCategory();
    }, [])


    const handleDelete = async () => {
        const resp = await deleteTestimonial(formik.values.id);
        addToast({
            title: resp?.data.message || "candidate deleted",
            color: "success"
        });
        handleGetAllCategory();
    }

    return {
        formik,
        isOpen,
        onOpen,
        onOpenChange,
        handleDelete,
        testimonialList
    }
}


export interface CategoryListI {
    name: string;
    _id: string;
    image: string;
}


export interface TestimonialListI {
    _id: string;
    role: string;
    description: string;
    name: string;
}