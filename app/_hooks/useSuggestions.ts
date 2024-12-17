"use client"
import { getOneSuggestion, getSuggestions } from "@/_lib/data-service";
import { useQuery } from "@tanstack/react-query";

export function useGetSuggestions() {
  const getSuggest = useQuery({
  queryKey: ["suggestions"],
  queryFn: getSuggestions
})

  return getSuggest;
}

export function useGetSuggestionByID(id: string) {
  const getSuggest = useQuery({
    queryKey: ["suggestion", id],
    queryFn: () => getOneSuggestion(id),
  })

  return getSuggest;
}