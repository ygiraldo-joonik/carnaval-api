import { ApiResponse } from "@/types/api-response";
import { ImportElement } from "@/types/element";
import axios, { Axios, AxiosResponse } from "axios";
import { MetaHTMLAttributes } from "react";

const importParadeElementsService = async (id: number, file: File) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post<
            FormData,
            AxiosResponse<ApiResponse<ImportElement[]>>
        >(route("elements.import", { parade_id: id }), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data.data;
    } catch (error) {
        throw error;
    }
};

export default importParadeElementsService;
