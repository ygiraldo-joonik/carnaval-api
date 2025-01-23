import axios from "axios";

const deleteElementService = async (id: number) => {
    try {
        const response = await axios.delete(route("elements.delete", { id }));
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default deleteElementService;
