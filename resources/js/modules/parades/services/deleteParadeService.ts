import axios from "axios";

const deleteParadeService = async (id: number) => {
    try {
        const response = await axios.delete(route("parades.delete", { id }));
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default deleteParadeService;
