import axios, { AxiosRequestConfig } from "axios";

export interface AxiosUtilResponse<T> {
  code: string;
  data: T;
  message: string;
}

const getBaseUrl = () => {
  let reVal = "https://api.gopizza.kr";

  let host;
  if (typeof window !== "undefined") {
    host = window.location.host;
  }

  const hostSplit = host?.split(".");

  if ((hostSplit && hostSplit[0] === "dev") || host?.includes("vercel")) {
    reVal = "https://dev.api.gopizza.kr";
  } else if ((hostSplit && hostSplit[0] === "192") || (hostSplit && hostSplit[0].indexOf("localhost") >= 0) || (hostSplit && hostSplit[0] === "local")) {
    reVal = "http://dev.api.gopizza.kr";
    //reVal = "http://feature.api.gopizza.kr";
    //reVal = "http://api.gopizza.kr";
    // reVal = "http://192.168.0.10:8000";
  }

  return reVal;
};

const AxiosUtil = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30000,
});

AxiosUtil.interceptors.request.use(
  async (request: any) => {
    return request;
  },
  (error) => {
    // 요청 에러 처리를 작성합니다.

    return Promise.reject(error);
  }
);

AxiosUtil.interceptors.response.use(
  async (response: any) => {
    const resData = response.data as AxiosUtilResponse<any>;

    if (parseInt(resData.code) === 9999) {
      throw new Error(resData.code);
    }

    return response;
  },
  (error) => {
    // 요청 에러 처리를 작성합니다.

    return Promise.reject(error);
  }
);

export default AxiosUtil;
