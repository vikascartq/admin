import useTestimonial from "@/dashboard/hooks/useTestimonial";
import { TestimonialContext } from "./TestimonialContext";

export default function TestimonialProvider({ children }: { children: React.ReactNode }) {
    const {
        formik,
        isOpen,
        onOpen,
        onOpenChange,
        handleDelete,
        testimonialList
    } = useTestimonial();
    return (
        <>
            <TestimonialContext.Provider value={{
                formik,
                isOpen,
                onOpen,
                onOpenChange,
                handleDelete,
                testimonialList
            }}>
                {children}
            </TestimonialContext.Provider>
        </>
    )
}
