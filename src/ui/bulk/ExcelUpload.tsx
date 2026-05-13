// import type { QuestionForm } from "@/pages/dashboard/gov-exam/hooks/useTestSeries";
// import SpinnerIcon from "@src/svg/SpinnerIcon";
import type { topicQuestionsDetails } from "@/types/manage-content.type";
import { Button } from "@heroui/react";
import { useRef } from "react";
import UseExcelUpload from "./useExcelUpload";

const ExcelUpload = ({ handleBulkUploadedData }: ExcelUploadProp) => {
    const {
        // isLoading,
        handleFileUpload,
        onFileUpload,
    } = UseExcelUpload(handleBulkUploadedData);
    const uploadInputRef = useRef<HTMLInputElement>(null);
    return (
        <div className="p-4 flex items-center gap-x-2">
            <a href="/topic-sample-file.csv" download className="sample-file-download-btn text-[12px] text-center">
                Download Sample File
            </a>
            <Button
                // isLoading={isLoading}
                // isDisabled={isLoading}
                onPress={() => {
                    uploadInputRef.current?.click();
                    onFileUpload()
                }}
                color="primary"
                className="primary-btn h-8 max-w-28 text-sm"
            // spinner={<SpinnerIcon />}
            >
                {/* {isLoading ? "Uploading..." : "Upload File"} */}
                Upload File
            </Button>
            <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} className="hidden" ref={uploadInputRef} />
        </div>
    );
};

export default ExcelUpload;

interface ExcelUploadProp {
    handleBulkUploadedData: (a: topicQuestionsDetails[]) => void
}
