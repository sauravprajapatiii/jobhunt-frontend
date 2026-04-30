import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo / About */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Talent<span className="text-[#F83002]">Flow</span>
          </h1>
          <p className="text-sm mt-4 leading-relaxed">
            Find your dream job or hire top talent easily. We connect students
            and recruiters on one platform.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-white font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-white transition">
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-white transition">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-white font-semibold mb-4">Contact</h2>
          <div className="text-sm space-y-2">
            <p>📧 support@jobportal.com</p>
            <p>📞 +91 9876543210</p>
            <p>📍 Ahmedabad, India</p>
          </div>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-white font-semibold mb-4">Follow Us</h2>
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-white transition hover:scale-110">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-white transition hover:scale-110">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white transition hover:scale-110">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-white transition hover:scale-110">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 text-center text-xs sm:text-sm py-4 text-gray-500">
        © {new Date().getFullYear()} TalentFlow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
