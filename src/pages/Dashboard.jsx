import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getUser();
    if (!storedUser) {
      navigate("/");
      return;
    }
    setUser(storedUser);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#15171c] text-gray-200 flex">
      <aside className="w-64 bg-[#1c1f26] border-r border-gray-700 p-5 hidden md:flex flex-col">
        <h2 className="text-xl font-bold tracking-wide text-amber-400 mb-8">
          DragonPanel
        </h2>

        <nav className="flex flex-col gap-3">
          <span className="flex items-center gap-3 px-3 py-2 rounded-md bg-amber-600/20 text-amber-400 cursor-pointer">
            <MdDashboard /> Dashboard
          </span>
          <span className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-white/5 cursor-pointer">
            <FaUserCircle /> Profile
          </span>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 px-3 py-2 rounded-md bg-red-600/10 text-red-400 hover:bg-red-600/20 transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold tracking-wide mb-6">
          Welcome back, <span className="text-amber-400">{user.name}</span> 👋
        </h1>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-[#1c1f26] border border-gray-700 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Account</p>
            <h2 className="text-lg font-semibold mt-1">Active</h2>
          </div>

          <div className="bg-[#1c1f26] border border-gray-700 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Email</p>
            <h2 className="text-lg font-semibold mt-1">{user.email}</h2>
          </div>

          <div className="bg-[#1c1f26] border border-gray-700 rounded-xl p-5">
            <p className="text-gray-400 text-sm">Role</p>
            <h2 className="text-lg font-semibold mt-1">User</h2>
          </div>
        </div>

        <div className="mt-8 bg-[#1c1f26] border border-gray-700 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>✔ Logged in successfully</li>
            <li>✔ Accessed dashboard</li>
            <li>✔ Session active</li>
          </ul>
        </div>
      </main>
    </div>
  );
};
