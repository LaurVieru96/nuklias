import { QueryClient } from "@tanstack/react-query";
import { apiMock } from "./api-mock";

export async function apiRequest(
  method: string,
  url: string,
  data?: any,
): Promise<any> {
  if (url === "/api/messages" && method === "POST") {
    return await apiMock.messages.create(data);
  }
  throw new Error(`Mock API route not found: ${method} ${url}`);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = queryKey[0] as string;
        if (url === "/api/messages") {
          return await apiMock.messages.list();
        }
        throw new Error(`Mock API query not found: ${url}`);
      },
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

