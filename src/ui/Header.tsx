import { GlobalContext } from "@/context";
import { useContext, useState } from "react";
import { Link, useSearchParams } from "react-router-dom"

function Header() {
  /**
   * ? The search bar should be a datalist that filters from the suggestion names in the suggestionList, and displays not found if the value doesn't exist. That way, the suggestionList section only re-renders when the form is submitted. 
   */

  //! const [searchValue, setSearchValue] = useState<string>("");
  const {user, filterSearch, suggestions} = useContext(GlobalContext);
  //! const uniqueSuggestions = [...new Set(suggestions?.map(suggestion => (suggestion.name)))].sort();
 
  //! function handleSearch(e : any) {
  //!   setSearchValue(e.target.value.toLowerCase());
  //!   filterSearch(searchValue, 'search');
  //! }

 


  return (
    <div className="px-8 col-start-1 col-end-[-1] bg-slate-500 border-b-2 flex items-center justify-between text-xl text-white">
      {/* <div className="w-7"></div> */}
      <Link to={'/'}><h1 className="text-2xl">Wetin I Fit Chop</h1></Link>
      {/* <div>
        <input className="px-3 py-2 text-black rounded-3xl focus:outline-0 focus:ring-4 focus:ring-slate-300" type="text" list="search-filter" name="search" id="search-bar" onChange={handleSearch}  />
        <datalist id="search-filter">
          {
            uniqueSuggestions?.map((suggestion, i) => (i < uniqueSuggestions.length ? (<option key={suggestion} value={suggestion}></option>) : null))
          }
        </datalist>
      </div> */}
        {user?.name ? (<span>{user?.name}</span>) : (<Link to='/signin'>Signin</Link>)}
    </div>
  )
}

export default Header