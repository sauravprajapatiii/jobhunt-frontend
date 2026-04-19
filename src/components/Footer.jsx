import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo / About */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
          <p className="text-sm mt-3">
            Find your dream job or hire top talent easily. We connect students
            and recruiters on one platform.
          </p>
        </div>

        {/* Links */}
        <div>
          <h2 className="text-white font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-white">
                Jobs
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-white">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-white font-semibold mb-3">Contact</h2>
          <p className="text-sm">Email: support@jobportal.com</p>
          <p className="text-sm mt-1">Phone: +91 9876543210</p>
          <p className="text-sm mt-1">Ahmedabad, India</p>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-white font-semibold mb-3">Follow Us</h2>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-white">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center text-sm py-4">
        © {new Date().getFullYear()} Job Portal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
