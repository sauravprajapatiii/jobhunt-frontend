import { Edit2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company,
  );
  const navigate = useNavigate();
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });

    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="px-2 sm:px-4 md:px-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <h2 className="text-lg sm:text-xl font-semibold p-4 border-b text-center sm:text-left">
          A List of your registered companies
        </h2>

        {/* Table Wrapper for horizontal scroll */}
        <div className="overflow-x-auto">
          <table className="min-w-[500px] w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-3 sm:px-4 py-2">Logo</th>
                <th className="px-3 sm:px-4 py-2">Name</th>
                <th className="px-3 sm:px-4 py-2">Date</th>
                <th className="px-3 sm:px-4 py-2 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filterCompany?.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    You have not registered any company yet.
                  </td>
                </tr>
              ) : (
                filterCompany?.map((company, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    {/* Logo */}
                    <td className="px-3 sm:px-4 py-2">
                      <img
                        src={company.logo}
                        alt="logo"
                        className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-md border"
                      />
                    </td>

                    {/* Name */}
                    <td className="px-3 sm:px-4 py-2 font-medium text-gray-800 text-xs sm:text-sm">
                      {company.name}
                    </td>

                    {/* Date */}
                    <td className="px-3 sm:px-4 py-2 text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                      {company.createdAt?.split("T")[0]}
                    </td>

                    {/* Action */}
                    <td className="px-3 sm:px-6 py-2 text-right">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                      >
                        <Edit2 className="w-4 h-4 inline-block cursor-pointer text-gray-600 hover:text-blue-600" />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompaniesTable;
