import { ApiResponse } from "@/types/api-response.d";
import { Block, BlockFormData } from "@/types/element.d";
import axios from "axios";

const createBlockService = async (block: BlockFormData) => {
    try {
        const response = await axios.post<BlockFormData, ApiResponse<Block>>(
            route("blocks.store"),
            block
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default createBlockService;
