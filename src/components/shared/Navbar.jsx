import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, X, Briefcase, UserCircle, LogOut } from "lucide-react"; // Added icons
import axiosInstance from "../../utils/axios";
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";
import AvatarPopover from "../ui/AvatarPopover";
// import AvatarPopover from "./AvatarPopover";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const navLink = (path) =>
    `transition ${
      isActive(path)
        ? "text-[#F83002] font-semibold"
        : "text-gray-700 hover:text-[#F83002]"
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
          <Briefcase className="text-[#F83002]" />
          <span className="text-xl font-bold tracking-tight">
            Talent<span className="text-[#F83002]">Flow</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {user?.role === "recruiter" ? (
            <>
              <Link
                to="/admin/companies"
                className={navLink("/admin/companies")}
              >
                Companies
              </Link>
              <Link to="/admin/jobs" className={navLink("/admin/jobs")}>
                Jobs
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className={navLink("/")}>
                Home
              </Link>
              <Link to="/jobs" className={navLink("/jobs")}>
                Jobs
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
            <div className="flex items-center gap-2">
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

          <div className="p-4 flex flex-col gap-4 text-sm font-medium">
            {/* Mobile Navigation Links */}
            {user?.role === "recruiter" ? (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  to="/admin/companies"
                  className="py-2 hover:text-[#F83002]"
                >
                  Companies
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  to="/admin/jobs"
                  className="py-2 hover:text-[#F83002]"
                >
                  Jobs
                </Link>
              </>
            ) : (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  to="/"
                  className="py-2 hover:text-[#F83002]"
                >
                  Home
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  to="/jobs"
                  className="py-2 hover:text-[#F83002]"
                >
                  Jobs
                </Link>
              </>
            )}

            <hr className="my-2" />

            {user ? (
              <div className="flex flex-col gap-4">
                {/* User Info Section */}
                <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
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

                {/* 🚀 NEW: MOBILE PROFILE LINK */}
                {user?.role === "student" && (
                  <Link
                    onClick={() => setOpen(false)}
                    to="/profile"
                    className="flex items-center gap-3 py-3 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition"
                  >
                    <UserCircle size={20} className="text-gray-500" />
                    <span className="font-semibold text-gray-700">
                      My Profile
                    </span>
                  </Link>
                )}

                {/* Mobile Logout */}
                <button
                  onClick={logoutHandler}
                  className="flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition shadow-md shadow-red-200"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
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
