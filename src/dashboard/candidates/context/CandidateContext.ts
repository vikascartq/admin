import type { CandidateListI } from "@/dashboard/hooks/useCandidate";
import type { ICandidateForm } from "@/types/category.type";
import type { FormikProps } from "formik";
import { createContext } from "react";

export interface CandidateContextI {
    formik: FormikProps<ICandidateForm>;
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
    handleDelete: () => Promise<void>;
    candidateList: CandidateListI[];
}

const initVal: CandidateContextI = {
    formik: {} as FormikProps<ICandidateForm>,
    isOpen: false,
    onOpen: () => { },
    onOpenChange: () => { },
    handleDelete: async () => { },
    candidateList: []
}

export const CandidateContext = createContext<CandidateContextI>(initVal);