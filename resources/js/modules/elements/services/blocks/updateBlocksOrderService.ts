import { ApiResponse } from "@/types/api-response.d";
import { Block } from "@/types/element.d";
import axios from "axios";

export type UpdateBlockOrderServiceProps = {
    parade_id: number;
    blocks: BlockOrder[];
};

export type BlockOrder = Pick<Block, "id" | "order">;

const updateBlocksOrderService = async (data: UpdateBlockOrderServiceProps) => {
    try {
        const response = await axios.put<
            UpdateBlockOrderServiceProps,
            ApiResponse<BlockOrder[]>
        >(route("blocks.updateOrder"), data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default updateBlocksOrderService;
