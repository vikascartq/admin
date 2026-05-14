import DeleteIcon from "@/svg/DeleteIcon";
import EditRowIcon from "@/svg/EditRowIcon";
import DeleteModal from "@/ui/DeleteModal";
import { useDisclosure } from "@heroui/react";
import { useContext } from "react";
import AddCategoryModal from "./AddCategoryModal";
import "./category.css";
import { TestimonialContext } from "./context/TestimonialContext";

export default function Testimonial() {
    const { isOpen: isOpenD, onOpen: onOpenD, onOpenChange: onOpenChangeD, onClose } = useDisclosure();
    const { isOpen, onOpen, onOpenChange, formik, handleDelete, testimonialList } = useContext(TestimonialContext);
    return (
        <>
            <div className="p-4">
                <div className="flex items-center justify-between h-9">
                    <div className="text-xl font-semibold">Testimonial</div>
                    <button onClick={onOpen} className="primary-btn max-w-28 h-full text-sm">Add New</button>
                </div>
                <div className="overflow-x-auto h-[calc(100vh-85px)] border rounded-lg mt-4">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 text-left sticky top-0 bg-gray-100 z-10 w-12">
                                    S.No
                                </th>
                                <th className="px-4 py-2 text-left sticky top-0 bg-gray-100 z-10">
                                    Name
                                </th>
                                <th className="px-4 py-2 text-left sticky top-0 bg-gray-100 z-10">
                                    Role
                                </th>
                                <th className="px-4 py-2 sticky top-0 bg-gray-100 z-10 text-end">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                testimonialList.map((item, i) => (
                                    <tr className="border-t" key={`job-${i + 1}`}>
                                        <td className="px-4 py-2">{i + 1}</td>
                                        <td className="px-4 py-2">{item?.name || "-"}</td>
                                        <td className="px-4 py-2">{item?.role || "-"}</td>
                                        <td className="px-4 py-2">
                                            <div className="flex items-center justify-end gap-x-4">
                                                <button onClick={() => {
                                                    formik.setFieldValue("id", item?._id);
                                                    formik.setFieldValue("role", item?.role);
                                                    formik.setFieldValue("description", item?.description);
                                                    formik.setFieldValue("name", item?.name);
                                                    onOpen();
                                                }}><EditRowIcon /></button>
                                                <button onClick={() => {
                                                    formik.setFieldValue("id", item?._id);
                                                    onOpenD()
                                                }}><DeleteIcon /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <AddCategoryModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            />

            <DeleteModal
                isOpen={isOpenD}
                onOpenChange={onOpenChangeD}
                handleDelete={async () => {
                    await handleDelete();
                    onClose();
                }}
                onClose={() => {
                    formik.resetForm();
                }}
            />
        </>
    )
}
