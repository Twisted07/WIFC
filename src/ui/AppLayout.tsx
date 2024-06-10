import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"

function AppLayout() {
  return (
    <div className="min-h-screen grid grid-cols-[28rem_1fr] grid-rows-[10rem_1fr]">
      <Header />
      <Sidebar />
      <main>
        <Outlet />
      </main>


    </div>
  )
}

export default AppLayout