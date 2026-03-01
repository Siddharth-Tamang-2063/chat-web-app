import React from "react";
import useAuthUser from "../hooks/useAuthUser";
import { Link, useLocation } from "react-router";
import { BellIcon, LogOutIcon, MessageCircle } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();

  return (
    <nav className="sticky top-0 z-30 h-16 flex items-center border-b border-base-300 bg-base-100/80 backdrop-blur-xl">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">

          {/* Logo (only on chat page) */}
          {isChatPage ? (
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg group-hover:shadow-primary/40 transition-shadow">
                <MessageCircle className="w-4 h-4 text-primary-content" />
              </div>
              <span className="text-lg font-bold text-base-content hidden sm:block">ChatApp</span>
            </Link>
          ) : (
            <div />
          )}

          {/* Right side actions */}
          <div className="flex items-center gap-2 ml-auto">

            {/* Notifications */}
            <Link to="/notifications">
              <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-base-content/40 hover:text-base-content hover:bg-base-200 transition-all duration-200">
                <BellIcon className="w-5 h-5" />
              </button>
            </Link>

            {/* Theme */}
            <ThemeSelector />

            {/* Divider */}
            <div className="w-px h-6 bg-base-300 mx-1" />

            {/* Avatar */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-base-300">
                <img
                  src={authUser?.profilePic}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(authUser?.fullName || "U")}&background=6366f1&color=fff`;
                  }}
                />
              </div>
              <span className="hidden sm:block text-sm font-medium text-base-content/70 max-w-[120px] truncate">
                {authUser?.fullName}
              </span>
            </div>

            {/* Logout */}
            <button
              onClick={logoutMutation}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-base-content/30 hover:text-error hover:bg-error/10 transition-all duration-200"
              title="Sign out"
            >
              <LogOutIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;