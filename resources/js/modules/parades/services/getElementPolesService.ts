import { ApiResponse } from "@/types/api-response.d";
import { ParadeElementPole } from "@/types/parade.d";
import axios, { AxiosResponse } from "axios";

const getElementPolesService = async (paradeId: number, elementId: number) => {
    try {
        const response = await axios.get<
            null,
            AxiosResponse<ApiResponse<ParadeElementPole[]>>
        >(
            route("elements.poles", {
                parade_id: paradeId,
                element_id: elementId,
            })
        );
        return {
            poles: response.data.data,
            elementId,
        };
    } catch (error) {
        throw error;
    }
};

export default getElementPolesService;
