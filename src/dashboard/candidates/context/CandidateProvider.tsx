import useCandidate from "@/dashboard/hooks/useCandidate";
import { CandidateContext } from "./CandidateContext";

export default function CandidateProvider({ children }: { children: React.ReactNode }) {
    const {
        formik,
        isOpen,
        onOpen,
        onOpenChange,
        handleDelete,
        candidateList
    } = useCandidate();
    return (
        <>
            <CandidateContext.Provider value={{
                formik,
                isOpen,
                onOpen,
                onOpenChange,
                handleDelete,
                candidateList
            }}>
                {children}
            </CandidateContext.Provider>
        </>
    )
}
