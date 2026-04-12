import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Patients", path: "/patients" },
  { label: "Tasks", path: "/tasks" },
  { label: "Shift Report", path: "/shift-report" },
];

export default function Sidebar() {
  const baseLinkClass = "rounded-lg px-3 py-2 text-sm transition";
  const activeLinkClass = "bg-slate-800 text-white";
  const inactiveLinkClass = "text-slate-300 hover:bg-slate-800 hover:text-white";

  return (
    <aside className="w-64 border-r border-slate-200 bg-slate-900 text-slate-100">
      <div className="border-b border-slate-800 px-5 py-4">
        <h2 className="text-lg font-semibold">Clinical System</h2>
      </div>

      <nav className="flex flex-col gap-1 p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}