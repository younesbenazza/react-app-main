import React from 'react';
import SidebarItem from "./SidebarItem";
import { LibraryIcon } from 'lucide-react';

function Sidebar() {
  const menuItems = [
    { title: "الصفحة الرئيسية", icon: "homepage", url: "/" },
    { title: "الكتب", icon: "books", url: "/books" },
    { title: "التلاميذ", icon: "person", url: "/members" },
    { title: "الإعارة", icon: "loan", url: "/loan" },
    { title: "الإحصائيات", icon: "statistics", url: "/statistics" },
    { title: "بطاقة المكتبة", icon: "card", url: "/librarycard" },
    { title: "الأرشيف", icon: "archive", url: "/archive" },
    { title: "عن التطبيق", icon: "aboutus", url: "/aboutus" },
  ];

  return (
    <aside className="font-custom w-20 lg:w-64 h- bg-white shadow-lg transition-all duration-300 ease-in-out">
    <nav className="h-full flex flex-col fixed w-60 p-3">
    <div className="p-4 flex items-center justify-center lg:justify-start">
    <LibraryIcon className="w-8 h-8 text-sky-600" />
    <span className="hidden lg:block ml-2 text-xl font-semibold text-gray-800">مكتبتي</span>
    </div>
    <ul className="flex-1 overflow-y-auto py-4">
    {menuItems.map((item, index) => (
      <React.Fragment key={item.url}>
      {(index === 0 || index === 1 || index === 6 || index === 7) && (
        <li className="px-4 py-2 text-sm text-gray-500 lg:text-base">
        {index === 0 ? "الصفحة الرئيسية" :
          index === 1 ? "إدارة المكتبة" :
          index === 6 ? "إدارة الأرشيف" : "معلومات التطبيق"}
          </li>
      )}
      <SidebarItem
      title={item.title}
      icon={`/static/build/icons/${item.icon}.png`}
      url={item.url}
      />
      </React.Fragment>
    ))}
    </ul>
    </nav>
    </aside>
  );
}

export default Sidebar;
