import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, X, Briefcase, UserCircle, LogOut } from "lucide-react";
import axiosInstance from "../../utils/axios";
import { setUser } from "../../redux/authSlice";
// import { useSelector } from "react-redux";
import { toast } from "sonner";
import AvatarPopover from "../ui/AvatarPopover";
import { Bookmark } from "lucide-react";
// import AvatarPopover from "./AvatarPopover";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { wishlistCount } = useSelector((store) => store.job);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Helper to check if path is active
  const isActive = (path) => location.pathname === path;

  // Desktop Link Styles
  const navLinkStyles = (path) =>
    `transition-colors duration-200 pb-1 border-b-2 ${
      isActive(path)
        ? "text-[#F83002] border-[#F83002] font-bold"
        : "text-gray-700 border-transparent hover:text-[#F83002]"
    }`;

  // Mobile Link Styles
  const mobileNavLinkStyles = (path) =>
    `flex items-center gap-3 p-3 rounded-lg transition-all ${
      isActive(path)
        ? "bg-red-50 text-[#F83002] font-bold shadow-sm"
        : "text-gray-700 hover:bg-gray-50"
    }`;

  const logoutHandler = async () => {
    try {
      const res = await axiosInstance.post("/api/user/logout");
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/");
        setOpen(false);
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* BRAND */}
        <Link to="/" className="flex items-center gap-2">
          <Briefcase className="text-[#F83002]" size={28} />
          <span className="text-xl font-bold tracking-tight">
            Talent<span className="text-[#F83002]">Flow</span>
          </span>
        </Link>

        {/* 💻 Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {user?.role === "recruiter" ? (
            <>
              <Link
                to="/admin/companies"
                className={navLinkStyles("/admin/companies")}
              >
                Companies
              </Link>
              <Link to="/admin/jobs" className={navLinkStyles("/admin/jobs")}>
                Jobs
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className={navLinkStyles("/")}>
                Home
              </Link>
              <Link to="/jobs" className={navLinkStyles("/jobs")}>
                Jobs
              </Link>
              <Link to="/wishlist" className={navLinkStyles("/wishlist")}>
                Wishlist
                {wishlistCount > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </>
          )}
        </nav>

        {/* 👤 Desktop Auth Area */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <AvatarPopover />
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 transition">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 text-sm bg-[#F83002] text-white rounded-lg hover:bg-red-600 transition">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button className="md:hidden p-2" onClick={() => setOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* 📱 MOBILE SIDE DRAWER */}
      <div
        className={`fixed inset-0 z-[60] transition ${open ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2 text-lg">
              <Briefcase className="text-[#F83002]" />
              <span className="font-bold">TalentFlow</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-4 flex flex-col gap-2 text-sm font-medium">
            {/* 🚀 HIGHLIGHTED MOBILE LINKS */}
            {user?.role === "recruiter" ? (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  to="/admin/companies"
                  className={mobileNavLinkStyles("/admin/companies")}
                >
                  Companies
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  to="/admin/jobs"
                  className={mobileNavLinkStyles("/admin/jobs")}
                >
                  Jobs
                </Link>
              </>
            ) : (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  to="/"
                  className={mobileNavLinkStyles("/")}
                >
                  Home
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  to="/jobs"
                  className={mobileNavLinkStyles("/jobs")}
                >
                  Jobs
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  to="/wishlist"
                  className={mobileNavLinkStyles("/wishlist")}
                >
                  <Bookmark size={20} />
                  <span>
                    Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                  </span>
                </Link>
              </>
            )}

            <hr className="my-4" />

            {user ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img
                    src={user?.profile?.profilePhoto || "/default-avatar.png"}
                    className="w-12 h-12 rounded-full border-2 border-white object-cover shadow-sm"
                    alt="user"
                  />
                  <div className="truncate">
                    <p className="font-bold text-gray-800 truncate">
                      {user?.fullname}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                {/* Mobile Profile Link with Highlight */}
                {user?.role === "student" && (
                  <Link
                    onClick={() => setOpen(false)}
                    to="/profile"
                    className={mobileNavLinkStyles("/profile")}
                  >
                    <UserCircle size={20} />
                    <span>My Profile</span>
                  </Link>
                )}

                <button
                  onClick={logoutHandler}
                  className="flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 mt-4">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="text-center p-3 border-2 border-gray-100 rounded-xl font-bold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="text-center p-3 bg-[#F83002] text-white rounded-xl font-bold"
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
