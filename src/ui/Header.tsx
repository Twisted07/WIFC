
function Header() {
  return (
    <div className="px-8 col-start-1 col-end-[-1] bg-slate-500 border-b-2 flex justify-between items-center text-xl text-white">
      <h1>Wetin I Fit Chop</h1>
      <input className="rounded-3xl px-3 py-2 text-black focus:outline-0 focus:ring-4 focus:ring-slate-300" type="text" name="search-bar" id="search-bar" />
      <span>User Icon</span>
    </div>
  )
}

export default Header