import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

import { 
  Factory, Zap, Leaf, Package, Menu, X,
  User, LogOut, Settings, ChevronDown
} from 'lucide-react';

import Energy from "./page/energy-dashboard";
import Carbon from "./page/carbon-dashboard";
import Waste from "./page/waste-dashboard";
import Transport from "./page/transport-dashboard";
import Esg from "./page/esg-dashboard";


const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { path: '/energy', icon: Zap, label: 'Energy', color: 'from-blue-500 to-cyan-600' },
    { path: '/carbon', icon: Leaf, label: 'Carbon', color: 'from-emerald-500 to-green-600' },
    { path: '/waste', icon: Package, label: 'Waste', color: 'from-yellow-400 to-amber-500' },
    { path: '/transport', icon: Package, label: 'Transport', color: 'from-red-400 to-pink-500' },
    { path: '/esg', icon: Package, label: 'ESG', color: 'from-purple-400 to-purple-500' }
  ];

  const isActive = (path : any) => location.pathname === path;

  return (
    <nav className="bg-white border-b-2 border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-2 rounded-xl shadow-md">
              <Factory className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Sustain Analyze</h1>
              <p className="text-xs text-gray-500">Environmental Monitoring</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map(({ path, icon: Icon, label, color }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive(path)
                    ? `bg-gradient-to-r ${color} text-white shadow-lg transform scale-105`
                    : "text-gray-600 hover:bg-gray-50 hover:scale-105"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}
          </div>

          {/* User Menu (Desktop) */}
          <div className="hidden md:flex items-center gap-4 relative">
            <div
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 cursor-pointer group select-none"
            >
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=16A34A&color=fff"
                className="w-9 h-9 rounded-full ring-2 ring-emerald-500"
              />
              <span className="font-semibold text-gray-700">Admin</span>
              <ChevronDown className="w-4 h-4 text-gray-600 group-hover:rotate-180 transition" />
            </div>

            {userMenuOpen && (
              <div className="absolute right-0 top-14 w-44 bg-white shadow-xl rounded-xl border p-2">
                <Link
                  to="/profile"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  <User className="w-4 h-4" /> Profile
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setUserMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  <Settings className="w-4 h-4" /> Settings
                </Link>

                <div className="border-t my-1"></div>

                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    console.log("Logged out");
                  }}
                  className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg w-full text-left"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Navigation List */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in slide-in-from-top">

            {navItems.map(({ path, icon: Icon, label, color }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-5 py-3 rounded-xl font-semibold transition-all ${
                  isActive(path)
                    ? `bg-gradient-to-r ${color} text-white shadow-lg`
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}

            {/* User section (mobile) */}
            <div className="px-5 pt-4 border-t">
              <div className="flex items-center gap-3 pb-3">
                <img
                  src="https://ui-avatars.com/api/?name=Admin&background=16A34A&color=fff"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800">Admin</p>
                  <p className="text-gray-500 text-sm">admin@example.com</p>
                </div>
              </div>

              <Link
                to="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
              >
                <Settings className="w-4 h-4" /> Settings
              </Link>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  console.log("Logged out");
                }}
                className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>

          </div>
        )}

      </div>
    </nav>
  );
};


// -------------------- MAIN APP --------------------
function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path="/" element={<Carbon />} />
        <Route path="/energy" element={<Energy />} />
        <Route path="/carbon" element={<Carbon />} />
        <Route path="/waste" element={<Waste />} />
        <Route path="/transport" element={<Transport />} />
        <Route path="/esg" element={<Esg />} />

        {/* Profile / Settings (ยังไม่ทำหน้า แต่ router พร้อมแล้ว) */}
        <Route path="/profile" element={<div className="p-10">Profile Page</div>} />
        <Route path="/settings" element={<div className="p-10">Settings Page</div>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
