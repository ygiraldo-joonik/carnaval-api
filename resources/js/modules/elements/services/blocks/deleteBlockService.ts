import axios from "axios";

const deleteBlockService = async (id: number) => {
    try {
        const response = await axios.delete(route("blocks.delete", { id }));
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default deleteBlockService;
