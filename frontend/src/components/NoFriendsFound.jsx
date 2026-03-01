// NoFriendsFound.jsx
import { Users } from "lucide-react";

const NoFriendsFound = () => {
  return (
    <div className="text-center py-16 rounded-2xl border border-white/5"
      style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
        style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
        <Users className="w-7 h-7 text-indigo-400" />
      </div>
      <h3 className="font-semibold text-white text-lg">No friends yet</h3>
      <p className="text-white/40 text-sm mt-2 max-w-xs mx-auto">
        Connect with language partners below to start practicing together!
      </p>
    </div>
  );
};

export default NoFriendsFound;