import { ApiResponse } from "@/types/api-response.d";
import { Element } from "@/types/element.d";
import axios from "axios";

export type UpdateElementOrderServiceProps = {
    block_id: number;
    elements: ElementOrder[];
};

export type ElementOrder = Pick<Element, "id" | "order">;

const updateElementsOrderService = async (
    data: UpdateElementOrderServiceProps
) => {
    try {
        const response = await axios.put<
            UpdateElementOrderServiceProps,
            ApiResponse<ElementOrder[]>
        >(route("elements.updateOrder"), data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default updateElementsOrderService;
