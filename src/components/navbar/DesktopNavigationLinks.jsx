import React from 'react'

export const DesktopNavigationLinks = ({ menuItems, activeLink, setActiveLink, navigate }) => {
  return (
    <div className="hidden md:flex items-center space-x-1">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeLink === item.name.toLowerCase();

        return (
          <button
            key={item.name}
            onClick={() => {
              navigate(item.path);
              setActiveLink(item.name.toLowerCase());
            }}
            className={`nav-link ${isActive ? 'active' : ''} px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-orange-50 transition-all flex items-center gap-2 group`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            <Icon size={16} className={`transition-all ${isActive ? 'text-orange-600' : 'text-gray-500'} group-hover:text-orange-600`} />
            <span>{item.name}</span>
            {isActive && (
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
            )}
          </button>
        );
      })}
    </div>
  )
}
