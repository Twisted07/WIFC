import { useQuery } from "@tanstack/react-query";
import { getSuggestions } from "../services/apiSuggestion";
import Card from "@/ui/Card";

function SuggestionList() {
  const {isLoading, data: suggestions, error} = useQuery({
    queryKey: ['suggestions'],
    queryFn: getSuggestions,
  })

  
  return (
    <div className="flex gap-[3rem] wrap">
      {suggestions?.map(suggestion => suggestion.name ? (<Card name={suggestion.name} image={suggestion.image} key={suggestion.id} />) : null)}

      {/* <Card /> */}
    </div>
  )
}

export default SuggestionList;