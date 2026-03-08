import { BellIcon } from "lucide-react";

function NoNotificationsFound() {
  return (
    <div className="text-center py-16 rounded-2xl border border-white/5"
      style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
        style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
        <BellIcon className="w-7 h-7 text-indigo-400" />
      </div>
      <h3 className="font-semibold text-white text-lg">All caught up!</h3>
      <p className="text-white/40 text-sm mt-2 max-w-xs mx-auto">
        When you receive friend requests or new connections, they'll appear here.
      </p>
    </div>
  );
}

export default NoNotificationsFound;