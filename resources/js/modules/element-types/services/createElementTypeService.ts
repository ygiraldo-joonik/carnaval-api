import { ApiResponse } from "@/types/api-response.d";
import { ElementType, ElementTypeFormData } from "@/types/element-type.d";
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
