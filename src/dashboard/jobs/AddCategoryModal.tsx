import type { AddCategoryModalProp } from "@/types/category.type";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@heroui/react";
import { useContext, useState } from "react";
import { JobsContext } from "./context/JobsContext";

export default function AddCategoryModal({
    isOpen,
    onOpenChange
}: AddCategoryModalProp) {

    const { formik } = useContext(JobsContext);

    const [skillInput, setSkillInput] = useState("");

    const addSkill = () => {
        const trimmedSkill = skillInput.trim();

        if (
            !trimmedSkill ||
            formik.values.skills.includes(trimmedSkill)
        ) {
            return;
        }

        formik.setFieldValue("skills", [
            ...formik.values.skills,
            trimmedSkill
        ]);

        setSkillInput("");
    };

    const removeSkill = (skill: string) => {
        const updatedSkills = formik.values.skills.filter(
            (item: string) => item !== skill
        );

        formik.setFieldValue("skills", updatedSkills);
    };

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
                                Create Jobs
                            </ModalHeader>

                            <ModalBody>

                                {/* Job Name */}
                                <Input
                                    aria-label="Jobs Name"
                                    placeholder="Jobs Name"
                                    type="text"
                                    classNames={{
                                        base: "input-field-base",
                                        inputWrapper:
                                            "input-field-wrapper data-[invalid=true]:!bg-white group-data-[focus=true]:!bg-white !bg-white data-[hover=true]:!bg-white",
                                        input: "input-field !text-black"
                                    }}
                                    {...formik.getFieldProps("jobName")}
                                    isInvalid={
                                        !!formik.errors.jobName &&
                                        formik.touched.jobName
                                    }
                                    errorMessage={
                                        formik.touched.jobName &&
                                        formik.errors.jobName
                                    }
                                />

                                {/* Location */}
                                <Input
                                    aria-label="Location"
                                    placeholder="Location"
                                    type="text"
                                    classNames={{
                                        base: "input-field-base",
                                        inputWrapper:
                                            "input-field-wrapper data-[invalid=true]:!bg-white group-data-[focus=true]:!bg-white !bg-white data-[hover=true]:!bg-white",
                                        input: "input-field !text-black"
                                    }}
                                    {...formik.getFieldProps("location")}
                                    isInvalid={
                                        !!formik.errors.location &&
                                        formik.touched.location
                                    }
                                    errorMessage={
                                        formik.touched.location &&
                                        formik.errors.location
                                    }
                                />

                                {/* Skills Input */}
                                <div className="flex flex-col gap-2 items-center">
                                    <Input
                                        aria-label="Skills"
                                        placeholder="Add Skill"
                                        value={skillInput}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setSkillInput(e.target.value)
                                        }
                                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                addSkill();
                                            }
                                        }}
                                        classNames={{
                                            base: "input-field-base",
                                            inputWrapper:
                                                "input-field-wrapper !bg-white",
                                            input: "input-field !text-black"
                                        }}
                                    />

                                    <Button
                                        className="primary-btn"
                                        color="primary"
                                        onPress={addSkill}
                                    >
                                        Add
                                    </Button>
                                </div>

                                {/* Skills List */}
                                <div className="flex flex-wrap gap-2">
                                    {formik.values.skills.map(
                                        (skill: string) => (
                                            <div
                                                key={skill}
                                                className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full"
                                            >
                                                <span className="text-[14px]">{skill}</span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeSkill(skill)
                                                    }
                                                    className="text-red-500"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>

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