import { apiRequest } from "../configs/apiMiddleware";

export default {
    getCategorias: () => apiRequest("GET", `/categoria`),
    getCategoria: (id) => apiRequest("GET", `/categoria/${id}`),
};
