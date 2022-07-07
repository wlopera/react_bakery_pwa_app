import http from "./axios/http-common";

class IngredientDataService {
  get() {
    return http.get("/ingredients");
  }

  create(data) {
    return http.post("/ingredients", data);
  }

  update(id, data) {
    return http.put("/ingredients/" + id, data);
  }

  delete(id) {
    return http.delete("/ingredients/" + id);
  }
}

export default new IngredientDataService();
