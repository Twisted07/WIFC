import { Outlet } from "react-router-dom";
import Header from "./Header";

function BasicLayout() {
  return (
    <div className="h-[100vh] flex flex-col ">
      <Header />
      <Outlet />
    </div>
  );
}

export default BasicLayout;
