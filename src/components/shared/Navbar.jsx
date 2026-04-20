import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AvatarPopover from "../ui/AvatarPopover";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Active link helper
  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    isActive(path)
      ? "text-[#F83002] font-semibold"
      : "text-gray-700 hover:text-[#F83002]";

  return (
    <div className="bg-white shadow-sm">
      <div className="flex justify-between items-center mx-auto max-w-7xl h-16 px-4 sm:px-6">
        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold">
          Job <span className="text-[#F83002]">Portal</span>
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:block">
          <ul className="flex gap-8 font-medium items-center">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className={linkClass("/admin/companies")}
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className={linkClass("/admin/jobs")}>
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className={linkClass("/")}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className={linkClass("/jobs")}>
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className={linkClass("/browse")}>
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Desktop Right */}
        <div className="hidden md:block">
          {user ? (
            <AvatarPopover />
          ) : (
            <div className="flex gap-4">
              <Link to="/login">
                <button className="px-4 py-2 border rounded-md">Login</button>
              </Link>
              <Link to="/register">
                <button className="px-4 py-2 bg-[#F83002] text-white rounded-md">
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-4 font-medium">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className={linkClass("/admin/companies")}
                    onClick={() => setOpen(false)}
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className={linkClass("/admin/jobs")}
                    onClick={() => setOpen(false)}
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className={linkClass("/")}
                    onClick={() => setOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className={linkClass("/jobs")}
                    onClick={() => setOpen(false)}
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className={linkClass("/browse")}
                    onClick={() => setOpen(false)}
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* 🔥 Mobile Auth Section */}
          <div className="mt-4 border-t pt-4">
            {user ? (
              <AvatarPopover />
            ) : (
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={() => setOpen(false)}>
                  <button className="w-full px-4 py-2 border rounded-md">
                    Login
                  </button>
                </Link>
                <Link to="/register" onClick={() => setOpen(false)}>
                  <button className="w-full px-4 py-2 bg-[#F83002] text-white rounded-md">
                    Signup
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
