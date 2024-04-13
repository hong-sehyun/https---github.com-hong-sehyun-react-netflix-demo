import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecommendation = (id) => {
  return api.get(`/movie/${id}/recommendations`);
};
export const useRecommendationQuery = (id) => {
  return useQuery({
    queryKey: ["movie-recommendation"],
    queryFn: () => fetchRecommendation(id),
    select: (result) => result.data,
  });
};
