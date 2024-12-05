"use client"
import { getSuggestions } from "@/_lib/data-service";
import { useQuery } from "@tanstack/react-query";

export function useGetSuggestions() {
  const getSuggest = useQuery({
  queryKey: ["suggestions"],
  queryFn: getSuggestions
})

  return getSuggest;
}
