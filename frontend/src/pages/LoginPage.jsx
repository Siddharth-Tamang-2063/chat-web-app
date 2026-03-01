import { useState } from "react";
import { MessageCircle, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [focused, setFocused] = useState("");
  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#070711]">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5"
          style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 60%)" }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 items-center">
        
        {/* Left - Branding */}
        <div className="hidden lg:flex flex-col flex-1 space-y-8 pr-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">ChatApp</span>
          </div>

          <div>
            <h1 className="text-5xl font-black text-white leading-tight tracking-tight">
              Connect with<br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                the world
              </span>
            </h1>
            <p className="mt-4 text-lg text-white/50 leading-relaxed max-w-md">
              Make friends, share languages, and have meaningful conversations with people from every corner of the globe.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-col gap-3">
            {["Real-time messaging & video calls", "Connect with language partners", "Discover people worldwide"].map((feat, i) => (
              <div key={i} className="flex items-center gap-3 text-white/60">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                </div>
                <span className="text-sm">{feat}</span>
              </div>
            ))}
          </div>

          {/* Floating card preview */}
       
        </div>

        {/* Right - Form */}
        <div className="w-full lg:w-[420px] flex-shrink-0">
          <div className="rounded-2xl border border-white/10 p-8 backdrop-blur-xl shadow-2xl"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            
            {/* Mobile logo */}
            <div className="flex lg:hidden items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">ChatApp</span>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">Welcome back</h2>
              <p className="text-white/40 mt-1 text-sm">Sign in to continue your conversations</p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                {error.response?.data?.message || "Something went wrong"}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email */}
              <div className={`relative rounded-xl border transition-all duration-200 ${focused === "email" ? "border-indigo-500/60 shadow-lg shadow-indigo-500/10" : "border-white/10"}`}
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focused === "email" ? "text-indigo-400" : "text-white/30"}`} />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-transparent pl-11 pr-4 py-3.5 text-white placeholder-white/30 text-sm outline-none"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  required
                />
              </div>

              {/* Password */}
              <div className={`relative rounded-xl border transition-all duration-200 ${focused === "password" ? "border-indigo-500/60 shadow-lg shadow-indigo-500/10" : "border-white/10"}`}
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focused === "password" ? "text-indigo-400" : "text-white/30"}`} />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-transparent pl-11 pr-4 py-3.5 text-white placeholder-white/30 text-sm outline-none"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: isPending ? "rgba(99,102,241,0.5)" : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", boxShadow: isPending ? "none" : "0 0 30px rgba(99,102,241,0.3)" }}
              >
                {isPending ? (
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>Sign In <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <p className="text-center text-white/40 text-sm mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;