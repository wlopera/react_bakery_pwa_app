import http from "./axios/http-common";

class AuthDataService {
  get() {
    return http.get("/users");
  }

  getSales(id) {
    return http.get(`/users/${id}/sales`);
  }

  login(data) {
    return http.post("/users/login", data);
  }
}

export default new AuthDataService();
