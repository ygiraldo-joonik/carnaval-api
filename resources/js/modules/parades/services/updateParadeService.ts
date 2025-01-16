import { ApiResponse } from "@/types/api-response";
import { Parade, ParadeFormData } from "@/types/parade";
import axios from "axios";

const updateParadeService = async (data: ParadeFormData) => {
    try {
        const { id } = data;

        const response = await axios.put<ParadeFormData, ApiResponse<Parade>>(
            route("parades.update", { id }),
            data
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default updateParadeService;
