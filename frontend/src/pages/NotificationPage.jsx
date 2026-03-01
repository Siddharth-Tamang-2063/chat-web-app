import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { BellIcon, ClockIcon, CheckIcon, UserCheckIcon } from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isLoading: isAccepting } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="min-h-screen bg-[#070711]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <p className="text-white/40 text-sm mt-1">Stay updated with your connections</p>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/5 p-5 animate-pulse"
                style={{ background: "rgba(255,255,255,0.03)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-white/10 rounded w-1/3" />
                    <div className="h-2 bg-white/5 rounded w-1/2" />
                  </div>
                  <div className="w-20 h-8 bg-white/5 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Incoming Requests */}
            {incomingRequests.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <UserCheckIcon className="w-4 h-4 text-indigo-400" />
                  <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">
                    Friend Requests
                  </h2>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                    {incomingRequests.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="rounded-2xl border border-white/5 p-4 transition-colors hover:border-white/10"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                            <img
                              src={request.sender.profilePic}
                              alt={request.sender.fullName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(request.sender.fullName)}&background=6366f1&color=fff`;
                              }}
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-white text-sm truncate">{request.sender.fullName}</h3>
                            <div className="flex flex-wrap gap-1 mt-1">
                              <span className="px-2 py-0.5 rounded-md text-xs border border-violet-500/20 text-violet-400"
                                style={{ background: "rgba(139,92,246,0.1)" }}>
                                {request.sender.nativeLanguage}
                              </span>
                              <span className="px-2 py-0.5 rounded-md text-xs border border-cyan-500/20 text-cyan-400"
                                style={{ background: "rgba(6,182,212,0.1)" }}>
                                {request.sender.learningLanguage}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => acceptRequestMutation(request._id)}
                          disabled={isAccepting}
                          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 disabled:opacity-60"
                          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 0 20px rgba(99,102,241,0.2)" }}
                        >
                          <CheckIcon className="w-4 h-4" />
                          Accept
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Accepted connections */}
            {acceptedRequests.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2">
                  <BellIcon className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider">New Connections</h2>
                </div>

                <div className="space-y-2">
                  {acceptedRequests.map((notification) => (
                    <div
                      key={notification._id}
                      className="rounded-2xl border border-emerald-500/10 p-4"
                      style={{ background: "rgba(16,185,129,0.05)" }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                          <img
                            src={notification.recipient.profilePic}
                            alt={notification.recipient.fullName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(notification.recipient.fullName)}&background=10b981&color=fff`;
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white">
                            <span className="font-semibold">{notification.recipient.fullName}</span>
                            <span className="text-white/50"> accepted your friend request</span>
                          </p>
                          <p className="text-xs text-white/30 flex items-center gap-1 mt-0.5">
                            <ClockIcon className="w-3 h-3" />
                            Recently
                          </p>
                        </div>
                        <span className="flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium text-emerald-400 border border-emerald-500/20"
                          style={{ background: "rgba(16,185,129,0.1)" }}>
                          Connected
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotificationsFound />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;