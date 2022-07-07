import http from "./axios/http-common";

class RecipeDataService {
  get() {
    return http.get("/recipes");
  }

  create(data) {
    return http.post("/recipes", data);
  }

  update(id, data) {
    return http.put("/recipes/" + id, data);
  }

  delete(id) {
    return http.delete("/recipes/" + id);
  }
}

export default new RecipeDataService();
