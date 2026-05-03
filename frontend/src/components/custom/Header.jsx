import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";
import { 
  Briefcase, 
  LogOut, 
  LayoutDashboard, 
  Sparkles,
  Menu,
  X 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Header({ user }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-slate-100 transition-all duration-300">
      <div className="flex justify-between px-4 md:px-12 lg:px-20 py-3 md:py-4 items-center">
        
        <Link to="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="bg-purple-600 p-2 md:p-2.5 rounded-xl md:rounded-2xl group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-purple-200">
            <Briefcase className="text-white w-4 h-4 md:w-5 md:h-5"/>
          </div>
          <h1 className="font-black text-xl md:text-2xl tracking-tighter text-slate-900 uppercase">
            Career<span className="text-purple-600">Forge</span>
          </h1>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          {user ? (
            <>
              
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

              
              <Button
                variant="ghost"
                className="hidden md:flex text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl h-11 px-4 font-bold items-center gap-2 transition-all"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4"/>
                Sign Out
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-xl"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
              </Button>
              
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="h-9 w-9 md:h-10 md:w-10 rounded-xl md:rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 border-2 border-white shadow-md cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10" />
              </motion.div>
            </>
          ) : (
            <Link to="/auth/sign-in">
              <Button className="bg-slate-900 text-white font-black uppercase text-[9px] md:text-[10px] tracking-[0.2em] px-5 md:px-8 h-10 md:h-12 rounded-xl md:rounded-2xl shadow-xl shadow-slate-200 hover:bg-purple-600 transition-all flex gap-2">
                Get Started <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-purple-400"/>
              </Button>
            </Link>
          )}
        </div>
      </div>

      
      <AnimatePresence>
        {isMobileMenuOpen && user && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-b border-slate-100 p-4 flex flex-col gap-2"
          >
       <Button 
  variant={location.pathname === "/dashboard" ? "secondary" : "ghost"}
  className="w-full justify-start h-12 rounded-xl font-bold gap-3"
  onClick={() => { 
    navigate("/dashboard"); 
    setIsMobileMenuOpen(false); 
  }}
>
  <LayoutDashboard className="w-4 h-4" /> 
  Career Hub
</Button>
            <Button variant="ghost" className="w-full justify-start h-12 rounded-xl font-bold gap-3 text-red-500 hover:bg-red-50" onClick="{handleLogout}">
              <LogOut className="w-4 h-4"/> Sign Out
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Header;