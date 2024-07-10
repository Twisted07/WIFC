import MyCard from "@/ui/MyCard";
import { Link, useSearchParams } from "react-router-dom";
import MyButton from "@/ui/MyButton";
import { Key, useCallback, useContext, useEffect } from "react";
import { GlobalContext } from "@/context";

function SuggestionList() {
  /**
   *? The suggestion list should render from a copy of the remote suggestion list. That way, operations like filtering can be done without having to constantly refetch the data. 
   * 
   *? The filter value should be stored in the search params so that we are sure the user is done inputting their search value before we proceed to filter.
   *? Also, when there is no filter, the entire suggestions list should be rendered.
   */

  const {suggestionList, loadSuggestions, isFilter, user} = useContext(GlobalContext);

  useEffect(function() {
    if (!isFilter) {
        loadSuggestions();
    }
  }, [isFilter])

  return (
    <>
      <div className="flex gap-[3rem] flex-wrap">
        {suggestionList?.map((suggestion) => suggestion.name ? (<Link to={`${suggestion.id}`} key={suggestion.id as Key}><MyCard name={suggestion.name} image={suggestion.image[0]} userID={suggestion.userID} id={suggestion.id} /></Link>) : null)}
      </div>

      <Link to={user?.name ? "create" : "/signin"}><MyButton>Add Suggestion</MyButton></Link>
    </>
  )
}

export default SuggestionList;


