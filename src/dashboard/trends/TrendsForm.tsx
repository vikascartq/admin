import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import { addToast, Button, Input } from "@heroui/react";
import { createTrend, getAllTrendDetails, updateTrend } from "@/services/trend.service";
import type { ITrendItem, ITrendsForm } from "@/types/trend.type";
import { Textarea } from "@heroui/react";
import DeleteIcon from "@/svg/DeleteIcon";

const initialValues: ITrendsForm = {
    title: "",
    subHeading: "",
    description: "",
    content: [
        {
            order: 1,
            heading: "",
            description: "",
            list: []
        }
    ]
};

interface TrendsFormProps {
    mode: "add" | "edit";
}

export default function TrendsForm({ mode }: TrendsFormProps) {
    const navigate = useNavigate();
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);

    const formik = useFormik<ITrendsForm>({
        initialValues,
        onSubmit: async (values) => {
            const payload = {
                title: values.title,
                subHeading: values.subHeading,
                description: values.description,
                content: values.content.map((item, index) => ({
                    order: index + 1,
                    heading: item.heading,
                    description: item.description,
                    list: item.list?.filter(Boolean) || []
                })) as ITrendItem[]
            };

            try {
                if (mode === "edit" && params.id) {
                    const resp = await updateTrend(params.id, payload);
                    addToast({ title: resp?.data?.message || "Trend updated", severity: "success" });
                } else {
                    const resp = await createTrend(payload);
                    addToast({ title: resp?.data?.message || "Trend created", severity: "success" });
                }
                navigate("/trends");
            } catch (error) {
                addToast({ title: "Unable to save trend", severity: "danger" });
            }
        }
    });

    useEffect(() => {
        if (mode === "edit") {
            const trendId = params.id;
            if (!trendId) {
                navigate("/trends");
                return;
            }

            const loadTrend = async () => {
                setIsLoading(true);
                try {
                    const resp = await getAllTrendDetails(trendId);
                    const trend = resp?.data?.data;
                    if (!trend) {
                        addToast({ title: "Trend not found", severity: "danger" });
                        navigate("/trends");
                        return;
                    }
                    formik.setValues({
                        _id: trend._id,
                        title: trend.title || "",
                        subHeading: trend.subHeading || "",
                        description: trend.description || "",
                        content: Array.isArray(trend.content) && trend.content.length > 0
                            ? trend.content.map((item: any, index: number) => ({
                                order: item.order || index + 1,
                                heading: item.heading || "",
                                description: item.description || "",
                                list: Array.isArray(item.list) ? item.list : []
                            }))
                            : [{ order: 1, heading: "", description: "", list: [] }]
                    });
                } catch (err) {
                    addToast({ title: "Unable to load trend", severity: "danger" });
                    navigate("/trends");
                } finally {
                    setIsLoading(false);
                }
            };

            loadTrend();
        }
    }, [mode, params.id, navigate]);

    const handleStepOneNext = async () => {
        const errors: Partial<Record<keyof ITrendsForm, string>> = {};
        if (!formik.values.title.trim()) {
            errors.title = "Title is required";
        }
        if (!formik.values.subHeading.trim()) {
            errors.subHeading = "Sub heading is required";
        }
        if (!formik.values.description.trim()) {
            errors.description = "Description is required";
        }

        formik.setTouched({ title: true, subHeading: true, description: true });

        if (Object.keys(errors).length > 0) {
            addToast({ title: "Please complete step one", severity: "danger" });
            return;
        }
        setStep(2);
    };

    const addSection = () => {
        formik.setFieldValue("content", [
            ...formik.values.content,
            {
                order: formik.values.content.length + 1,
                heading: "",
                description: "",
                list: []
            }
        ]);
    };

    const removeSection = (index: number) => {
        const updated = formik.values.content.filter((_, idx) => idx !== index).map((item, idx) => ({
            ...item,
            order: idx + 1
        }));
        formik.setFieldValue("content", updated);
    };

    const updateSectionField = (index: number, field: keyof ITrendItem, value: string) => {
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
                <div className="text-lg font-semibold mb-4">Loading trend...</div>
                <div>Please wait while the trend data is loaded.</div>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <div className="text-xl font-semibold">{mode === "add" ? "Add Trend" : "Edit Trend"}</div>
                    <div className="text-sm text-gray-500">Step {step} of 2</div>
                </div>
                <Button
                    type="button"
                    onPress={() => navigate("/trends")}
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
                                    <div className="flex items-center justify-between mb-4 gap-4">
                                        <div className="font-semibold">Section {index + 1}</div>
                                        <Button
                                            type="button"
                                            color="danger"
                                            variant="light"
                                            onPress={() => removeSection(index)}
                                            className="text-sm"
                                            isDisabled={formik.values.content.length === 1}
                                        >
                                            Remove section
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium">Heading</label>
                                            <Input
                                                type="text"
                                                classNames={{
                                                    base: "input-field-base",
                                                    inputWrapper: "input-field-wrapper",
                                                    input: "input-field"
                                                }}
                                                aria-label={`Section ${index + 1} Heading`}
                                                placeholder="Enter section heading"
                                                value={section.heading}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateSectionField(index, "heading", event.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Textarea

                                                classNames={{
                                                    base: "input-field-base",
                                                    inputWrapper: "input-field-wrapper",
                                                    input: "!py-2"
                                                }}
                                                minRows={4}
                                                placeholder="Enter section description"
                                                aria-label="Description"
                                                value={section.description}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateSectionField(index, "description", event.target.value)}
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
                                                        aria-label={`Section ${index + 1} list item ${itemIndex + 1}`}
                                                        placeholder="List item"
                                                        value={item}
                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateSectionListItem(index, itemIndex, event.target.value)}
                                                    />
                                                    <Button
                                                        type="button"
                                                        color="danger"
                                                        variant="light"
                                                        onPress={() => removeSectionListItem(index, itemIndex)}
                                                        className="rounded border px-1 py-1 text-sm"
                                                    >
                                                        <DeleteIcon />
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
                                onPress={addSection}
                                className="rounded border px-4 py-2 text-sm"
                                variant="light"
                            >
                                + Add section
                            </Button>
                            <div className="flex gap-3">
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
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
