import React, { useState } from "react";
import { FiPieChart, FiUsers, FiSettings, FiMenu } from "react-icons/fi";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 overflow-x-hidden">

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64
          bg-gradient-to-b from-indigo-800 to-purple-800
          text-white flex flex-col shadow-2xl
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-indigo-700 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold">Call Analytics</h1>

          <button
            className="lg:hidden text-white text-xl"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 mt-6 px-4">
          {[
            { icon: <FiPieChart />, label: "Dashboard" },
            { icon: <FiUsers />, label: "Users" },
            { icon: <FiSettings />, label: "Settings" },
          ].map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="mt-auto p-4 text-xs text-indigo-200">
          © 2026 Call Analytics
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-h-screen min-w-0">

        {/* Header */}
        <header className="flex items-center justify-between bg-white dark:bg-gray-800 border-b px-4 sm:px-6 py-4 shadow-sm">

          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu className="w-6 h-6" />
            </button>

            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
              Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm sm:text-base">Admin</span>

            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>

        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-6 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}