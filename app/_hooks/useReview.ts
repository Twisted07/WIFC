import { getReviews } from "@/_lib/data-service";
import { useQuery } from "@tanstack/react-query";

export function useGetReviewsBySuggestionID(id : string) {
  const getSuggestionReviews = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => getReviews(id),
  })

  return getSuggestionReviews;
}




