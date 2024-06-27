import { useQuery } from "@tanstack/react-query";
import { getSuggestions } from "../services/apiSuggestion";
import Card from "@/ui/Card";
import { Link } from "react-router-dom";

function SuggestionList() {
  const {isLoading, data: suggestions, error} = useQuery({
    queryKey: ['suggestions'],
    queryFn: getSuggestions,
  })

  
  if (isLoading) return (<h2>Loading...</h2>);
  
  return (
    <div className="flex gap-[3rem] wrap">
      {suggestions?.map(suggestion => suggestion.name ? (<Link to={`${suggestion.id}`} key={suggestion.id}><Card name={suggestion.name} image={suggestion.image} userID={suggestion.userID} id={suggestion.id} /></Link>) : null)}
    </div>
  )
}

export default SuggestionList;