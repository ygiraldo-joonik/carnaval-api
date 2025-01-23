import { ApiResponse } from "@/types/api-response.d";
import { Block, BlockFormData } from "@/types/element.d";
import axios from "axios";

const updateBlockService = async (block: BlockFormData) => {
    try {
        const response = await axios.put<BlockFormData, ApiResponse<Block>>(
            route("blocks.update", { id: block.id }),
            block
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default updateBlockService;
