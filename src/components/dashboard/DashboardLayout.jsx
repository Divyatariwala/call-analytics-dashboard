import React from "react";
import { FiPieChart, FiUsers, FiSettings } from "react-icons/fi";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen font-sans bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-indigo-800 to-purple-800 text-white flex flex-col shadow-2xl">
        <div className="p-6 border-b border-indigo-700">
          <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-lg">
            Call Analytics
          </h1>
        </div>

        <nav className="flex flex-col mt-6 gap-2 px-4">
          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow hover:shadow-lg"
          >
            <FiPieChart className="w-6 h-6" />
            <span className="font-semibold text-lg">Dashboard</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow hover:shadow-lg"
          >
            <FiUsers className="w-6 h-6" />
            <span className="font-semibold text-lg">Users</span>
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow hover:shadow-lg"
          >
            <FiSettings className="w-6 h-6" />
            <span className="font-semibold text-lg">Settings</span>
          </a>
        </nav>

        <div className="mt-auto p-4 text-sm text-indigo-200 italic">
          © 2026 Call Analytics
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center shadow-md rounded-b-2xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Dashboard
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-700 dark:text-gray-300 font-medium">Admin</span>
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center text-white font-bold shadow-xl hover:scale-105 transition-transform duration-300">
              A
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8 flex-1 overflow-auto space-y-10">
          {children}
        </main>
      </div>
    </div>
  );
}