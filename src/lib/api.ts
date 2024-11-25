import axios from "axios";

const api = axios.create({
    baseURL: process.env.HOST_URL
})

export default api