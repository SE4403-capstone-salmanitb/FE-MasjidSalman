import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.BACKEND_URL ?? "http://localhost:8000",
  timeout: 60000,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  headers: {
    Accept: "application/json",
  },
});

export default axios;
