import axios from "axios";

const deleteElementTypeService = async (id: number) => {
    try {
        const response = await axios.delete(
            route("element-types.delete", { id: id })
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default deleteElementTypeService;
