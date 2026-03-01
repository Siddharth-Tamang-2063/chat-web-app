import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { LoaderIcon, ShipWheelIcon, ShuffleIcon, Camera } from "lucide-react";
import { COUNTRIES, LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile complete! Welcome aboard 🎉");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(formState.fullName || "User")}&background=random&size=128`;
    setFormState({ ...formState, profilePic: avatar });
    toast.success("Avatar generated!");
  };

  const selectStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    borderRadius: "12px",
    padding: "12px 16px",
    width: "100%",
    fontSize: "14px",
    outline: "none",
    appearance: "none",
    cursor: "pointer",
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#070711]">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-15"
          style={{ background: "radial-gradient(ellipse, #6366f1 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      </div>

      <div className="relative w-full max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-4">
            <ShipWheelIcon className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-indigo-400 font-medium">Complete your profile</span>
          </div>
          <h1 className="text-3xl font-black text-white">Let's get you set up</h1>
          <p className="text-white/40 mt-2">Tell the community a bit about yourself</p>
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{
                  width: i < step ? "100%" : i === step - 1 ? "100%" : "0%",
                  background: "linear-gradient(90deg, #6366f1, #8b5cf6)"
                }} />
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="rounded-2xl border border-white/10 p-8 backdrop-blur-xl shadow-2xl space-y-6"
            style={{ background: "rgba(255,255,255,0.04)" }}>

            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/10 flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.06)" }}>
                  {formState.profilePic ? (
                    <img src={formState.profilePic} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-10 h-10 text-white/20" />
                  )}
                </div>
                {/* Glow ring */}
                {formState.profilePic && (
                  <div className="absolute inset-0 rounded-full"
                    style={{ background: "transparent", boxShadow: "0 0 0 3px rgba(99,102,241,0.4)" }} />
                )}
              </div>
              <button
                type="button"
                onClick={handleRandomAvatar}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all duration-200 text-sm"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <ShuffleIcon className="w-4 h-4" />
                Generate Random Avatar
              </button>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Full Name</label>
              <input
                type="text"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                placeholder="Your full name"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none border border-white/10 focus:border-indigo-500/60 transition-colors"
                style={{ background: "rgba(255,255,255,0.04)" }}
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Bio</label>
              <textarea
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                placeholder="Tell others about yourself and your interests..."
                rows={3}
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none border border-white/10 focus:border-indigo-500/60 transition-colors resize-none"
                style={{ background: "rgba(255,255,255,0.04)" }}
              />
            </div>

            {/* Language dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Your Country</label>
                <div className="relative">
                  <select
                    value={formState.nativeLanguage}
                    onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                    style={selectStyle}
                  >
                    <option value="" style={{ background: "#1a1a2e" }}>Select Country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c.toLowerCase()} style={{ background: "#1a1a2e" }}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">Learning Language</label>
                <div className="relative">
                  <select
                    value={formState.learningLanguage}
                    onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                    style={selectStyle}
                  >
                    <option value="" style={{ background: "#1a1a2e" }}>Select Language</option>
                    {LANGUAGES.map((l) => (
                      <option key={l} value={l.toLowerCase()} style={{ background: "#1a1a2e" }}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-white/60 mb-2">Phone Number</label>
              <input
                type="number"
                value={formState.location}
                onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                placeholder="Your phone number"
                className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none border border-white/10 focus:border-indigo-500/60 transition-colors"
                style={{ background: "rgba(255,255,255,0.04)" }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)", boxShadow: "0 0 30px rgba(99,102,241,0.3)" }}
            >
              {isPending ? (
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : (
                <>
                  <ShipWheelIcon className="w-4 h-4" />
                  Complete Profile
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;