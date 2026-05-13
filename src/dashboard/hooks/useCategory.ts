import { createJob, deleteJob, getAllJobs, updateJob } from "@/services/job.service";
import type { CategoryInitI } from "@/types/category.type";
import { addToast, useDisclosure } from "@heroui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const initialValues: CategoryInitI = {
    jobName: "",
    location: "",
    id: "",
    skills: []
}

export default function useCategory() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [jobList, setJobList] = useState<JobListI[]>([]);

    const formik = useFormik({
        initialValues,
        onSubmit: async (val: CategoryInitI) => {
            const payload = {
                name: val?.jobName,
                location: val?.location,
                skills: val?.skills
            };

            if (val?.id) {
                const resp = await updateJob(val?.id, payload);
                addToast({
                    title: resp?.data.message || "job updated",
                    color: "success"
                });
            } else {
                const resp = await createJob(payload);
                addToast({
                    title: resp?.data.message || "job created",
                    color: "success"
                });
            }
            formik.resetForm();
            onClose()
            handleGetAllCategory();
        }
    });

    async function handleGetAllCategory() {
        const resp = await getAllJobs();
        setJobList(resp?.data?.data || []);
    }


    useEffect(() => {
        const fetchCategory = async () => {
            const resp = await getAllJobs();
            setJobList(resp?.data?.data || []);
        };

        fetchCategory();
    }, [])


    const handleDelete = async () => {
        const resp = await deleteJob(formik.values.id);
        addToast({
            title: resp?.data.message || "job deleted",
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
        jobList
    }
}


export interface CategoryListI {
    name: string;
    _id: string;
    image: string;
}


export interface JobListI {
    _id: string;
    name: string;
    location: string;
    skills: string[];
}