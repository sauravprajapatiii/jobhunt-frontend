import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Contact, Mail, Pen } from "lucide-react";
import AppliedJobs from "./AppliedJobs";
import UpdateProfile from "./UpdateProfile";
import { useSelector } from "react-redux";
import useGetAppliedJob from "../hooks/useGetAppliedJob";
const Profile = () => {
  useGetAppliedJob();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  console.log(user.profile);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <img
              src={user.profile.profilePhoto}
              alt="avatar"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            <div>
              <h1 className="font-medium text-xl">{user.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <button
            className="text-right border border-gray-200  px-2 "
            onClick={() => {
              setOpen(true);
            }}
          >
            <Pen />{" "}
          </button>
        </div>
        <div className="my-5">
          <div className="flex gap-4 items-center my-2">
            <Mail />
            <span>{user.email}</span>
          </div>
          <div className="flex my-2 items-center gap-4">
            <Contact />
            <span>{user.phoneNumber}</span>
          </div>
          <div className="my-5">
            <h1>Skills</h1>
            <div className="flex gap-4">
              {user.profile.skills.length !== 0 ? (
                user.profile.skills.map((item, index) => (
                  <span
                    className="border border-gray-300 px-2 rounded-md"
                    key={index}
                  >
                    {item}
                  </span>
                ))
              ) : (
                <h1>NA</h1>
              )}
            </div>
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5"></div>
      </div>
      <div className="max-w-4xl bg-white mx-auto rounded-2xl mb-10">
        <h1 className="font-medium text-lg">Applied Jobs</h1>
        <AppliedJobs />
      </div>
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
