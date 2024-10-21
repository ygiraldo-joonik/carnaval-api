import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.VITE_APP_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default apiClient;
