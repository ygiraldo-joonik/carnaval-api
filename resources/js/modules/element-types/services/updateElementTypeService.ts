import { ApiResponse } from "@/types/api-response";
import { ElementType, ElementTypeFormData } from "@/types/element-type";
import axios from "axios";

const updateElementTypeService = async (data: ElementTypeFormData) => {
    try {
        const { id } = data;

        const response = await axios.put<
            ElementTypeFormData,
            ApiResponse<ElementType>
        >(route("element-types.update", { id }), data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default updateElementTypeService;
