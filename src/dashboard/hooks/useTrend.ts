
import { getAllTrends, createTrend, updateTrend, deleteTrend } from "@/services/trend.service";
import type { ITrendItem, ITrendsForm } from "@/types/trend.type";
import type { TrendListItem } from "@/dashboard/trends/context/TrendsContext";
import { addToast, useDisclosure } from "@heroui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const initialValues: ITrendsForm = {
    _id: "",
    title: "",
    subHeading: "",
    description: "",
    content: [{
        order: 0,
        heading: "",
        description: "",
        list: []
    }]
}

export default function useTrend() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [trendList, setTrendList] = useState<TrendListItem[]>([]);
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const formik = useFormik({
        initialValues,
        onSubmit: async (val: ITrendsForm) => {
            const payload = {
                title: val?.title,
                subHeading: val?.subHeading,
                description: val?.description,
                content: val?.content.map((item, index) => ({
                    order: index,
                    heading: item.heading,
                    description: item.description,
                    list: item.list || []
                })) as ITrendItem[]
            };

            if (val?._id) {
                const resp = await updateTrend(val?._id, payload);
                addToast({
                    title: resp?.data.message || "Trend updated",
                    severity: "success"
                });
            } else {
                const resp = await createTrend(payload);
                addToast({
                    title: resp?.data.message || "Trend created",
                    severity: "success"
                });
            }
            formik.resetForm();
            onClose();
            await fetchTrendPage(page);
        }
    });

    async function fetchTrendPage(pageNumber = 1) {
        const resp = await getAllTrends(pageNumber, limit);
        const trends = resp?.data?.data?.trends || [];
        const pagination = resp?.data?.data?.pagination || {};
        setTrendList(trends);
        setPage(pageNumber);
        setHasMore(pagination.hasNextPage || false);
    }

    useEffect(() => {
        fetchTrendPage(1);
    }, []);

    const handlePageChange = async (newPage: number) => {
        if (newPage < 1) {
            return;
        }
        await fetchTrendPage(newPage);
    }

    const handleDelete = async () => {
        if (!formik.values._id) {
            return;
        }
        const resp = await deleteTrend(formik.values._id);
        addToast({
            title: resp?.data.message || "Trend deleted",
            severity: "success"
        });
        const nextPage = trendList.length === 1 && page > 1 ? page - 1 : page;
        await fetchTrendPage(nextPage);
    }

    return {
        formik,
        isOpen,
        onOpen,
        onOpenChange,
        handleDelete,
        trendList,
        page,
        hasMore,
        handlePageChange
    };
}

