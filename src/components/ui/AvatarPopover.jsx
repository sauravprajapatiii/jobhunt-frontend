import { useState, useRef, useEffect } from "react";
import { MdPerson, MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";
import axios from "axios";
const AvatarPopover = () => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        "/api/user/logout",
        {},
        { withCredentials: true },
      );

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message || "Logout failed. Try again.",
      );
    }
  };
  // close when clicking outside
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
        src={user.profile.profilePhoto}
        alt="avatar"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => setOpen(!open)}
      />

      {/* Popover */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 z-50">
          <ul className="text-sm">
            <li className="flex gap-4   ">
              <img
                src={user.profile.profilePhoto}
                alt="avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setOpen(!open)}
              />
              <div className="flex items-center">
                <h1 className="text-l">{user.fullname}</h1>
              </div>
            </li>

            {user && user.role === "student" ? (
              <>
                <Link to="/profile">
                  <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                    <MdPerson />
                    Profile
                  </li>
                </Link>
              </>
            ) : (
              <></>
            )}

            <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer text-red-500">
              <button
                onClick={() => logoutHandler()}
                className="flex items-center "
              >
                <MdLogout height={10} width={10} />
                <span className="ml-3"> Logout</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarPopover;
