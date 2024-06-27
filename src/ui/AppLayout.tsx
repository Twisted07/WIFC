import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"

function AppLayout() {
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