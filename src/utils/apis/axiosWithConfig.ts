import Cookies from "js-cookie";
import axios from "axios";

import { useAuthStore } from "@/utils/states";

let bearerToken = Cookies.get("token") ?? sessionStorage.getItem("token") ?? "";
const axiosWithConfig = axios.create();

export const setAxiosConfig = (token: string) => {
  bearerToken = token;
};

axiosWithConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      useAuthStore.getState().resetAuth();
      return;
    }

    return Promise.reject(error);
  }
);

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = "https://drariawan-api.alta.id/";
  if (bearerToken !== "") {
    axiosConfig.headers.Authorization = `Bearer ${bearerToken}`;
  }

  return axiosConfig;
});

export default axiosWithConfig;
