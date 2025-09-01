import { message } from "antd";
import axios, { AxiosRequestConfig } from "axios";
import { TEST_URL } from "../constans";
import { mode, setUrlSource, timeDelay } from "../utils";

const axiosApiInstance = axios.create({
  withCredentials: true,
  baseURL: setUrlSource(mode),
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

axiosApiInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

axiosApiInstance.interceptors.response.use(undefined, async (error) => {
  const originalRequest = error.config;
  if (!error) return Promise.reject(error);

  if (error.message === "Network Error") {
    message.error("Проблема сети - убедитесь, что вы подкючены к сети");
    return Promise.reject(error);
  }

  if (error.response.status !== 401) return Promise.reject(error); // переделать на 401

  if (!originalRequest._retry) {
    try {
      const newAccessToken = await GetRefreshedToken();
      if (typeof newAccessToken !== "string") throw new Error("no token");
      axiosApiInstance.defaults.headers.common["Authorization"] =
        "Bearer " + newAccessToken;
      return axiosApiInstance(originalRequest);
    } catch (error) {
      // const token = window.localStorage.getItem("token");
    }
  }

  return Promise.reject(error);
});

export async function GetRefreshedToken() {
  const rejectMsg = "Не удалось авторизоваться автоматически";
  const tokenRefreshing = window.localStorage.getItem("tokenRefreshing");
  switch (tokenRefreshing) {
    case null:
      window.localStorage.setItem("tokenRefreshing", "active");
      const refreshToken = window.localStorage.getItem("refreshToken");
      if (refreshToken === null) {
        window.localStorage.setItem("tokenRefreshing", "failed");
        window.localStorage.removeItem("tokenRefreshing");
        return Promise.reject("Нет рефреш токена");
      }
      try {
        const res = await axios.get(`${TEST_URL}ap/token-refresh`, {
          headers: { Authorization: `Bearer ${refreshToken}` },
        });
        window.localStorage.setItem("token", res.data.result.accessToken);
        window.localStorage.setItem("refreshToken", res.data.result.refreshToken);
        window.localStorage.removeItem("tokenRefreshing");
        return res.data.access_token;
      } catch (error) {
        Promise.reject(error);
      }
      break;
    case "active":
      for (let i = 0; i < 3; i++) {
        await timeDelay(1000);
        let tokenRefreshingInner = window.localStorage.getItem("tokenRefreshing");
        if (tokenRefreshingInner == null) {
          window.localStorage.removeItem("tokenRefreshing");
          return window.localStorage.getItem("token") ?? "";
        }
        window.localStorage.removeItem("tokenRefreshing");
        return Promise.reject("");
      }
      break;
    default:
      return Promise.reject(rejectMsg);
  }
}

export default axiosApiInstance;
