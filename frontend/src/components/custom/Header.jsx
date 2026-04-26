import React from "react";
import { Button } from "../ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";
import { 
  Rocket, 
  LogOut, 
  LayoutDashboard, 
  Sparkles 
} from "lucide-react"; // Using Lucide for consistency

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
      className="sticky top-0 z-[100] flex justify-between px-6 md:px-12 py-4 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 items-center shadow-sm"
    >
      {/* Brand Identity */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-slate-900 p-2 rounded-xl group-hover:rotate-6 transition-transform duration-300">
          <Rocket className="text-white w-5 h-5" />
        </div>
        <h1 className="font-black text-xl tracking-tighter text-slate-900 uppercase">
          Career<span className="text-purple-600">Forge</span> Pro
        </h1>
      </Link>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Button
              variant="ghost"
              className={`hidden md:flex items-center gap-2 font-bold rounded-xl transition-all ${
                location.pathname === "/dashboard" 
                ? "bg-slate-100 text-slate-900" 
                : "text-slate-500 hover:text-slate-900"
              }`}
              onClick={() => navigate("/dashboard")}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Button>

            <Button 
              variant="ghost"
              className="text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl font-bold flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
            
            {/* User Avatar Placeholder */}
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 border-2 border-white shadow-sm ml-2 cursor-pointer" />
          </>
        ) : (
          <div className="flex items-center gap-4">
             <Link to="/auth/sign-in" className="hidden md:block text-sm font-bold text-slate-600 hover:text-slate-900">
                Sign In
             </Link>
             <Link to="/auth/sign-in">
              <Button className="bg-slate-900 text-white font-bold px-6 h-11 rounded-xl shadow-lg shadow-slate-200 hover:scale-105 active:scale-95 transition-all flex gap-2">
                Get Started <Sparkles className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;