import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, X, Briefcase } from "lucide-react";
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
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* 🧠 BRAND (Logo + Name) */}
        <Link to="/" className="flex items-center gap-2">
          <Briefcase className="text-[#F83002]" />

          {/* <img src="" alt="talentflow Logo" className="w-8 h-8 object-contain" /> */}

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
              {/* <Link to="/browse" className={navLink("/browse")}>
                Browse
              </Link> */}
            </>
          )}
        </nav>

        {/* 👤 Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <img
              src={user?.profile?.profilePhoto}
              alt="avatar"
              className="w-9 h-9 rounded-full border cursor-pointer"
            />
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="px-4 py-2 text-sm bg-[#F83002] text-white rounded-lg hover:bg-red-600">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>

        {/* 📱 Mobile Button */}
        <button className="md:hidden" onClick={() => setOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* 📱 MOBILE SIDE DRAWER */}
      <div
        className={`fixed inset-0 z-50 transition ${
          open ? "visible" : "invisible"
        }`}
      >
        {/* overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* sidebar */}
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-white shadow-lg transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Briefcase className="text-[#F83002]" />
              <span className="font-bold">
                Talent<span className="text-[#F83002]">Flow</span>
              </span>
            </div>

            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          {/* links */}
          <div className="p-4 flex flex-col gap-4 text-sm font-medium">
            {user?.role === "recruiter" ? (
              <>
                <Link onClick={() => setOpen(false)} to="/admin/companies">
                  Companies
                </Link>
                <Link onClick={() => setOpen(false)} to="/admin/jobs">
                  Jobs
                </Link>
              </>
            ) : (
              <>
                <Link onClick={() => setOpen(false)} to="/">
                  Home
                </Link>
                <Link onClick={() => setOpen(false)} to="/jobs">
                  Jobs
                </Link>
                <Link onClick={() => setOpen(false)} to="/browse">
                  Browse
                </Link>
              </>
            )}

            <hr />

            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <img
                    src={user?.profile?.profilePhoto}
                    className="w-10 h-10 rounded-full border"
                  />
                  <div>
                    <p className="font-semibold">{user?.fullname}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>

                <button
                  onClick={logoutHandler}
                  className="bg-red-500 text-white py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
                <Link to="/register" onClick={() => setOpen(false)}>
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
