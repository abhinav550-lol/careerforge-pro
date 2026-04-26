import React, { useState } from "react";
import { 
  User, 
  Lock, 
  LogIn, 
  UserPlus, 
  Eye, 
  EyeOff, 
  Briefcase, 
  Loader2,
  Mail,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { loginUser, registerUser } from "@/Services/login";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (event) => {
    setError("");
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const fullName = formData.get("fullname");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        const response = await registerUser({ fullName, email, password });
        if (response?.statusCode === 201) {
          const loginRes = await loginUser({ email, password });
          if (loginRes?.statusCode === 200) navigate("/dashboard");
        }
      } else {
        const user = await loginUser({ email, password });
        if (user?.statusCode === 200) navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#F8FAFC] selection:bg-purple-100">
      {/* Brand Identity - Clean & Universal */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="inline-flex items-center justify-center p-3.5 mb-4 rounded-2xl bg-purple-600 shadow-xl shadow-purple-100">
          <Briefcase className="text-white w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
          Career<span className="text-purple-600">Forge</span>
        </h1>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">
          Your Intelligent Career Partner
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-md p-10 bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-50"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Universal Toggle Switch */}
        <div className="flex p-1.5 mb-10 bg-slate-50 rounded-2xl border border-slate-100">
          <button
            onClick={() => { setIsSignUp(false); setError(""); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${
              !isSignUp ? "bg-white text-slate-900 shadow-md" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <LogIn className="w-4 h-4" /> Sign In
          </button>
          <button
            onClick={() => { setIsSignUp(true); setError(""); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${
              isSignUp ? "bg-white text-slate-900 shadow-md" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <UserPlus className="w-4 h-4" /> Join
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isSignUp ? "signup" : "signin"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-8">
               <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {isSignUp ? "Start Your Journey" : "Welcome Back"}
              </h2>
              <p className="text-slate-500 text-sm font-medium mt-1">
                {isSignUp ? "Create an account to build your future." : "Please enter your details to continue."}
              </p>
            </div>
            
            <form onSubmit={handleAuth} className="space-y-5">
              {isSignUp && (
                <div className="relative group">
                  <User className="absolute left-4 top-4 w-5 h-5 text-slate-300 group-focus-within:text-purple-600 transition-colors" />
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Your Full Name"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:bg-white focus:ring-8 focus:ring-purple-600/5 transition-all font-bold text-slate-700"
                  />
                </div>
              )}
              
              <div className="relative group">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-300 group-focus-within:text-purple-600 transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:bg-white focus:ring-8 focus:ring-purple-600/5 transition-all font-bold text-slate-700"
                />
              </div>

              <div className="relative group">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-300 group-focus-within:text-purple-600 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:bg-white focus:ring-8 focus:ring-purple-600/5 transition-all font-bold text-slate-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-slate-300 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-slate-900 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl shadow-xl shadow-slate-200 hover:bg-purple-600 active:scale-95 transition-all flex justify-center items-center gap-3 group mt-4"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <>
                    {isSignUp ? "Create Account" : "Sign In"}
                    <Sparkles className="w-4 h-4 text-purple-400 group-hover:rotate-12 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </AnimatePresence>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="mt-8 p-4 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-2xl border border-red-100 flex items-center justify-center gap-2"
          >
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
            {error}
          </motion.div>
        )}
      </motion.div>
      
      <p className="mt-10 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
        Secure Access Verified
      </p>
    </div>
  );
}

export default AuthPage;