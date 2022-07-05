import http from "./axios/http-common";

class IngredientDataService {
  get() {
    return http.get("/ingredients");
  }

  create(data) {
    return http.post("/ingredients", data);
  }

  update(data) {
    return http.put("/ingredients", data);
  }

  delete(id) {
    return http.delete("/ingredients/" + id);
  }
}

export default new IngredientDataService();
