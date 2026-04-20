import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import AvatarPopover from "../ui/AvatarPopover";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLink = (path) =>
    `relative transition ${
      isActive(path) ? "text-[#F83002]" : "text-gray-700 hover:text-[#F83002]"
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight">
          Job<span className="text-[#F83002]">Portal</span>
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
              <Link to="/browse" className={navLink("/browse")}>
                Browse
              </Link>
            </>
          )}
        </nav>

        {/* Desktop Right */}
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

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 bg-white border-t space-y-4">
          {/* Links */}
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

          {/* Divider */}
          <div className="border-t" />

          {/* Auth */}
          {user ? (
            <AvatarPopover />
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
