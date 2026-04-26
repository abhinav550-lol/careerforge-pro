import React from "react";
import { Button } from "../ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";
import { 
  Briefcase, 
  LogOut, 
  LayoutDashboard, 
  Sparkles 
} from "lucide-react";
import { motion } from "framer-motion";

function Header({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.statusCode === 200) {
        dispatch(addUserData(""));
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <nav
      id="printHeader"
      className="sticky top-0 z-[100] flex justify-between px-6 md:px-12 lg:px-20 py-4 bg-white/80 backdrop-blur-xl border-b border-slate-100 items-center transition-all duration-300"
    >
      {/* Brand Identity - Universal & Friendly */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="bg-purple-600 p-2.5 rounded-2xl group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-purple-200">
          <Briefcase className="text-white w-5 h-5" />
        </div>
        <h1 className="font-black text-2xl tracking-tighter text-slate-900 uppercase">
          Career<span className="text-purple-600">Forge</span>
        </h1>
      </Link>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            {/* Dashboard Link - Approachable Naming */}
            <Button
              variant="ghost"
              className={`hidden md:flex items-center gap-2 font-bold rounded-2xl h-11 px-6 transition-all ${
                location.pathname === "/dashboard" 
                ? "bg-purple-50 text-purple-600" 
                : "text-slate-500 hover:text-slate-900"
              }`}
              onClick={() => navigate("/dashboard")}
            >
              <LayoutDashboard className="w-4 h-4" />
              Career Hub
            </Button>

            {/* Logout - Clean & Professional */}
            <Button 
              variant="ghost"
              className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl h-11 px-4 font-bold flex items-center gap-2 transition-all"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
            
            {/* User Profile - Premium Visual */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 border-2 border-white shadow-md ml-2 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10" />
            </motion.div>
          </>
        ) : (
          <div className="flex items-center gap-6">
             <Link to="/auth/sign-in" className="hidden md:block text-xs font-black uppercase tracking-widest text-slate-500 hover:text-purple-600 transition-colors">
               Sign In
             </Link>
             <Link to="/auth/sign-in">
              <Button className="bg-slate-900 text-white font-black uppercase text-[10px] tracking-[0.2em] px-8 h-12 rounded-2xl shadow-xl shadow-slate-200 hover:bg-purple-600 transition-all active:scale-95 flex gap-2">
                Get Started <Sparkles className="w-4 h-4 text-purple-400" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;