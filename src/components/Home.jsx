import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, [user, navigate]); // ✅ FIXED

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* Categories */}
      <div className="mt-10">
        <CategoryCarousel />
      </div>

      {/* Jobs */}
      <div className="mt-16">
        <LatestJobs />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
