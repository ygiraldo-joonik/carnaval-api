import React, { useState } from "react";

interface ImportParadeElementsProps {
    onFileUpload: (file: File) => void;
    loading: boolean;
    fill?: boolean;
}

const ImportParadeElements: React.FC<ImportParadeElementsProps> = ({
    onFileUpload,
    loading,
    fill = false,
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            onFileUpload(selectedFile);
        }
    };

    return (
        <div className="p-4 flex justify-end items-center gap-6 bg-white rounded-lg ">
            <input
                type="file"
                onChange={handleFileChange}
                className={`${
                    fill ? "w-full" : ""
                } block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file-primary  hover:file:bg-blue-100`}
            />

            <button
                onClick={handleUpload}
                disabled={loading || selectedFile === null}
                className={`px-2 py-2  rounded-md ${
                    loading || selectedFile === null
                        ? "opacity-50 cursor-not-allowed bg-accent-light"
                        : "bg-accent"
                }`}
            >
                {loading ? "Importando..." : "Importar"}
            </button>
        </div>
    );
};

export default ImportParadeElements;
