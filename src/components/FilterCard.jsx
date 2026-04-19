import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery, setFilters } from "../redux/jobSlice";

const filterData = [
  {
    filterType: "location",
    array: [
      "Gujarat",
      "Delhi NCR",
      "Banglore",
      "Hyderabad",
      "Pune",
      "Mumbai",
      "Gandhinagar",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "DevOps",
      "Fullstack Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "40-1 lakh", "1 lakh - 5 lakh"],
  },
];

const FilterCard = () => {
  // ✅ store all filters separately

  const [filters, setLocalFilters] = useState({
    location: "",
    Industry: "",
    Salary: "",
  });
  // const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  // ✅ handle change
  const changeHandler = (type, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // ✅ debug / check values
  useEffect(() => {
    dispatch(setFilters(filters));
    console.log("Selected Filters:", filters);
  }, [filters]);

  return (
    <div className="w-full bg-white p-4 rounded-md shadow-sm">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3 mb-4" />

      {filterData.map((data, index) => (
        <div key={index}>
          <h2 className="font-semibold my-2 text-md">{data.filterType}</h2>

          {data.array.map((item, i) => (
            <div key={i} className="flex items-center gap-2 my-1">
              <label className="text-sm">
                <input
                  type="radio"
                  name={data.filterType} // ✅ group
                  value={item}
                  checked={filters[data.filterType] === item} // ✅ controlled input
                  onChange={() => changeHandler(data.filterType, item)}
                />
                {item}
              </label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
