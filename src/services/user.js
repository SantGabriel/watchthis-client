import { apiRequest } from "../configs/apiMiddleware";

export default {
  register: (body) => apiRequest("POST", "/user/register", body),
  login: (body) => apiRequest("POST", "/user/login", body),
  getItemLista: (id) => apiRequest("GET", `/user/itemLista/${id}`),
  getItensListas: (/*searchText*/) => apiRequest("GET", "/user/itemLista"/*{ query: { search: searchText } }*/),
  addItemLista: (obraId) => apiRequest("POST", `/user/itemLista/${obraId}`),
  updateItemLista: (obraId,body) => apiRequest("PUT", `/user/itemLista/${obraId}`,body),
  removeItemLista: (obraId) => apiRequest("DELETE", `/user/itemLista/${obraId}`),
};
