import type { AddCategoryModalProp } from "@/types/category.type";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea
} from "@heroui/react";
import { useContext } from "react";
import { TestimonialContext } from "./context/TestimonialContext";

export default function AddCategoryModal({
    isOpen,
    onOpenChange
}: AddCategoryModalProp) {

    const { formik } = useContext(TestimonialContext);

    return (
        <>
            <Modal {...{
                isOpen,
                onOpenChange,
                disableAnimation: true,
                classNames: { backdrop: "bg-[#32446740]" },
                onClose: () => { formik.resetForm(); }
            } as any}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Create Testimonial
                            </ModalHeader>

                            <ModalBody>

                                <Input
                                    aria-label="name"
                                    placeholder="Name"
                                    type="text"
                                    classNames={{
                                        base: "input-field-base",
                                        inputWrapper:
                                            "input-field-wrapper data-[invalid=true]:!bg-white group-data-[focus=true]:!bg-white !bg-white data-[hover=true]:!bg-white",
                                        input: "input-field !text-black"
                                    }}
                                    {...formik.getFieldProps("name")}
                                    isInvalid={
                                        !!formik.errors.name &&
                                        formik.touched.name
                                    }
                                    errorMessage={
                                        formik.touched.name &&
                                        formik.errors.name
                                    }
                                />

                                <Input
                                    aria-label="Role"
                                    placeholder="Role"
                                    type="text"
                                    classNames={{
                                        base: "input-field-base",
                                        inputWrapper:
                                            "input-field-wrapper data-[invalid=true]:!bg-white group-data-[focus=true]:!bg-white !bg-white data-[hover=true]:!bg-white",
                                        input: "input-field !text-black"
                                    }}
                                    {...formik.getFieldProps("role")}
                                    isInvalid={
                                        !!formik.errors.role &&
                                        formik.touched.role
                                    }
                                    errorMessage={
                                        formik.touched.role &&
                                        formik.errors.role
                                    }
                                />

                                <Textarea
                                    aria-label="Description"
                                    placeholder="Description"
                                    type="text"
                                    classNames={{
                                        base: "input-field-base",
                                        inputWrapper:
                                            "input-field-wrapper data-[invalid=true]:!bg-white group-data-[focus=true]:!bg-white !bg-white data-[hover=true]:!bg-white",
                                        input: "input-field !text-black"
                                    }}
                                    {...formik.getFieldProps("description")}
                                    isInvalid={
                                        !!formik.errors.description &&
                                        formik.touched.description
                                    }
                                    errorMessage={
                                        formik.touched.description &&
                                        formik.errors.description
                                    }
                                />


                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    className="primary-btn"
                                    color="primary"
                                    onPress={formik.submitForm}
                                >
                                    {formik.values.id
                                        ? "Update"
                                        : "Create"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
