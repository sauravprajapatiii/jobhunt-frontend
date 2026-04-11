import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {} from "@/components/ui/button";
const Navbar = () => {
  return (
    <div className="bg-white ">
      <div className="flex justify-between items-center mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div>
          <ul className="flex gap-5 font-medium items-center">
            <li>
              <Link>Home</Link>
            </li>
            <li>
              <Link>About</Link>
            </li>
            <li>
              <Link>Browse</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
