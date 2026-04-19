import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const res = await axios.post("/api/user/login", input, {
        withCredentials: true,
      });

      if (res.data.success) {
        // localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅ ADD THIS
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center max-w-7xl mx-auto min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-6 shadow-sm"
        >
          <h1 className="font-bold text-xl mb-5 text-center">Login</h1>

          {/* Email */}
          <div className="mb-3">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border p-2 rounded disabled:bg-gray-100"
              required
              value={input.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border p-2 rounded disabled:bg-gray-100"
              required
              value={input.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Role */}
          <div className="flex items-center gap-5 mt-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="recruiter"
                onChange={handleChange}
                checked={input.role === "recruiter"}
                disabled={loading}
              />
              Recruiter
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value="student"
                onChange={handleChange}
                checked={input.role === "student"}
                disabled={loading}
              />
              Student
            </label>
          </div>

          {/* Button with Loader */}
          <button
            disabled={loading}
            className="w-full bg-[#F83002] hover:bg-red-600 transition text-white py-2 mt-7 rounded-md font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            {loading ? "Please wait..." : "Login"}
          </button>

          {/* Register Link */}
          <div className="mt-3 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
