// import app from "../main";
import axios from "axios";
import { API_URL } from "@/constants";

const service = axios.create({
  baseURL: API_URL
});

service.interceptors.request.use(
  serviceConfig => {
    // app.$Progress.start();

    // serviceConfig.headers.common["Content-Type"] = "application/json";
    serviceConfig.headers.common["X-Requested-With"] = "XMLHttpRequest";
    serviceConfig.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    serviceConfig.headers.common.crossDomain = true;

    return serviceConfig;
  },
  error => {
    // app.$Progress.fail();
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  () => {
    // app.$Progress.finish();
  },
  () => {
    // app.$Progress.fail();
  }
);

export default service;
