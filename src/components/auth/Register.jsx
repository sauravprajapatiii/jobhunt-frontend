import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    email: "",
    fullname: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setInput({ ...input, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const formData = new FormData();
    Object.keys(input).forEach((key) => {
      if (key !== "file") formData.append(key, input[key]);
    });

    if (input.file) {
      formData.append("profilePhoto", input.file);
    }

    try {
      dispatch(setLoading(true));

      const res = await axiosInstance.post("/api/user/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="flex justify-center items-center px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8"
        >
          <h1 className="text-2xl font-bold text-center mb-6">
            Create Account 🚀
          </h1>

          {/* Inputs */}
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F83002]"
              value={input.email}
              onChange={handleChange}
              disabled={loading}
            />

            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#F83002]"
              value={input.fullname}
              onChange={handleChange}
              disabled={loading}
            />

            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#F83002]"
              value={input.phoneNumber}
              onChange={handleChange}
              disabled={loading}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#F83002]"
              value={input.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* Role */}
          <div className="mt-5">
            <p className="text-sm font-medium mb-2">Select Role</p>
            <div className="flex gap-6">
              {["student", "recruiter"].map((role) => (
                <label
                  key={role}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={input.role === role}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  <span className="capitalize">{role}</span>
                </label>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div className="mt-5">
            <label className="text-sm font-medium">
              Profile Photo (optional)
            </label>
            <input
              type="file"
              onChange={handleFile}
              disabled={loading}
              className="mt-2 text-sm"
            />
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full bg-[#F83002] text-white py-3 mt-6 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition disabled:opacity-70"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            {loading ? "Registering..." : "Register"}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#F83002] font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
