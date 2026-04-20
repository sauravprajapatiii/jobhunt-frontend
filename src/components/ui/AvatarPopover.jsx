import { useState, useRef, useEffect } from "react";
import { MdPerson, MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";
import axiosInstance from "../../utils/axios";

const AvatarPopover = () => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axiosInstance.post("/api/user/logout");

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Logout failed. Try again.",
      );
    }
  };

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={popoverRef}>
      {/* Avatar */}
      <img
        src={user?.profile?.profilePhoto || "/default-avatar.png"}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover cursor-pointer border hover:scale-105 transition"
        onClick={() => setOpen(!open)}
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border z-50 overflow-hidden animate-fadeIn">
          {/* User Info */}
          <div className="flex items-center gap-3 p-4 border-b">
            <img
              src={user?.profile?.profilePhoto || "/default-avatar.png"}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h1 className="text-sm font-semibold text-gray-800">
                {user?.fullname}
              </h1>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>

          {/* Menu */}
          <div className="p-2 text-sm">
            {user?.role === "student" && (
              <Link to="/profile" onClick={() => setOpen(false)}>
                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                  <MdPerson className="text-lg" />
                  <span>My Profile</span>
                </div>
              </Link>
            )}

            <button
              onClick={logoutHandler}
              className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-red-50 text-red-500 cursor-pointer"
            >
              <MdLogout className="text-lg" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarPopover;
