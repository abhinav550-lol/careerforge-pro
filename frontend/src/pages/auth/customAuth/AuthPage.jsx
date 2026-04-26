import React, { useState } from "react";
import { 
  User, 
  Lock, 
  LogIn, 
  UserPlus, 
  Eye, 
  EyeOff, 
  Rocket, 
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
      setError("Please enter a valid architectural email.");
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50 selection:bg-purple-100">
      {/* Brand Identity */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-slate-900 shadow-xl shadow-slate-200">
          <Rocket className="text-white w-6 h-6" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
          Career<span className="text-purple-600">Forge</span> Pro
        </h1>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">
          AI-First Resume Engine
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Toggle Switch */}
        <div className="flex p-1.5 mb-8 bg-slate-100 rounded-2xl">
          <button
            onClick={() => { setIsSignUp(false); setError(""); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl transition-all ${
              !isSignUp ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <LogIn className="w-4 h-4" /> Sign In
          </button>
          <button
            onClick={() => { setIsSignUp(true); setError(""); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-xl transition-all ${
              isSignUp ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <UserPlus className="w-4 h-4" /> Sign Up
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
            <div className="mb-6">
               <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                {isSignUp ? "Create Architect Account" : "Welcome Back"}
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                {isSignUp ? "Join the squadron of elite developers." : "Access your professional dashboard."}
              </p>
            </div>
            
            <form onSubmit={handleAuth} className="space-y-4">
              {isSignUp && (
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/5 transition-all font-medium"
                  />
                </div>
              )}
              
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Architect Email"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/5 transition-all font-medium"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Secure Password"
                  required
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-500/5 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-[0.98] transition-all flex justify-center items-center gap-2 group"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-5 h-5" />
                ) : (
                  <>
                    {isSignUp ? "Generate Account" : "Enter Platform"}
                    <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
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
            className="mt-6 p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl border border-red-100 flex items-center justify-center gap-2"
          >
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
            {error}
          </motion.div>
        )}
      </motion.div>
      
      <p className="mt-8 text-slate-400 text-xs font-bold uppercase tracking-tighter">
        Secure Handshake via Gemini 3 Infrastructure
      </p>
    </div>
  );
}

export default AuthPage;