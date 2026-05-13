import useCategory from "@/dashboard/hooks/useCategory";
import { JobsContext } from "./JobsContext";

export default function JobsProvider({ children }: { children: React.ReactNode }) {
    const {
        formik,
        isOpen,
        onOpen,
        onOpenChange,
        handleDelete,
        jobList
    } = useCategory();
    return (
        <>
            <JobsContext.Provider value={{
                formik,
                isOpen,
                onOpen,
                onOpenChange,
                handleDelete,
                jobList
            }}>
                {children}
            </JobsContext.Provider>
        </>
    )
}
