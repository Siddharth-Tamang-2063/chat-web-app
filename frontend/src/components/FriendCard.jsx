import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { MessageCircle } from "lucide-react";

const FriendCard = ({ friend }) => {
  return (
    <div
      className="rounded-2xl border border-white/5 p-4 hover:border-white/10 transition-all duration-300 group"
      style={{ background: "rgba(255,255,255,0.03)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* User info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-shrink-0">
          <div className="w-11 h-11 rounded-full overflow-hidden border border-white/10">
            <img
              src={friend.profilePic}
              alt={friend.fullName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(friend.fullName)}&background=6366f1&color=fff`;
              }}
            />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#070711]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-sm truncate">{friend.fullName}</h3>
          <p className="text-xs text-emerald-400/70 flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            Online
          </p>
        </div>
      </div>

      {/* Language badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs border border-violet-500/20 text-violet-400"
          style={{ background: "rgba(139,92,246,0.1)" }}>
          {getLanguageFlag(friend.nativeLanguage)}
          {friend.nativeLanguage}
        </span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs border border-cyan-500/20 text-cyan-400"
          style={{ background: "rgba(6,182,212,0.1)" }}>
          {getLanguageFlag(friend.learningLanguage)}
          {friend.learningLanguage}
        </span>
      </div>

      <Link
        to={`/chat/${friend._id}`}
        className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-white/70 hover:text-white border border-white/10 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all duration-200"
      >
        <MessageCircle className="w-4 h-4" />
        Message
      </Link>
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;
  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];
  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-0.5 inline-block"
      />
    );
  }
  return null;
}