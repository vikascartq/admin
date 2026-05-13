import type { JobListI } from "@/dashboard/hooks/useCategory";
import type { CategoryInitI } from "@/types/category.type";
import type { FormikProps } from "formik";
import { createContext } from "react";

export interface JobsContextI {
    formik: FormikProps<CategoryInitI>;
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
    handleDelete: () => Promise<void>;
    jobList: JobListI[];
}

const initVal: JobsContextI = {
    formik: {} as FormikProps<CategoryInitI>,
    isOpen: false,
    onOpen: () => { },
    onOpenChange: () => { },
    handleDelete: async () => { },
    jobList: []
}

export const JobsContext = createContext<JobsContextI>(initVal);