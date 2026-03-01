import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api.js";
import { Link } from "react-router";
import { CheckCircleIcon, Phone, UserPlusIcon, UsersIcon, Search, MessageCircle } from "lucide-react";
import FriendCard, { getLanguageFlag } from "../components/FriendCard.jsx";
import NoFriendsFound from "../components/NoFriendsFound.jsx";

const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const [search, setSearch] = useState("");

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const ids = new Set();
    if (Array.isArray(outgoingFriendReqs)) {
      outgoingFriendReqs.forEach((req) => ids.add(req.recipient._id));
    }
    setOutgoingRequestsIds(ids);
  }, [outgoingFriendReqs]);

  const filteredUsers = Array.isArray(recommendedUsers)
    ? recommendedUsers.filter(u =>
        u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        u.nativeLanguage?.toLowerCase().includes(search.toLowerCase()) ||
        u.learningLanguage?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* Friends Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-base-content">Your Friends</h2>
              <p className="text-sm text-base-content/40 mt-0.5">{friends.length} connection{friends.length !== 1 ? "s" : ""}</p>
            </div>
            <Link
              to="/notifications"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-base-content/60 hover:text-base-content border border-base-300 hover:border-base-content/20 bg-base-200 hover:bg-base-300 transition-all duration-200"
            >
              <UsersIcon className="w-4 h-4" />
              Friend Requests
            </Link>
          </div>

          {loadingFriends ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-base-300 bg-base-200 p-4 animate-pulse">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-base-300" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-base-300 rounded w-3/4" />
                      <div className="h-2 bg-base-300 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="h-8 bg-base-300 rounded-xl" />
                </div>
              ))}
            </div>
          ) : friends.length === 0 ? (
            <NoFriendsFound />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {friends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          )}
        </section>

        {/* Discover Section */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-base-content">Discover People</h2>
              <p className="text-sm text-base-content/40 mt-0.5">Find language partners worldwide</p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/30" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or language..."
                className="pl-10 pr-4 py-2.5 rounded-xl text-sm bg-base-200 text-base-content placeholder:text-base-content/30 outline-none border border-base-300 focus:border-primary/50 w-full sm:w-64 transition-colors"
              />
            </div>
          </div>

          {loadingUsers ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-base-300 bg-base-200 p-5 animate-pulse">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full bg-base-300" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-base-300 rounded w-3/4" />
                      <div className="h-3 bg-base-300 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-3 bg-base-300 rounded" />
                    <div className="h-3 bg-base-300 rounded w-4/5" />
                  </div>
                  <div className="h-10 bg-base-300 rounded-xl" />
                </div>
              ))}
            </div>
          ) : filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="rounded-2xl border border-base-300 bg-base-200 p-5 hover:bg-base-300 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {/* User info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full overflow-hidden border border-base-300">
                          <img
                            src={user.profilePic}
                            alt={user.fullName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=6366f1&color=fff`;
                            }}
                          />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success border-2 border-base-200" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base-content truncate">{user.fullName}</h3>
                        {user.location && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-base-content/30" />
                            <span className="text-xs text-base-content/40 truncate">{user.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Language badges */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="badge badge-outline text-xs gap-1 text-violet-500 border-violet-500/30">
                        {getLanguageFlag(user.nativeLanguage)}
                        {capitalize(user.nativeLanguage)}
                      </span>
                      <span className="badge badge-outline text-xs gap-1 text-cyan-500 border-cyan-500/30">
                        {getLanguageFlag(user.learningLanguage)}
                        {capitalize(user.learningLanguage)}
                      </span>
                    </div>

                    {/* Bio */}
                    {user.bio && (
                      <p className="text-xs text-base-content/40 mb-4 line-clamp-2 leading-relaxed">{user.bio}</p>
                    )}

                    {/* Action button */}
                    <button
                      onClick={() => !hasRequestBeenSent && sendRequestMutation(user._id)}
                      disabled={hasRequestBeenSent || isPending}
                      className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                        hasRequestBeenSent
                          ? "bg-success/10 text-success border border-success/20 cursor-default"
                          : "btn btn-primary"
                      }`}
                    >
                      {hasRequestBeenSent ? (
                        <>
                          <CheckCircleIcon className="w-4 h-4" />
                          Request Sent
                        </>
                      ) : (
                        <>
                          <UserPlusIcon className="w-4 h-4" />
                          Connect
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 rounded-2xl border border-base-300 bg-base-200">
              <MessageCircle className="w-10 h-10 text-base-content/20 mx-auto mb-3" />
              <h3 className="font-semibold text-base-content/60">No matches found</h3>
              <p className="text-sm text-base-content/30 mt-1">Try a different search term</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;