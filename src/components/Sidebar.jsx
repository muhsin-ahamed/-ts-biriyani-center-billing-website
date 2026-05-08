import React from 'react';
import { 
  LayoutDashboard, 
  ReceiptText, 
  MenuSquare, 
  Users, 
  PieChart, 
  Settings,
  UtensilsCrossed
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: false },
    { icon: ReceiptText, label: 'Billing', active: true },
    { icon: MenuSquare, label: 'Menu', active: false },
    { icon: UtensilsCrossed, label: 'Tables', active: false },
    { icon: Users, label: 'Customers', active: false },
    { icon: PieChart, label: 'Reports', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <div className="w-24 lg:w-64 h-screen bg-white shadow-soft flex flex-col items-center lg:items-start py-6 transition-all duration-300 z-10 sticky top-0 border-r border-gray-100">
      <div className="flex items-center gap-3 px-0 lg:px-8 mb-10 w-full justify-center lg:justify-start">
        <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center shadow-lg shadow-brand-orange/30">
          <span className="text-white font-bold text-xl">TS</span>
        </div>
        <span className="text-xl font-bold hidden lg:block text-gray-800 tracking-tight">Biriyani</span>
      </div>

      <nav className="w-full px-4 flex flex-col gap-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
              ${item.active 
                ? 'bg-brand-light text-brand-orange' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            <item.icon size={22} className={item.active ? 'text-brand-orange' : 'text-gray-400 group-hover:text-gray-600'} />
            <span className={`font-medium hidden lg:block ${item.active ? 'text-brand-orange' : ''}`}>
              {item.label}
            </span>
            {item.active && (
              <div className="hidden lg:block w-1.5 h-8 bg-brand-orange absolute right-0 rounded-l-full shadow-[0_0_10px_rgba(255,107,0,0.5)]"></div>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
