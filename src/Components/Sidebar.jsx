// import { useState } from "react";
// import { DollarSign, TrendingUp, FlaskConical, BookOpen, Users } from "lucide-react";

// const Sidebar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [active, setActive] = useState("Population");

//     return (
//         <div className="relative z-10">
//             {/* Sidebar */}
//             <div
//                 className={`bg-white shadow-lg rounded-tr-xl rounded-br-xl text-gray-900 p-5 flex flex-col fixed top-[40%] left-0 transform transition-transform duration-300 ${isOpen ? "translate-x-0 w-50" : "-translate-x-full w-50"}`}
//             >
//                 {/* Menu Items */}
//                 <nav className="flex flex-col gap-4">
//                     <button
//                         className={`flex items-center gap-2 hover:text-gray-600 p-2 rounded-[5px] ${active === "Population" ? "bg-blue-500 text-white" : "text-gray-700"}`}
//                         onClick={() => setActive("Population")}
//                     >
//                         <Users size={24} />
//                         <span>Population</span>
//                     </button>
//                     <button
//                         className={`flex items-center gap-2 hover:text-gray-600 p-2 rounded-[5px] ${active === "Economy" ? "bg-blue-500 text-white" : "text-gray-700"}`}
//                         onClick={() => setActive("Economy")}
//                     >
//                         <DollarSign size={24} />
//                         <span>Economy</span>
//                     </button>
//                     <button
//                         className={`flex items-center gap-2 hover:text-gray-600 p-2 rounded-[5px] ${active === "Investment" ? "bg-blue-500 text-white" : "text-gray-700"}`}
//                         onClick={() => setActive("Investment")}
//                     >
//                         <TrendingUp size={24} />
//                         <span>Investment</span>
//                     </button>
//                     <button
//                         className={`flex items-center gap-2 hover:text-gray-600 p-2 rounded-[5px] ${active === "R&D" ? "bg-blue-500 text-white" : "text-gray-700"}`}
//                         onClick={() => setActive("R&D")}
//                     >
//                         <FlaskConical size={24} />
//                         <span>R&D</span>
//                     </button>
//                     <button
//                         className={`flex items-center gap-2 hover:text-gray-600 p-2 rounded-[5px] ${active === "General Research" ? "bg-blue-500 text-white" : "text-gray-700"}`}
//                         onClick={() => setActive("General Research")}
//                     >
//                         <BookOpen size={24} />
//                         <span>General Research</span>
//                     </button>

//                 </nav>
//             </div>
//             {/* Toggle Button */}
//             <button
//                 className={`p-2 z-40 rounded-full shadow-md fixed top-[35%] left-9 transform -translate-y-1/2 
//                 ${isOpen ? "bg-blue-500 text-white" : "bg-white text-black"}`}
//                 onClick={() => setIsOpen(!isOpen)}
//             >
//                 <DollarSign size={24} />
//             </button>
//         </div>
//     );
// };

// export default Sidebar;

import React, { useState } from 'react';
import { DollarSign, TrendingUp, FlaskConical, BookOpen, Users, Settings } from 'lucide-react';
import UpgradeModal from './UpgradeModal'; // Adjust the path as needed

const Sidebar = () => {
  const [active, setActive] = useState("Population");
  const [isOpen, setIsOpen] = useState(true);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const sidebarItems = [
    { icon: Users, label: "Population", key: "Population" },
    { icon: DollarSign, label: "Economy", key: "Economy" },
    { icon: TrendingUp, label: "Investment", key: "Investment" },
    { icon: FlaskConical, label: "R&D", key: "R&D" },
    { icon: BookOpen, label: "General Research", key: "General Research" }
  ];

  return (
    <div className={`bg-gray-900 text-white h-full flex flex-col transition-all duration-300 ease-in-out 
      ${isOpen ? 'w-64' : 'w-16'} relative`}>

      <button 
        className="absolute top-4 left-2 z-10 hover:bg-gray-800 p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="5" width="16" height="2" rx="1" fill="currentColor"/>
          <rect x="4" y="11" width="16" height="2" rx="1" fill="currentColor"/>
          <rect x="4" y="17" width="16" height="2" rx="1" fill="currentColor"/>
          {isOpen && <circle cx="20" cy="6" r="3" fill="#3B82F6" className="animate-ping"/>}
        </svg>
      </button>

      <nav className="flex-grow overflow-y-auto py-2 pt-20">
        {sidebarItems.map((item) => (
          <button
            key={item.key}
            className={`w-full text-left px-4 py-2 flex items-center hover:bg-gray-800 
              ${active === item.key ? 'bg-gray-700' : ''}`}
            onClick={() => setActive(item.key)}
          >
            <item.icon className="mr-3" size={20} />
            {isOpen && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="border-t border-gray-700">
        <div className=" justify-end left-2 p-3 border-b border-gray-700">
          <button className="hover:bg-gray-800 p-2 rounded">
            <Settings size={20} />
          </button>
        </div>

        <button 
          className="w-full text-left px-4 py-3 flex items-center hover:bg-gray-800"
          onClick={() => setIsUpgradeModalOpen(true)}
        >
          <DollarSign className="mr-3" size={20} />
          {isOpen && <span>Upgrade plan</span>}
        </button>
      </div>

      {isUpgradeModalOpen && <UpgradeModal onClose={() => setIsUpgradeModalOpen(false)} />}
    </div>
  );
};

export default Sidebar;
