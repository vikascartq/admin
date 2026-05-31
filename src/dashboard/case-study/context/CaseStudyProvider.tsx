import type { ReactNode } from "react";
import useCaseStudy from "@/dashboard/hooks/useCaseStudy";
import { CaseStudyContext } from "./CaseStudyContext";

export default function CaseStudyProvider({ children }: { children: ReactNode }) {
    const {
        formik,
        isOpen,
        onOpen,
        onOpenChange,
        handleDelete,
        caseStudyList,
        page,
        hasMore,
        handlePageChange
    } = useCaseStudy();

    return (
        <CaseStudyContext.Provider value={{
            formik,
            isOpen,
            onOpen,
            onOpenChange,
            handleDelete,
            caseStudyList,
            page,
            hasMore,
            handlePageChange
        }}>
            {children}
        </CaseStudyContext.Provider>
    );
}
