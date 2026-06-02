import type { AddCategoryModalProp } from "@/types/category.type";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    Textarea,
} from "@heroui/react";
import { useContext, useState } from "react";
import { CandidateContext } from "./context/CandidateContext";

export default function AddCategoryModal({
    isOpen,
    onOpenChange
}: AddCategoryModalProp) {

    const { formik } = useContext(CandidateContext);

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
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                disableAnimation
                classNames={{
                    backdrop: "bg-[#32446740]"
                }}
                onClose={() => {
                    formik.resetForm();
                }}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Create Candidate
                            </ModalHeader>

                            <ModalBody>

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

                                <div className="flex flex-col gap-2 items-center">
                                    <Input
                                        aria-label="Skills"
                                        placeholder="Add Skill"
                                        value={skillInput}
                                        onChange={(e) =>
                                            setSkillInput(e.target.value)
                                        }
                                        onKeyDown={(e) => {
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

                                <Select

                                
                                    classNames={{
                                        base: "input-field-base ",
                                        trigger: " input-field-wrapper data-[invalid=true]:!bg-white group-data-[focus=true]:!bg-white !bg-white data-[hover=true]:!bg-white",
                                    }}
                                    placeholder="Select an image name"
                                    aria-label="Select an image name"
                                    id="imageName"
                                    {...formik.getFieldProps("imageName")}
                                    isInvalid={!!formik.errors.imageName && formik.touched.imageName}
                                    errorMessage={formik.touched.imageName && formik.errors.imageName}
                                    selectedKeys={[formik.values.imageName]}
                                >
                                    {imageNameList.map((item) => (
                                        <SelectItem key={item.id}>{item.name}</SelectItem>
                                    ))}
                                </Select>

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


const imageNameList = [
    // Girl Black Images
    {
        id: "girl-black-image-1",
        name: "girl-black-image-1"
    },
    {
        id: "girl-black-image-2",
        name: "girl-black-image-2"
    },
    {
        id: "girl-black-image-3",
        name: "girl-black-image-3"
    },
    // Body Black Images
    {
        id: "boy-black-image-1",
        name: "boy-black-image-1"
    },
    {
        id: "boy-black-image-2",
        name: "boy-black-image-2"
    },
    {
        id: "boy-black-image-3",
        name: "boy-black-image-3"
    },
    {
        id: "boy-black-image-4",
        name: "boy-black-image-4"
    },
    // Girl White Images
    {
        id: "girl-white-image-1",
        name: "girl-white-image-1"
    },
    {
        id: "girl-white-image-2",
        name: "girl-white-image-2"
    },
    {
        id: "girl-white-image-3",
        name: "girl-white-image-3"
    },
    // Boy White Images
    {
        id: "boy-white-image-1",
        name: "boy-white-image-1"
    },
    {
        id: "boy-white-image-2",
        name: "boy-white-image-2"
    },
    {
        id: "boy-white-image-3",
        name: "boy-white-image-3"
    },
    // Asian Girl  Images
    {
        id: "asian-girl-image-1",
        name: "asian-girl-image-1"
    },
    {
        id: "asian-girl-image-2",
        name: "asian-girl-image-2"
    },
    {
        id: "asian-girl-image-3",
        name: "asian-girl-image-3"
    },
    // Asian Boy  Images
    {
        id: "asian-boy-image-1",
        name: "asian-boy-image-1"
    },
    {
        id: "asian-boy-image-2",
        name: "asian-boy-image-2"
    },
    {
        id: "asian-boy-image-3",
        name: "asian-boy-image-3"
    },
    {
        id: "asian-boy-image-4",
        name: "asian-boy-image-4"
    },
    // middle East girl  Images
    {
        id: "middle-east-girl-image-1",
        name: "middle-east-girl-image-1"
    },
    {
        id: "middle-east-girl-image-2",
        name: "middle-east-girl-image-2"
    },
    {
        id: "middle-east-girl-image-3",
        name: "middle-east-girl-image-3"
    },
    // middle East BOY  Images
    {
        id: "middle-east-boy-image-1",
        name: "middle-east-boy-image-1"
    },
    {
        id: "middle-east-boy-image-2",
        name: "middle-east-boy-image-2"
    },
    {
        id: "middle-east-boy-image-3",
        name: "middle-east-boy-image-3"
    },
    // {
    //     id: "male-image-1",
    //     name: "male-image-1"
    // },
    // {
    //     id: "male-image-2",
    //     name: "male-image-2"
    // },
    // {
    //     id: "male-image-3",
    //     name: "male-image-3"
    // },
    // {
    //     id: "female-image-1",
    //     name: "female-image-1"
    // },
    // {
    //     id: "female-image-2",
    //     name: "female-image-2"
    // },
]