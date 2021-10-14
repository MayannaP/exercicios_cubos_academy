import { create } from "axios";

const api = create({
    baseURL: 'http://localhost:3333',
    timeout: 10000,
});

export default api;