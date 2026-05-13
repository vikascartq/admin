// import type { QuestionForm } from "@/pages/dashboard/gov-exam/hooks/useTestSeries";
import type { topicQuestionsDetails } from "@/types/manage-content.type";
import React, { useRef } from "react";
import * as XLSX from "xlsx";

export default function UseExcelUpload(handleBulkUploadedData: (a: topicQuestionsDetails[]) => void) {
    const uploadMCQFileInputRef = useRef<HTMLInputElement>(null);
    // const [isLoading, setIsLoading] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            const data = evt.target?.result;
            const workbook = XLSX.read(data, { type: "binary" });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData: ExcelSheetColKeyNames[] = XLSX.utils.sheet_to_json(worksheet, { raw: false });

            const mappedQuestions: topicQuestionsDetails[] = (jsonData as ExcelSheetColKeyNames[]).map((row) => {
                // Trim all keys in the row
                const cleanedRow = Object.fromEntries(
                    Object.entries(row).map(([key, value]) => [key.trim(), typeof value === "string" ? value.trim() : value])
                );

                return {
                    question: cleanedRow["Questions"] || "",
                    option1: cleanedRow["Option1"] || "",
                    option2: cleanedRow["Option2"] || "",
                    option3: cleanedRow["Option3"] || "",
                    option4: cleanedRow["Option4"] || "",
                    // option5: cleanedRow["Option5"] || "",
                    answer: cleanedRow["Answer"].toLowerCase() || "",
                };
            });
            handleBulkUploadedData(mappedQuestions)
        };

        reader.readAsArrayBuffer(file);
        e.target.value = "";
    };

    const onFileUpload = () => uploadMCQFileInputRef.current?.click();

    return {
        // isLoading,
        handleFileUpload,
        onFileUpload
    }
}

export interface ExcelSheetColKeyNames {
    Questions: string,
    Option1: string,
    Option2: string,
    Option3: string,
    Option4: string,
    Option5: string,
    Answer: string
}