import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@http";
import type { Matches } from "@types";
import { getTransformedMatches } from "@utils";

const MATCHES_QUERY_KEY = ["matches"];

const fetchMatches = async () => {
  const { data } = await axiosInstance.get<Matches>("matches");

  return data;
};

const useMatches = () =>
  useQuery({
    queryKey: MATCHES_QUERY_KEY,
    queryFn: fetchMatches,
    select: getTransformedMatches,
  });

export default useMatches;
