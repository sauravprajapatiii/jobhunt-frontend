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
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    formData.append("password", input.password);

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
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center max-w-7xl mx-auto min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-6 shadow-sm"
        >
          <h1 className="font-bold text-xl mb-5 text-center">Register</h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-2 mb-3 rounded"
            value={input.email}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            className="w-full border p-2 mb-3 rounded"
            value={input.fullname}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            className="w-full border p-2 mb-3 rounded"
            value={input.phoneNumber}
            onChange={handleChange}
            disabled={loading}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-2 mb-3 rounded"
            value={input.password}
            onChange={handleChange}
            disabled={loading}
          />

          <div className="flex gap-4 mb-3">
            <label>
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

            <label>
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
          </div>

          <input type="file" onChange={handleFile} disabled={loading} />

          <button
            disabled={loading}
            className="w-full bg-[#F83002] text-white py-2 mt-4 rounded flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading && <Loader2 className="h-5 w-5 animate-spin" />}
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="mt-3 text-center">
            <Link to="/login">Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
