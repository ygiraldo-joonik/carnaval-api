import { ApiResponse } from "@/types/api-response.d";
import { Element } from "@/types/element.d";
import axios from "axios";

export type UpdateElementPositionServiceProps = {
    element_id: number;
    block_id: number;
    order: number;
};

const updateElementPositionService = async (
    elementPosition: UpdateElementPositionServiceProps
) => {
    try {
        const response = await axios.put<
            UpdateElementPositionServiceProps,
            ApiResponse<Element>
        >(route("elements.updatePosition"), elementPosition);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default updateElementPositionService;
