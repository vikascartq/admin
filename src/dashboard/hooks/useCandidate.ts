// import { createJob, deleteJob, getAllCandidates, updateJob } from "@/services/job.service";
import { createCandidate, deleteCandidate, getAllCandidates, updateCandidate } from "@/services/candidate.service";
import type { ICandidateForm } from "@/types/category.type";
import { addToast, useDisclosure } from "@heroui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const initialValues: ICandidateForm = {
    role: "",
    description: "",
    id: "",
    skills: [],
    imageName: ""
}

export default function useCandidate() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [candidateList, setCandidateList] = useState<CandidateListI[]>([]);

    const formik = useFormik({
        initialValues,
        onSubmit: async (val: ICandidateForm) => {
            const payload = {
                role: val?.role,
                description: val?.description,
                skills: val?.skills,
                imageName: val?.imageName
            };

            if (val?.id) {
                const resp = await updateCandidate(val?.id, payload);
                addToast({
                    title: resp?.data.message || "candidate updated",
                    severity: "success"
                });
            } else {
                const resp = await createCandidate(payload);
                addToast({
                    title: resp?.data.message || "candidate created",
                    severity: "success"
                });
            }
            formik.resetForm();
            onClose()
            handleGetAllCategory();
        }
    });

    async function handleGetAllCategory() {
        const resp = await getAllCandidates();
        setCandidateList(resp?.data?.data || []);
    }


    useEffect(() => {
        const fetchCategory = async () => {
            const resp = await getAllCandidates();
            setCandidateList(resp?.data?.data || []);
        };

        fetchCategory();
    }, [])


    const handleDelete = async () => {
        const resp = await deleteCandidate(formik.values.id);
        addToast({
            title: resp?.data.message || "candidate deleted",
            severity: "success"
        });
        handleGetAllCategory();
    }

    return {
        formik,
        isOpen,
        onOpen,
        onOpenChange,
        handleDelete,
        candidateList
    }
}


export interface CategoryListI {
    name: string;
    _id: string;
    image: string;
}


export interface CandidateListI {
    _id: string;
    role: string;
    description: string;
    skills: string[];
    imageName: string;
}