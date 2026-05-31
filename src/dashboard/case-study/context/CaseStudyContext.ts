import type { FormikProps } from "formik";
import type { ICaseStudyForm } from "@/types/caseStudy.type";
import { createContext } from "react";

export interface CaseStudyListItem {
    _id: string;
    title: string;
    subHeading: string;
    challenge: string;
    createdAt: string;
}

export interface CaseStudyContextI {
    formik: FormikProps<ICaseStudyForm>;
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
    handleDelete: () => Promise<void>;
    handlePageChange: (page: number) => Promise<void>;
    caseStudyList: CaseStudyListItem[];
    page: number;
    hasMore: boolean;
}

const initVal: CaseStudyContextI = {
    formik: {} as FormikProps<ICaseStudyForm>,
    isOpen: false,
    onOpen: () => { },
    onOpenChange: () => { },
    handleDelete: async () => { },
    handlePageChange: async () => { },
    caseStudyList: [],
    page: 1,
    hasMore: false
};

export const CaseStudyContext = createContext<CaseStudyContextI>(initVal);
