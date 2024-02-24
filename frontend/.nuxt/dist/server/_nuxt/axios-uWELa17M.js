import axios from "axios";
axios.defaults.baseURL = process.env.backendUrl || "https://flix256-3989cf42b7a0.herokuapp.com/";
axios.interceptors.request.use((config) => {
  config.withCredentials = true;
  config.headers["Content-Type"] = "application/json";
  config.headers["accept"] = "application/json";
  return config;
});
//# sourceMappingURL=axios-uWELa17M.js.map
