import useTrends from "@/dashboard/hooks/useTrend";
import { TrendsContext } from "./TrendsContext";

export default function TrendsProvider({ children }: { children: React.ReactNode }) {
    const {
        formik,
        isOpen,
        onOpen,
        onOpenChange,
        handleDelete,
        trendList,
        page,
        hasMore,
        handlePageChange
    } = useTrends();
    return (
        <>
            <TrendsContext.Provider value={{
                formik,
                isOpen,
                onOpen,
                onOpenChange,
                handleDelete,
                trendList,
                page,
                hasMore,
                handlePageChange
            }}>
                {children}
            </TrendsContext.Provider>
        </>
    )
}
