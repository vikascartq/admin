import type { FormikProps } from "formik";
import type { ITrendsForm } from "@/types/trend.type";
import { createContext } from "react";

export interface TrendListItem {
    _id: string;
    title: string;
    subHeading: string;
    createdAt: string;
}

export interface TrendsContextI {
    formik: FormikProps<ITrendsForm>;
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: () => void;
    handleDelete: () => Promise<void>;
    handlePageChange: (page: number) => Promise<void>;
    trendList: TrendListItem[];
    page: number;
    hasMore: boolean;
}

const initVal: TrendsContextI = {
    formik: {} as FormikProps<ITrendsForm>,
    isOpen: false,
    onOpen: () => { },
    onOpenChange: () => { },
    handleDelete: async () => { },
    handlePageChange: async () => { },
    trendList: [],
    page: 1,
    hasMore: false,
}

export const TrendsContext = createContext<TrendsContextI>(initVal);