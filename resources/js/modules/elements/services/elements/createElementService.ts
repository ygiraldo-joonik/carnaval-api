import { ApiResponse } from "@/types/api-response.d";
import { Element, ElementFormData } from "@/types/element.d";
import axios from "axios";

const createElementService = async (element: ElementFormData) => {
    try {
        console.log({ element });
        const response = await axios.post<
            ElementFormData,
            ApiResponse<Element>
        >(route("elements.store"), element);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default createElementService;
