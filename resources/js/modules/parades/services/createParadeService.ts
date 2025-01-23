import { ApiResponse } from "@/types/api-response.d";
import { Parade, ParadeFormData } from "@/types/parade.d";
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
