import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { toast } from "sonner";

const UpdateProfile = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  console.log(user.profile);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    bio: "",
    skills: "",
    file: null,
  });

  // ✅ Prefill form when modal opens
  useEffect(() => {
    if (user && open) {
      setForm({
        fullname: user.fullname || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        bio: user.profile?.bio || "",
        skills: user.profile?.skills?.join(", ") || "",
        file: null,
      });
    }
  }, [user, open]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      file: e.target.files[0],
    });
  };

  // ✅ UPDATED SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // ✅ start loading

    try {
      const formData = new FormData();

      formData.append("fullname", form.fullname);
      formData.append("email", form.email);
      formData.append("phoneNumber", form.phone);
      formData.append("bio", form.bio);
      formData.append("skills", form.skills);

      if (form.file) {
        formData.append("profilePhoto", form.file);
      }

      const res = await axios.put("/api/user/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-md"
        onClick={() => setOpen(false)}
      ></div>

      {/* Modal */}
      <div
        className="relative bg-white w-full max-w-lg rounded-xl shadow-lg p-6 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Update Profile</h2>
          <button onClick={() => setOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullname"
              className="w-full border p-2 rounded"
              value={form.fullname}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border p-2 rounded"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              className="w-full border p-2 rounded"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Skills</label>
            <input
              type="text"
              name="skills"
              className="w-full border p-2 rounded"
              value={form.skills}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Profile Photo
            </label>
            <input
              type="file"
              className="w-full border p-2 rounded"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              className="w-full border p-2 rounded"
              value={form.bio}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#F83002] text-white px-4 py-2 rounded disabled:opacity-70"
            >
              {loading ? "Please wait..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
