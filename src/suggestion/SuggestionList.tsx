import { useQuery } from "@tanstack/react-query";
import { getSuggestions } from "../services/apiSuggestion";
import MyCard from "@/ui/MyCard";
import { Link } from "react-router-dom";
import MyButton from "@/ui/MyButton";

function SuggestionList() {
  
  const {isLoading, data: suggestions, error} = useQuery({
    queryKey: ['suggestions'],
    queryFn: getSuggestions,
  })

  
  if (isLoading) return (<h2>Loading...</h2>);
  if (error) return (<h2>An error occurred while loading this page.</h2>);
  
  return (
    <>
      <div className="flex gap-[3rem] flex-wrap">
        {suggestions?.map(suggestion => suggestion.name ? (<Link to={`${suggestion.id}`} key={suggestion.id}><MyCard name={suggestion.name} image={suggestion.image} userID={suggestion.userID} id={suggestion.id} /></Link>) : null)}
      </div>

      <Link to={"create"}><MyButton>Add Suggestion</MyButton></Link>
    </>
  )
}

export default SuggestionList;