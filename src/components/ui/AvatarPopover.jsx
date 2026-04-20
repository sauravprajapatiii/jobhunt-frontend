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
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

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
      {/* Avatar Toggle */}
      <img
        src={user?.profile?.profilePhoto || "/default-avatar.png"}
        alt="avatar"
        className="w-9 h-9 rounded-full object-cover cursor-pointer border hover:scale-105 transition"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      />

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border z-[100] overflow-hidden animate-in fade-in zoom-in duration-200">
          {/* User Info Section */}
          <div className="flex items-center gap-3 p-4 border-b bg-gray-50/50">
            <img
              src={user?.profile?.profilePhoto || "/default-avatar.png"}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div className="truncate">
              <h1 className="text-sm font-semibold text-gray-800 truncate">
                {user?.fullname}
              </h1>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-2 text-sm">
            {user?.role === "student" && (
              <Link to="/profile" onClick={() => setOpen(false)}>
                <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition">
                  <MdPerson className="text-lg text-gray-600" />
                  <span>My Profile</span>
                </div>
              </Link>
            )}

            <button
              onClick={logoutHandler}
              className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-red-50 text-red-500 cursor-pointer transition"
            >
              <MdLogout className="text-lg" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarPopover;
