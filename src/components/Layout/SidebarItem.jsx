import { NavLink } from "react-router-dom";

export default function SidebarItem({ icon, title, url }) {
  return (
    <NavLink to={url} className="block">
    {({ isActive }) => (
      <li
      className={`flex items-center gap-3 px-4 py-2 my-1 rounded-lg transition-colors duration-150 ease-in-out ${
        isActive
        ? "bg-sky-100 text-sky-700"
        : "text-gray-900 hover:bg-gray-100"
      }`}
      >
      <img src={icon} alt={title} className="w-6 h-6" />
      <span className="hidden lg:block text-sm font-medium">{title}</span>
      </li>
    )}
    </NavLink>
  );
}
