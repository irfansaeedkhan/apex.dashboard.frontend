import axios from "axios";
import {
  registerAuthTokenRequestInterceptor,
  registerAuthTokenResponseInterceptor,
} from "./auth-tokens-interceptors";
import { mockAdapter } from "./mock-adapter";

export const axiosAPI = axios.create({
  baseURL: "http://demo.local",
  adapter: mockAdapter,
});

registerAuthTokenRequestInterceptor(axiosAPI);
registerAuthTokenResponseInterceptor(axiosAPI);
