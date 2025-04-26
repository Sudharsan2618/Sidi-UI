import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Settings, ChevronLeft, ChevronRight, Store, Map, LayoutDashboard, ChevronDown } from 'lucide-react';
import UpgradeModal from './UpgradeModal';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [active, setActive] = useState("");
  const [activeSubmenu, setActiveSubmenu] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const { mode: themeMode } = useSelector(state => state.theme);
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    {
      icon: DollarSign,
      label: "Economy",
      key: "economy",
      hasSubmenu: true,
      submenu: [
        { icon: Map, label: "Map", path: "/economy/map" },
        { icon: LayoutDashboard, label: "Dashboard", path: "/economy/dashboard" }
      ]
    },
    {
      icon: Store,
      label: "Market",
      key: "market",
      hasSubmenu: true,
      submenu: [
        { icon: Map, label: "Map", path: "/market/map" },
        { icon: LayoutDashboard, label: "Dashboard", path: "/market/dashboard" }
      ]
    },
    {
      icon: TrendingUp,
      label: "Industries",
      key: "investment",
      hasSubmenu: true,
      submenu: [
        { icon: Map, label: "Map", path: "/investment/map" },
        { icon: LayoutDashboard, label: "Dashboard", path: "/investment/dashboard" }
      ]
    }
  ];

  // Update active menu based on current route
  useEffect(() => {
    const path = location.pathname;
    const mainPath = path.split('/')[1]; // Get the first part of the path
    setActive(mainPath);

    // Set active submenu if we're on a submenu route
    const currentItem = sidebarItems.find(item => item.key === mainPath);
    if (currentItem?.hasSubmenu) {
      setActiveSubmenu(mainPath);
    }
  }, [location.pathname]);

  const isDark = themeMode === 'dark';

  const handleMenuClick = (item) => {
    if (item.hasSubmenu) {
      setActiveSubmenu(activeSubmenu === item.key ? "" : item.key);
    } else {
      setActiveSubmenu("");
      // Handle navigation for items without submenu if needed
    }
  };

  const handleSubmenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className={`${isDark ? 'bg-dark-bg border-r border-dark-border' : 'bg-white border-r border-neutral-200'} 
      h-full flex flex-col transition-all duration-300 ease-in-out
      ${isOpen ? 'w-72' : 'w-20'} relative`}>

      <button
        className={`absolute -right-3 top-9 z-20 p-1.5 rounded-full 
          ${isDark ? 'bg-primary-600 hover:bg-primary-700 border-dark-border' : 'bg-white hover:bg-neutral-100 border-neutral-200'} 
          transition-all duration-200 shadow-lg border-2`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ?
          <ChevronLeft size={16} className={isDark ? 'text-white' : 'text-neutral-600'} /> :
          <ChevronRight size={16} className={isDark ? 'text-white' : 'text-neutral-600'} />
        }
      </button>

      <div className={`px-4 py-6 border-b ${isDark ? 'border-dark-border' : 'border-neutral-200'}`}>
        <h1 className={`text-3xl font-bold text-primary-500
          ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          SIDI
        </h1>
      </div>

      <nav className="flex-grow overflow-y-auto py-6 px-3">
        {sidebarItems.map((item) => (
          <div key={item.key}>
            <button
              className={`w-full text-left px-4 py-3 mb-2 flex items-center justify-between rounded-lg
              transition-all duration-200 group
              ${active === item.key
                  ? isDark
                    ? 'bg-primary-600/20 text-primary-400 shadow-lg'
                    : 'bg-primary-50 text-primary-700 shadow-soft'
                  : isDark
                    ? 'hover:bg-dark-hover text-neutral-400 hover:text-primary-400'
                    : 'hover:bg-neutral-100 text-neutral-600 hover:text-primary-600'
                }`}
              onClick={() => handleMenuClick(item)}
            >
              <div className="flex items-center">
                <item.icon
                  className={`transition-all duration-200
                ${active === item.key
                      ? isDark ? 'text-primary-400' : 'text-primary-600'
                      : isDark ? 'text-neutral-400 group-hover:text-primary-400' : 'text-neutral-500 group-hover:text-primary-600'
                    }`}
                  size={20}
                />
                <span className={`ml-3 font-medium transition-all duration-200
              ${!isOpen && 'opacity-0 hidden'}`}>
                  {item.label}
                </span>
              </div>
              {item.hasSubmenu && isOpen && (
                <ChevronDown
                  size={16}
                  className={`transform transition-transform duration-200 ${activeSubmenu === item.key ? 'rotate-180' : ''} ${isDark ? 'text-neutral-400' : ''}`}
                />
              )}
            </button>

            {/* Submenu */}
            {item.hasSubmenu && activeSubmenu === item.key && isOpen && (
              <div className="ml-4 mb-2">
                {item.submenu.map((subItem) => (
                  <button
                    key={subItem.label}
                    className={`w-full text-left px-4 py-2 flex items-center rounded-lg
                      transition-all duration-200 
                      ${location.pathname === subItem.path
                        ? isDark
                          ? 'bg-primary-600/20 text-primary-400'
                          : 'bg-primary-50 text-primary-700'
                        : isDark
                          ? 'text-neutral-400 hover:bg-dark-hover hover:text-primary-400'
                          : 'text-neutral-600 hover:bg-neutral-100 hover:text-primary-600'
                      }`}
                    onClick={() => handleSubmenuClick(subItem.path)}
                  >
                    <subItem.icon size={16} className="mr-2" />
                    <span className="font-medium">{subItem.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className={`border-t p-4 ${isDark ? 'border-dark-border' : 'border-neutral-200'}`}>
        <button
          className={`w-full text-left px-4 py-3 flex items-center rounded-lg
            transition-all duration-200 bg-primary-600 hover:bg-primary-700 text-white shadow-lg`}
          onClick={() => setIsUpgradeModalOpen(true)}
        >
          <DollarSign className="text-white" size={20} />
          <span className={`ml-3 font-medium text-white
            ${!isOpen && 'opacity-0 hidden'}`}>
            Upgrade Pro
          </span>
        </button>

        <button className={`mt-4 w-full text-left px-4 py-3 flex items-center rounded-lg
          transition-all duration-200 
          ${isDark
            ? 'hover:bg-dark-hover text-neutral-400 hover:text-primary-400'
            : 'hover:bg-neutral-100 text-neutral-600 hover:text-primary-600'
          }`}>
          <Settings size={20} />
          <span className={`ml-3 font-medium ${!isOpen && 'opacity-0 hidden'}`}>
            Settings
          </span>
        </button>
      </div>

      {isUpgradeModalOpen && <UpgradeModal onClose={() => setIsUpgradeModalOpen(false)} />}
    </div>
  );
};

export default Sidebar;
