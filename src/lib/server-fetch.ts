import { getCookie } from "@/services/auth/tokenHandler";
import envConfig from "./env.config";

const BACKEND_API_URL =
  envConfig.backend_api_url || "http://localhost:5000/api/v1/";

const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit
): Promise<Response> => {
  const { headers, ...rest } = options;
  const accessToken = await getCookie();

  const response = await fetch(`${BACKEND_API_URL + endpoint}`, {
    headers: {
      ...headers,
      Cookie: accessToken ? `accessToken=${accessToken}` : "",
    },
    ...rest,
  });

  return response;
};

export const serverFetch = {
  get: async (endpoint: string, options: RequestInit): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: async (endpoint: string, options: RequestInit): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "POST" }),

  patch: async (endpoint: string, options: RequestInit): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

  put: async (endpoint: string, options: RequestInit): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PUT" }),

  delete: async (endpoint: string, options: RequestInit): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};