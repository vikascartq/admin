import { getAllCaseStudies, createCaseStudy, getCaseStudyDetails, updateCaseStudy, deleteCaseStudy } from "@/services/caseStudy.service";
import type { ICaseStudyForm } from "@/types/caseStudy.type";
import type { CaseStudyListItem } from "@/dashboard/case-study/context/CaseStudyContext";
import { addToast, useDisclosure } from "@heroui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

const initialValues: ICaseStudyForm = {
  title: "",
  subHeading: "",
  challenge: "",
  description: "",
  content: [
    { order: 1, title: "Client Situation", description: "", list: [] },
    { order: 2, title: "Objectives", description: "", list: [] },
    { order: 3, title: "Approach", description: "", list: [] },
    { order: 4, title: "Impact", description: "", list: [] }
  ]
};

export default function useCaseStudy() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [caseStudyList, setCaseStudyList] = useState<CaseStudyListItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values: ICaseStudyForm) => {
      const payload = {
        title: values.title,
        subHeading: values.subHeading,
        challenge: values.challenge,
        description: values.description,
        content: values.content.map((item, index) => ({
          order: index + 1,
          title: item.title,
          description: item.description,
          list: (item.list || [])
            .filter(Boolean)
            .map((entry) => ({ icon: "file-icon", item: entry }))
        }))
      };

      try {
        if (values._id) {
          const resp = await updateCaseStudy(values._id, payload);
          addToast({ title: resp?.data?.message || "Case study updated", color: "success" });
        } else {
          const resp = await createCaseStudy(payload);
          addToast({ title: resp?.data?.message || "Case study created", color: "success" });
        }
        formik.resetForm();
        onClose();
        await fetchCaseStudyPage(page);
      } catch (error) {
        addToast({ title: "Unable to save case study", color: "danger" });
      }
    }
  });

  async function fetchCaseStudyPage(pageNumber = 1) {
    const resp = await getAllCaseStudies(pageNumber, limit);
    const caseStudies = resp?.data?.data?.caseStudies || [];
    const pagination = resp?.data?.data?.pagination || {};
    setCaseStudyList(caseStudies);
    setPage(pageNumber);
    setHasMore(pagination.hasNextPage || false);
  }

  useEffect(() => {
    fetchCaseStudyPage(1);
  }, []);

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1) {
      return;
    }
    await fetchCaseStudyPage(newPage);
  };

  const handleDelete = async () => {
    if (!formik.values._id) {
      return;
    }
    const resp = await deleteCaseStudy(formik.values._id);
    addToast({ title: resp?.data?.message || "Case study deleted", color: "success" });
    const nextPage = caseStudyList.length === 1 && page > 1 ? page - 1 : page;
    await fetchCaseStudyPage(nextPage);
  };

  return {
    formik,
    isOpen,
    onOpen,
    onOpenChange,
    handleDelete,
    caseStudyList,
    page,
    hasMore,
    handlePageChange
  };
}

