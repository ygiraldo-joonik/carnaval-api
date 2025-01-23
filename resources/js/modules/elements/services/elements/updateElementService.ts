import { ApiResponse } from "@/types/api-response.d";
import { Element, ElementFormData } from "@/types/element.d";
import axios from "axios";

const updateElementService = async (element: ElementFormData) => {
    try {
        const response = await axios.put<ElementFormData, ApiResponse<Element>>(
            route("elements.update", { id: element.id }),
            element
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default updateElementService;
