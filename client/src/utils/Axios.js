import axios from "axios";
import { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;