import React, { createContext, useState } from "react";
import { IUser } from "./services/apiUser";
import { ISuggestion, getSuggestions } from "./services/apiSuggestion";
import { useQuery } from "@tanstack/react-query";

type TGlobal = {
    isFilter?: Boolean,
    user?: IUser,
    // setUser?: React.Dispatch<React.SetStateAction<object>>,
    setUser?: any,
    setIsFilter: React.Dispatch<React.SetStateAction<Boolean>>,
    suggestionList?: ISuggestion[],
    setSuggestionList: React.Dispatch<React.SetStateAction<object[]>>,
    updateRemoteUser: (user: IUser) => void,
    filterSearch: (searchValue: string) => void,
    loadSuggestions: ()=>void,
    loadingSuggestions: any,
    suggestions?: any[],
}


export const GlobalContext = createContext<TGlobal>({});

function GlobalContextProvider ({children}: any) {
    // user, suggestionList,
    const [user, setUser] = useState({});
    const [suggestionList, setSuggestionList] = useState([{}]);
    const [isFilter, setIsFilter] = useState<Boolean>(false);
    
    const {isLoading: loadingSuggestions, data: suggestions, error: suggestionError} = useQuery({
        queryKey: ['suggestions'],
        queryFn: getSuggestions,
    })

    function updateRemoteUser(user : IUser) {
        setUser(user);
    }

    function loadSuggestions() {
        if (suggestions) {
            setSuggestionList(suggestions);
            setIsFilter(false);
        } else console.error('suggestions could not load in load suggestions');
    }
    
    function filterSearch(searchValue: string) {
        // TODO: modify into a switch case conditional that checks the filter type/category to decide the method for the search

            const filteredList = suggestions?.filter(suggestion => {
                return suggestion.name.toLowerCase().includes(searchValue)
            });
            setSuggestionList(filteredList as any[]);
            setIsFilter(true);
    }

    return (
        <GlobalContext.Provider value={{
            filterSearch,
            isFilter,
            setIsFilter,
            loadSuggestions,
            loadingSuggestions,
            updateRemoteUser,
            user,
            setUser,
            setSuggestionList,
            suggestions,
            suggestionList,
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalContextProvider;