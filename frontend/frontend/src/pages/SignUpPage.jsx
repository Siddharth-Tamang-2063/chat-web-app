import React, { useState } from "react";
import { MessageCircle, Mail, Lock, User, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp.js";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({ fullName: "", email: "", password: "" });
  const [focused, setFocused] = useState("");
  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  const passwordStrength = signupData.password.length === 0 ? 0
    : signupData.password.length < 6 ? 1
    : signupData.password.length < 10 ? 2 : 3;

  const strengthColors = ["", "#ef4444", "#f59e0b", "#10b981"];
  const strengthLabels = ["", "Weak", "Fair", "Strong"];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#070711]">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 items-center">

        {/* Left - Form */}
        <div className="w-full lg:w-[440px] flex-shrink-0">
          <div className="rounded-2xl border border-white/10 p-8 backdrop-blur-xl shadow-2xl"
            style={{ background: "rgba(255,255,255,0.04)" }}>

            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">ChatApp</span>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">Create account</h2>
              <p className="text-white/40 mt-1 text-sm">Join thousands of people connecting worldwide</p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
                {error.response?.data?.message || "Something went wrong"}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              {/* Full Name */}
              <div className={`relative rounded-xl border transition-all duration-200 ${focused === "name" ? "border-indigo-500/60 shadow-lg shadow-indigo-500/10" : "border-white/10"}`}
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focused === "name" ? "text-indigo-400" : "text-white/30"}`} />
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full bg-transparent pl-11 pr-4 py-3.5 text-white placeholder-white/30 text-sm outline-none"
                  value={signupData.fullName}
                  onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused("")}
                  required
                />
              </div>

              {/* Email */}
              <div className={`relative rounded-xl border transition-all duration-200 ${focused === "email" ? "border-indigo-500/60 shadow-lg shadow-indigo-500/10" : "border-white/10"}`}
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focused === "email" ? "text-indigo-400" : "text-white/30"}`} />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-transparent pl-11 pr-4 py-3.5 text-white placeholder-white/30 text-sm outline-none"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <div className={`relative rounded-xl border transition-all duration-200 ${focused === "password" ? "border-indigo-500/60 shadow-lg shadow-indigo-500/10" : "border-white/10"}`}
                  style={{ background: "rgba(255,255,255,0.04)" }}>
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${focused === "password" ? "text-indigo-400" : "text-white/30"}`} />
                  <input
                    type="password"
                    placeholder="Password (min 6 characters)"
                    className="w-full bg-transparent pl-11 pr-4 py-3.5 text-white placeholder-white/30 text-sm outline-none"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused("")}
                    required
                  />
                </div>
                {signupData.password.length > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1 flex-1">
                      {[1,2,3].map(i => (
                        <div key={i} className="h-1 flex-1 rounded-full transition-all duration-300"
                          style={{ backgroundColor: i <= passwordStrength ? strengthColors[passwordStrength] : "rgba(255,255,255,0.1)" }} />
                      ))}
                    </div>
                    <span className="text-xs" style={{ color: strengthColors[passwordStrength] }}>
                      {strengthLabels[passwordStrength]}
                    </span>
                  </div>
                )}
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" required className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 accent-indigo-500" />
                <span className="text-xs text-white/40 leading-relaxed">
                  I agree to the{" "}
                  <span className="text-indigo-400 hover:text-indigo-300">Terms of Service</span>
                  {" "}and{" "}
                  <span className="text-indigo-400 hover:text-indigo-300">Privacy Policy</span>
                </span>
              </label>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", boxShadow: "0 0 30px rgba(99,102,241,0.3)" }}
              >
                {isPending ? (
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  <>Create Account <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <p className="text-center text-white/40 text-sm mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Right - Info */}
        <div className="hidden lg:flex flex-col flex-1 space-y-6 pl-8">
          <div>
            <h1 className="text-5xl font-black text-white leading-tight tracking-tight">
              Start your<br />
              <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                journey today
              </span>
            </h1>
            <p className="mt-4 text-lg text-white/50 leading-relaxed max-w-md">
              Join a growing community of language learners and make real connections across the world.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "50K+", label: "Active Users" },
              { value: "120+", label: "Countries" },
              { value: "1M+", label: "Messages Sent" },
              { value: "4.9★", label: "User Rating" },
            ].map((stat, i) => (
              <div key={i} className="rounded-xl border border-white/10 p-4"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="rounded-xl border border-indigo-500/20 p-5"
            style={{ background: "rgba(99,102,241,0.08)" }}>
            <p className="text-white/70 text-sm leading-relaxed italic">
              "ChatApp helped me find a language partner in Japan. We've been practicing together for 6 months now!"
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-indigo-500" />
              <span className="text-xs text-white/50">Sarah K. — Language Learner</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;