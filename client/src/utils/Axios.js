import axios from "axios";
import { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

/*
|--------------------------------------------------------------------------
| Request Interceptor
|--------------------------------------------------------------------------
*/

Axios.interceptors.request.use(
  (config) => {
    const accessToken =
      localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/*
|--------------------------------------------------------------------------
| Response Interceptor
|--------------------------------------------------------------------------
*/

Axios.interceptors.response.use(
  response => response,

  async(error)=>{

    const originalRequest = error.config;

    if(
      error.response?.status === 401 &&
      !originalRequest._retry
    ){

      originalRequest._retry = true;

      const refreshToken =
        localStorage.getItem(
          "refreshToken"
        );

      const response = await Axios.post(
        "/api/user/refresh-token",
        {
          refreshToken
        }
      );

      const newAccessToken =
        response.data.accessToken;

      localStorage.setItem(
        "accessToken",
        newAccessToken
      );

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return Axios(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default Axios;