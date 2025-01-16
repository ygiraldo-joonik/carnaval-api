import { ApiResponse } from "@/types/api-response";
import { ElementType, ElementTypeFormData } from "@/types/element-type";
import axios from "axios";

const createElementTypeService = async (data: ElementTypeFormData) => {
    try {
        const response = await axios.post<
            ElementTypeFormData,
            ApiResponse<ElementType>
        >(route("element-types.store"), data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default createElementTypeService;
