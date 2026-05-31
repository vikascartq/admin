import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { addToast, Button, Input, Textarea } from "@heroui/react";
import { createCaseStudy, getCaseStudyDetails, updateCaseStudy } from "@/services/caseStudy.service";
import type { ICaseStudyForm } from "@/types/caseStudy.type";

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

interface CaseStudyFormProps {
    mode: "add" | "edit";
}

export default function CaseStudyForm({ mode }: CaseStudyFormProps) {
    const navigate = useNavigate();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);

    const formik = useFormik<ICaseStudyForm>({
        initialValues,
        onSubmit: async (values) => {
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
                        .map((value) => ({ icon: "file-icon", item: value }))
                }))
            };

            try {
                if (mode === "edit" && params.id) {
                    const resp = await updateCaseStudy(params.id, payload);
                    addToast({ title: resp?.data?.message || "Case study updated", color: "success" });
                } else {
                    const resp = await createCaseStudy(payload);
                    addToast({ title: resp?.data?.message || "Case study created", color: "success" });
                }
                navigate("/case-study");
            } catch (error) {
                addToast({ title: "Unable to save case study", color: "danger" });
            }
        }
    });

    useEffect(() => {
        if (mode === "edit") {
            const caseStudyId = params.id;
            if (!caseStudyId) {
                navigate("/case-study");
                return;
            }

            const loadCaseStudy = async () => {
                setIsLoading(true);
                try {
                    const resp = await getCaseStudyDetails(caseStudyId);
                    const caseStudy = resp?.data?.data;
                    if (!caseStudy) {
                        addToast({ title: "Case study not found", color: "danger" });
                        navigate("/case-study");
                        return;
                    }
                    formik.setValues({
                        _id: caseStudy._id,
                        title: caseStudy.title || "",
                        subHeading: caseStudy.subHeading || "",
                        challenge: caseStudy.challenge || "",
                        description: caseStudy.description || "",
                        content: Array.isArray(caseStudy.content) && caseStudy.content.length >= 4
                            ? caseStudy.content.slice(0, 4).map((item: any, index: number) => ({
                                order: item.order || index + 1,
                                title: item.title || initialValues.content[index].title,
                                description: item.description || "",
                                list: Array.isArray(item.list) ? item.list.map((entry: any) => entry?.item || "") : []
                            }))
                            : initialValues.content
                    });
                } catch (err) {
                    addToast({ title: "Unable to load case study", color: "danger" });
                    navigate("/case-study");
                } finally {
                    setIsLoading(false);
                }
            };

            loadCaseStudy();
        }
    }, [mode, params.id, navigate]);

    const handleStepOneNext = () => {
        formik.setTouched({ title: true, subHeading: true, challenge: true, description: true });

        if (!formik.values.title.trim() || !formik.values.subHeading.trim() || !formik.values.challenge.trim() || !formik.values.description.trim()) {
            addToast({ title: "Please complete step one", color: "danger" });
            return;
        }
        setStep(2);
    };

    const updateSectionField = (index: number, field: keyof ICaseStudyForm["content"][number], value: string) => {
        const updated = [...formik.values.content];
        updated[index] = { ...updated[index], [field]: value };
        formik.setFieldValue("content", updated);
    };

    const addSectionListItem = (sectionIndex: number) => {
        const updated = [...formik.values.content];
        const section = { ...updated[sectionIndex] };
        section.list = [...(section.list || []), ""];
        updated[sectionIndex] = section;
        formik.setFieldValue("content", updated);
    };

    const updateSectionListItem = (sectionIndex: number, itemIndex: number, value: string) => {
        const updated = [...formik.values.content];
        const section = { ...updated[sectionIndex] };
        section.list = [...(section.list || [])];
        section.list[itemIndex] = value;
        updated[sectionIndex] = section;
        formik.setFieldValue("content", updated);
    };

    const removeSectionListItem = (sectionIndex: number, itemIndex: number) => {
        const updated = [...formik.values.content];
        const section = { ...updated[sectionIndex] };
        section.list = section.list?.filter((_, idx) => idx !== itemIndex) || [];
        updated[sectionIndex] = section;
        formik.setFieldValue("content", updated);
    };

    if (mode === "edit" && isLoading) {
        return (
            <div className="p-4">
                <div className="text-lg font-semibold mb-4">Loading case study...</div>
                <div>Please wait while the case study loads.</div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <div className="text-xl font-semibold">{mode === "add" ? "Add Case Study" : "Edit Case Study"}</div>
                    <div className="text-sm text-gray-500">Step {step} of 2</div>
                </div>
                <Button
                    type="button"
                    onPress={() => navigate("/case-study")}
                    className="border rounded px-4 py-2 text-sm"
                >
                    Back to list
                </Button>
            </div>

            <div className="space-y-6">
                {step === 1 ? (
                    <section className="rounded-lg border p-4 bg-white shadow-sm">
                        <div className="mb-4 font-semibold text-lg">Step One</div>
                        <div className="space-y-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium">Title</label>
                                <Input
                                    type="text"
                                    classNames={{
                                        base: "input-field-base",
                                        inputWrapper: "input-field-wrapper",
                                        input: "input-field"
                                    }}
                                    aria-label="Title"
                                    placeholder="Enter title"
                                    {...formik.getFieldProps("title")}
                                />
                                {formik.touched.title && !formik.values.title.trim() && (
                                    <p className="text-danger text-sm mt-1">Title is required.</p>
                                )}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Sub Heading</label>
                                <Input
                                    type="text"
                                    classNames={{
                                        base: "input-field-base",
                                        inputWrapper: "input-field-wrapper",
                                        input: "input-field"
                                    }}
                                    aria-label="Sub Heading"
                                    placeholder="Enter sub heading"
                                    {...formik.getFieldProps("subHeading")}
                                />
                                {formik.touched.subHeading && !formik.values.subHeading.trim() && (
                                    <p className="text-danger text-sm mt-1">Sub heading is required.</p>
                                )}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Challenge</label>
                                <Input
                                    type="text"
                                    classNames={{
                                        base: "input-field-base",
                                        inputWrapper: "input-field-wrapper",
                                        input: "input-field"
                                    }}
                                    aria-label="Challenge"
                                    placeholder="Enter challenge"
                                    {...formik.getFieldProps("challenge")}
                                />
                                {formik.touched.challenge && !formik.values.challenge.trim() && (
                                    <p className="text-danger text-sm mt-1">Challenge is required.</p>
                                )}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Description</label>
                                <Textarea
                                    aria-label="Description"
                                    placeholder="Enter description"
                                    minRows={4}
                                    classNames={{
                                        base: "input-field-base",
                                        inputWrapper: "input-field-wrapper",
                                        input: "!py-2"
                                    }}
                                    {...formik.getFieldProps("description")}
                                />
                                {formik.touched.description && !formik.values.description.trim() && (
                                    <p className="text-danger text-sm mt-1">Description is required.</p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <Button
                                type="button"
                                onPress={handleStepOneNext}
                                className="primary-btn max-w-28 h-full text-sm px-4 py-2"
                            >
                                Next
                            </Button>
                        </div>
                    </section>
                ) : (
                    <section className="rounded-lg border p-4 bg-white shadow-sm">
                        <div className="mb-4 font-semibold text-lg">Step Two</div>
                        <div className="space-y-6">
                            {formik.values.content.map((section, index) => (
                                <div key={`section-${index}`} className="rounded border p-4 bg-gray-50">
                                    <div className="mb-4 font-semibold">{section.title}</div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium">Description</label>
                                            <Textarea
                                                classNames={{
                                                    base: "input-field-base",
                                                    inputWrapper: "input-field-wrapper",
                                                    input: "!py-2"
                                                }}
                                                minRows={4}
                                                placeholder="Enter section description"
                                                aria-label={`${section.title} Description`}
                                                value={section.description}
                                                onChange={(event) => updateSectionField(index, "description", event.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Optional list items</span>
                                                <Button
                                                    type="button"
                                                    onPress={() => addSectionListItem(index)}
                                                    className="rounded border px-3 py-1 text-sm"
                                                    variant="light"
                                                >
                                                    + Add list item
                                                </Button>
                                            </div>
                                            {(section.list || []).map((item, itemIndex) => (
                                                <div key={`list-${itemIndex}`} className="flex gap-2 items-center">
                                                    <Input
                                                        type="text"
                                                        classNames={{
                                                            base: "input-field-base",
                                                            inputWrapper: "input-field-wrapper",
                                                            input: "input-field"
                                                        }}
                                                        aria-label={`${section.title} list item ${itemIndex + 1}`}
                                                        placeholder="List item"
                                                        value={item}
                                                        onChange={(event) => updateSectionListItem(index, itemIndex, event.target.value)}
                                                    />
                                                    <Button
                                                        type="button"
                                                        color="danger"
                                                        variant="light"
                                                        onPress={() => removeSectionListItem(index, itemIndex)}
                                                        className="rounded border px-1 py-1 text-sm"
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row items-center justify-between mt-6">
                            <Button
                                type="button"
                                onPress={() => setStep(1)}
                                className="rounded border px-4 py-2 text-sm"
                                variant="light"
                            >
                                Previous
                            </Button>
                            <Button
                                type="button"
                                onPress={() => formik.handleSubmit()}
                                className="primary-btn rounded border max-w-28 h-full text-sm px-4 py-2"
                            >
                                {mode === "edit" ? "Update" : "Create"}
                            </Button>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
