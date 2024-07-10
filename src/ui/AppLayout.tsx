import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { useQuery } from "@tanstack/react-query"
import { getSuggestions } from "@/services/apiSuggestion"
import { useContext } from "react"
import { GlobalContext } from "@/context"

function AppLayout() {
  const {loadingSuggestions} = useContext(GlobalContext);
  if (loadingSuggestions) {
    return "Loading...";
  }

  return (
    <div className="min-h-screen grid grid-cols-[17rem_1fr] grid-rows-[5rem_1fr]">
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>


    </div>
  )
}

export default AppLayout