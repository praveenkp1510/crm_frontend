import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/customer", label: "Customers", icon: "👥" },
    { path: "/employees", label: "Employees", icon: "🧑‍💼" },
    { path: "/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-[18vw] min-h-screen bg-[#001529] flex flex-col border-r border-[#303030]">
      {/* Brand */}
      <div className="h-[8vh] flex items-center justify-center border-b border-[#303030]">
        <h1 className="text-[clamp(1rem,1.2vw,1.4rem)] font-semibold tracking-wide text-white">
          CRM ADMIN
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-[2vh] px-[1vw]">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <div
              key={item.path}
              // onClick={() => navigate(item.path)}
              className={`flex items-center gap-[1vw] px-[1.2vw] py-[1.6vh] mb-[0.5vh] rounded-md cursor-pointer transition
                ${
                  isActive
                    ? "bg-[#112a45] text-white"
                    : "text-gray-300 hover:bg-[#0f2438] hover:text-white"
                }
              `}
            >
              <span className="text-[1vw]">{item.icon}</span>
              <span className="text-[0.95vw] font-medium">{item.label}</span>
            </div>
          );
        })}
      </nav>

      {/* Footer / Optional */}
      <div className="h-[6vh] border-t border-[#303030] flex items-center justify-center text-gray-400 text-[0.75vw]">
        © 2026 CRM
      </div>
    </aside>
  );
};

export default Sidebar;
