import { useState } from "react";
import { DollarSign, TrendingUp, FlaskConical, BookOpen } from "lucide-react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [active, setActive] = useState("Economy");

    return (
        <div className="relative z-10">
            {/* Sidebar */}
            <div
                className={`bg-white shadow-lg rounded-tr-xl rounded-br-xl text-gray-900 p-5 flex flex-col fixed top-[40%] left-0 transform transition-transform duration-300 ${isOpen ? "translate-x-0 w-50" : "-translate-x-full w-50"}`}
            >
                {/* Menu Items */}
                <nav className="flex flex-col gap-4">
                    <button
                        className={`flex items-center gap-2 hover:text-gray-600 p-2 rounded-[5px] ${active === "Economy" ? "bg-blue-500 text-white" : "text-gray-700"}`}
                        onClick={() => setActive("Economy")}
                    >
                        <DollarSign size={24} />
                        <span>Economy</span>
                    </button>
                    <button
                        className={`flex items-center gap-2 hover:text-gray-600 p-2 rounded-[5px] ${active === "Investment" ? "bg-blue-500 text-white" : "text-gray-700"}`}
                        onClick={() => setActive("Investment")}
                    >
                        <TrendingUp size={24} />
                        <span>Investment</span>
                    </button>
                    <button
                        className={`flex items-center gap-2 hover:text-gray-600 p-2 rounded-[5px] ${active === "R&D" ? "bg-blue-500 text-white" : "text-gray-700"}`}
                        onClick={() => setActive("R&D")}
                    >
                        <FlaskConical size={24} />
                        <span>R&D</span>
                    </button>
                    <button
                        className={`flex items-center gap-2 hover:text-gray-600 p-2 rounded-[5px] ${active === "General Research" ? "bg-blue-500 text-white" : "text-gray-700"}`}
                        onClick={() => setActive("General Research")}
                    >
                        <BookOpen size={24} />
                        <span>General Research</span>
                    </button>
                </nav>
            </div>
            {/* Toggle Button */}
            <button
                className={`p-2 z-40 rounded-full shadow-md fixed top-[35%] left-9 transform -translate-y-1/2 
                ${isOpen ? "bg-blue-500 text-white" : "bg-white text-black"}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <DollarSign size={24} />
            </button>
        </div>
    );
};

export default Sidebar;