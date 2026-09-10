import type { AxiosAdapter, AxiosResponse } from "axios";
import { getMockResponse } from "@/lib/mock-api";

export const mockAdapter: AxiosAdapter = async (config) => {
  const response: AxiosResponse = {
    data: getMockResponse(config.url, config.method, config),
    status: 200,
    statusText: "OK",
    headers: {},
    config,
    request: {},
  };

  return Promise.resolve(response);
};