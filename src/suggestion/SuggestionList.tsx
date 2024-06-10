import { useQuery } from "@tanstack/react-query";
import { getSuggestions } from "../services/apiSuggestion";

function SuggestionList() {
  const {isLoading, data: suggestions, error} = useQuery({
    queryKey: ['suggestions'],
    queryFn: getSuggestions,
  })

  
  return (
    <div>
      {suggestions?.map(suggestion => suggestion.name ? (<p>I like {suggestion.name}</p>) : <p>This suggestion has no name</p>)}
    </div>
  )
}

export default SuggestionList;