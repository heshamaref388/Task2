/* eslint-disable react/prop-types */

import {
  FaCoins,
  FaChartLine,
  FaCubes,
  FaChartPie,
  FaMoneyBill,
  FaGlobe,
  FaBox,
  FaBuilding,
} from "react-icons/fa";
import { useState } from "react";

const categories = [
  { name: "common stock", icon: <FaChartLine /> },
  { name: "cryptocurrency", icon: <FaCoins /> },
  { name: "exchange traded commodity", icon: <FaCubes /> },
  { name: "exchange traded fund", icon: <FaChartPie /> },
  { name: "fund", icon: <FaMoneyBill /> },
  { name: "index", icon: <FaGlobe /> },
  { name: "commodity", icon: <FaBox /> },
  { name: "mutual fund", icon: <FaBuilding /> },
];

export const Sidebar = ({
  selectedCategory,
  onSelectCategory,
  // onToggleDarkMode,
  isDarkMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* زر الفتح/الإغلاق للهواتف */}
      <button
        className="block md:hidden p-3 text-white bg-blue-500 rounded-lg fixed top-4 left-4 z-50 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-full p-6 shadow-lg border border-gray-300 transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Filter by Type</h2>

        <ul>
          {categories.map((category) => (
            <li
              key={category.name}
              className={`flex items-center py-3 px-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100 ${
                selectedCategory === category.name
                  ? "bg-gray-200 border-l-4 border-blue-500"
                  : ""
              }`}
              onClick={() => onSelectCategory(category.name)}
            >
              <span className="mr-3 text-blue-500">{category.icon}</span>
              <span className="text-gray-700">{category.name}</span>
            </li>
          ))}
          <li
            className={`flex items-center py-3 px-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100 ${
              !selectedCategory ? "bg-gray-200 border-l-4 border-blue-500" : ""
            }`}
            onClick={() => onSelectCategory(null)}
          >
            <span className="mr-3 text-gray-500">🔄</span>
            <span className="text-gray-700">All</span>
          </li>
        </ul>
      </div>

      {/* لإغلاق الـ Sidebar عند النقر خارجها (للشاشات الصغيرة فقط) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
