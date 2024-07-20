import { GlobalContext } from "@/context";
import { useContext } from "react";

function Sidebar() {
  /**
   * TODO: The sidebar is meant to be a list of filter categories by the kind of food - breakfast, lunch, supper/dinner. 
   * ? The list items (buttons) should filter the rendered images category by the button value.
   */
  return (
    <aside className="row-start-2 row-end-[-1] bg-slate-500">
      <ul className="space-y-3 text-center">
        <SidebarItem title="All" value="all" />
        <SidebarItem title="Breakfast" value="breakfast" />
        <SidebarItem title="Lunch" value="lunch" />
        <SidebarItem title="Dinner/Supper" value="dinner" />
        <SidebarItem title="Junks" value="junk" />
      </ul>
    </aside>
  )
}

function SidebarItem({title, value} : {title: string, value: string}) {
  const {filterSearch, loadSuggestions} = useContext(GlobalContext);
  function handleFilter() {
    setTimeout( () => {
      if (value === 'all') {
        loadSuggestions();
        return;
      }
      filterSearch(value, 'category-filter');
    }, 500)
  }

  return (
    <li role="button" className="py-4 bg-white" onClick={handleFilter} value={value}>{title}</li>
  );
}

export default Sidebar