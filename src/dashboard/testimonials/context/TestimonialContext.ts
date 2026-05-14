import type { TestimonialListI } from "@/dashboard/hooks/useTestimonial";
import type { ITestimonialForm } from "@/types/category.type";
import type { FormikProps } from "formik";
import { createContext } from "react";

export interface TestimonialContextI {
    formik: FormikProps<ITestimonialForm>;
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
    handleDelete: () => Promise<void>;
    testimonialList: TestimonialListI[];
}

const initVal: TestimonialContextI = {
    formik: {} as FormikProps<ITestimonialForm>,
    isOpen: false,
    onOpen: () => { },
    onOpenChange: () => { },
    handleDelete: async () => { },
    testimonialList: []
}

export const TestimonialContext = createContext<TestimonialContextI>(initVal);