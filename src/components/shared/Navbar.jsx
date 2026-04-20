import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, X } from "lucide-react";
import AvatarPopover from "../ui/AvatarPopover";
import axiosInstance from "../../utils/axios";
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const navLink = (path) =>
    `relative transition ${
      isActive(path)
        ? "text-[#F83002] font-semibold"
        : "text-gray-700 hover:text-[#F83002]"
    }`;

  // ✅ Logout Handler
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
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* 🔥 Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Job<span className="text-[#F83002]">Portal</span>
        </Link>

        {/* ✅ Desktop Nav */}
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
              <Link to="/browse" className={navLink("/browse")}>
                Browse
              </Link>
            </>
          )}
        </nav>

        {/* ✅ Desktop Right */}
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
                <button className="px-4 py-2 text-sm bg-[#F83002] text-white rounded-lg hover:bg-red-600 transition shadow">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>

        {/* 📱 Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 bg-white border-t space-y-4">
          {/* 🔗 Links */}
          <div className="flex flex-col gap-3 text-sm font-medium">
            {user?.role === "recruiter" ? (
              <>
                <Link to="/admin/companies" onClick={() => setOpen(false)}>
                  Companies
                </Link>
                <Link to="/admin/jobs" onClick={() => setOpen(false)}>
                  Jobs
                </Link>
              </>
            ) : (
              <>
                <Link to="/" onClick={() => setOpen(false)}>
                  Home
                </Link>
                <Link to="/jobs" onClick={() => setOpen(false)}>
                  Jobs
                </Link>
                <Link to="/browse" onClick={() => setOpen(false)}>
                  Browse
                </Link>
              </>
            )}
          </div>

          <div className="border-t" />

          {/* 👤 Auth Section */}
          {user ? (
            <div className="flex flex-col gap-3">
              {/* User Info */}
              <div className="flex items-center gap-3">
                <img
                  src={user?.profile?.profilePhoto}
                  alt="avatar"
                  className="w-10 h-10 rounded-full border"
                />
                <div>
                  <p className="font-semibold text-sm">{user?.fullname}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>

              {/* Profile */}
              {user?.role === "student" && (
                <Link to="/profile" onClick={() => setOpen(false)}>
                  <button className="w-full py-2 border rounded-lg hover:bg-gray-100">
                    Profile
                  </button>
                </Link>
              )}

              {/* Logout */}
              <button
                onClick={logoutHandler}
                className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link to="/login" onClick={() => setOpen(false)}>
                <button className="w-full py-2 border rounded-lg">Login</button>
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                <button className="w-full py-2 bg-[#F83002] text-white rounded-lg shadow">
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
