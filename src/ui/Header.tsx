import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="h-[20%] border-b flex items-center justify-between px-[40px] bg-slate-500">
      <div className="text-[20px] text-white ">Watin I Fit Chop</div>
      {!path.includes("create") &&
        !path.includes("signin") &&
        !path.includes("signup") && (
          <>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search for food"
              className="rounded-[100px] w-[50%] p-[10px] outline-none border border-transparent text-black"
            />

            <div className="h-[60px] w-[60px] rounded-[50%] bg-white text-black border border-black flex items-center justify-center">
              <p className="text-[20px]">GJ</p>
            </div>
          </>
        )}
    </div>
  );
}

export default Header;
