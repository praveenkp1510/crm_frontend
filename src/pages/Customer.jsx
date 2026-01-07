import React, { useState, useEffect } from "react";
import axios from "axios"; // 1. Import Axios
import Sidebar from "../components/Sidebar/Sidebar";

// 2. Access the Environment Variable
const API_URL = import.meta.env.VITE_API_URL;

const Customer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // 3. Use Axios with the Env Variable
      // Note: We use ${API_URL}/auth/users to match your backend route
      const response = await axios.get(`${API_URL}/auth/users`);
      
      // Axios puts the backend JSON inside 'response.data'
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      // Optional: Handle unauthorized errors (e.g. if token expires)
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredData = users.filter((user) =>
    Object.values(user).some((val) =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="flex min-h-screen bg-[#001529]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-[8vh] flex items-center justify-between px-[3vw] border-b border-[#303030]">
          <h1 className="text-[clamp(1.1rem,1.3vw,1.4rem)] font-semibold text-white">
            Customer Management
          </h1>

          <div className="text-[0.9vw] text-gray-300">
            Welcome,&nbsp;
            <span className="text-white font-semibold">
              {localStorage.getItem("ownerName") || "Admin"}
            </span>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-[2.5vw] min-h-[92vh]">
          <div className="bg-[#0c1d2e] rounded-[12px] p-[2vw] shadow-lg">
            {/* Header with Search */}
            <div className="flex justify-between items-center mb-[2vh]">
              <h2 className="text-[clamp(1rem,1.1vw,1.2rem)] font-medium text-white">
                User List
              </h2>

              <div className="relative w-[22vw]">
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full h-[4.5vh] bg-[#001529] text-gray-200 px-[2.5vw] rounded-md outline-none border border-[#303030] placeholder:text-gray-400"
                />
                <span className="absolute left-[0.8vw] top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  🔍
                </span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-[#303030] rounded-lg">
              <table className="min-w-full text-sm">
                <thead className="bg-[#001529] text-gray-300">
                  <tr>
                    {["Name", "Email", "Mobile", "Employer", "Role", "Address"].map((head) => (
                      <th key={head} className="px-[1.2vw] py-[1.6vh] text-left font-medium border-b border-[#303030]">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="text-center py-[3vh] text-gray-400">
                        <div className="flex items-center justify-center gap-2">
                           <span className="animate-spin">🌀</span> Loading users...
                        </div>
                      </td>
                    </tr>
                  ) : filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-[3vh] text-gray-400">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((user, index) => (
                      <tr
                        key={user.id}
                        className={`border-b border-[#303030] transition ${
                          index % 2 === 0 ? "bg-[#0c1d2e]" : "bg-[#0f2438]"
                        } hover:bg-[#112a45]`}
                      >
                        <td className="px-[1.2vw] py-[1.6vh] font-medium text-white">
                          {`${user.firstName} ${user.middleName || ""} ${user.lastName}`}
                        </td>
                        <td className="px-[1.2vw] py-[1.6vh] text-gray-300">{user.email}</td>
                        <td className="px-[1.2vw] py-[1.6vh] text-gray-300">{user.mobile}</td>
                        <td className="px-[1.2vw] py-[1.6vh] text-gray-300">{user.employerName}</td>
                        <td className="px-[1.2vw] py-[1.6vh]">
                          <span
                            className={`px-[0.8vw] py-[0.5vh] rounded-full text-xs font-semibold ${
                              user.role === "Owner"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : user.role === "Manager"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-blue-500/20 text-blue-400"
                            }`}
                          >
                            {user.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-[1.2vw] py-[1.6vh] text-gray-400 max-w-[18vw] truncate">
                          {user.address}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;