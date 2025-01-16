import { ApiResponse } from "@/types/api-response";
import { Parade, ParadeFormData } from "@/types/parade";
import axios from "axios";

const createParadeService = async (data: ParadeFormData) => {
    try {
        const response = await axios.post<ParadeFormData, ApiResponse<Parade>>(
            route("parades.store"),
            data
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default createParadeService;
