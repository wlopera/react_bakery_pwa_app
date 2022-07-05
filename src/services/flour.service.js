import http from "./axios/http-common";

class FlourDataService {
  get() {
    return http.get("/flours");
  }

  create(data) {
    return http.post("/flours", data);
  }

  update(data) {
    return http.put("/flours", data);
  }

  delete(id) {
    return http.delete("/flours/" + id);
  }

  // delete(data) {
  //   return http.delete("/delete", {
  //     headers: authHeader(),
  //     params: data,
  //   });
  // }
}

export default new FlourDataService();
