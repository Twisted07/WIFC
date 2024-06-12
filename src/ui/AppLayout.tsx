import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="h-[100vh] bg-slate-500 flex flex-col text-[16px]">
      <Header />
      <div className="flex h-[80%] bg-white">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
