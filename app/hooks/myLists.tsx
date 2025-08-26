// hooks/useMyLists.ts
import { useQuery } from "@tanstack/react-query";
import useAxios from "../utils/axios/useAxios";

export function useLists(userId?: number) {
  const { AxiosRequest } = useAxios();

  return useQuery({
    queryKey: ["lists", userId],
    queryFn: async () => {
      if (!userId) return [];
      const response = await AxiosRequest({
        url: `/users/completed-rate/${userId}`,
        method: "GET",
      });
      return response.data; 
    },
    staleTime: 1000 * 60 * 5, // 5 mins cache
    refetchOnWindowFocus: false,
  });
}
