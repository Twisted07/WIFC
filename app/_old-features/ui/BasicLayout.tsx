import { Outlet } from "react-router-dom"

function BasicLayout() {
  return (
    <div className="flex flex-col items-center">
      <Outlet />
    </div>
  )
}

export default BasicLayout