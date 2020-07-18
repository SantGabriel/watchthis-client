import { apiRequest } from "../configs/apiMiddleware";

export default {
  getObras: (search) => apiRequest("GET", `/obra/filtro/${search}`),
  getObra: (id) => apiRequest("GET", `/obra/${id}`),
  addObra: (body) => apiRequest("POST", `/obra`, body),
  updateObra: (id, body) => apiRequest("PUT", `/obra/${id}`, body),
  removeObra: (id) => apiRequest("DELETE", `/obra/${id}`),
};
