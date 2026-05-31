import DeleteIcon from "@/svg/DeleteIcon";
import DeleteModal from "@/ui/DeleteModal";
import EditRowIcon from "@/svg/EditRowIcon";
import { useDisclosure } from "@heroui/react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { TrendsContext } from "./context/TrendsContext";

export default function Trends() {
    const navigate = useNavigate();
    const { isOpen: isOpenD, onOpen: onOpenD, onOpenChange: onOpenChangeD, onClose } = useDisclosure();
    const { formik, handleDelete, trendList, page, hasMore, handlePageChange } = useContext(TrendsContext);

    return (
        <>
            <div className="p-4">
                <div className="flex items-center justify-between h-9">
                    <div className="text-xl font-semibold">Trends</div>
                    <button onClick={() => navigate("/trends/add")} className="primary-btn max-w-28 h-full text-sm">Add New</button>
                </div>
                <div className="overflow-x-auto h-[calc(93vh-85px)]  border rounded-lg mt-4">
                    <table className="min-w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left sticky top-0 bg-gray-100 z-10 w-12">S.No</th>
                                <th className="px-4 py-3 text-left sticky top-0 bg-gray-100 z-10">Title</th>
                                <th className="px-4 py-3 text-left sticky top-0 bg-gray-100 z-10">Sub Heading</th>
                                <th className="px-4 py-3 text-left sticky top-0 bg-gray-100 z-10">Created At</th>
                                <th className="px-4 py-3 sticky top-0 bg-gray-100 z-10 text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trendList.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-6 text-center text-sm text-gray-600">
                                        No trends available.
                                    </td>
                                </tr>
                            ) : (
                                trendList.map((item, index) => (
                                    <tr className="border-t" key={item._id || index}>
                                        <td className="px-4 py-3">{(page - 1) * 10 + index + 1}</td>
                                        <td className="px-4 py-3">{item.title || "-"}</td>
                                        <td className="px-4 py-3">{item.subHeading || "-"}</td>
                                        <td className="px-4 py-3">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "-"}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-x-4">
                                                <button
                                                    type="button"
                                                    onClick={() => navigate(`/trends/${item._id}/edit`)}
                                                >
                                                    <EditRowIcon />
                                                </button>
                                                <button
                                                    className="text-blue-600 hover:text-blue-800"
                                                    onClick={() => {
                                                        formik.setFieldValue("_id", item._id);
                                                        onOpenD();
                                                    }}
                                                    type="button"
                                                >
                                                    <DeleteIcon />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col gap-3 md:flex-row items-center justify-between px-4 py-3 text-sm text-gray-600">
                    <div>
                        Page {page}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="rounded border px-3 py-2 text-sm disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            onClick={() => handlePageChange(page + 1)}
                            disabled={!hasMore}
                            className="rounded border px-3 py-2 text-sm disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

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
    );
}
