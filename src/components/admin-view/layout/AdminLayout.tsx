import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Or any other icon library you're using

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Mobile sidebar toggle */}
      <button
        className={`md:hidden fixed top-4 z-50 p-2 rounded-md bg-black text-white transition-all duration-300
          ${sidebarOpen ? 'left-64 ml-4' : 'left-4'}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - shows on desktop, toggles on mobile */}
      <aside 
        className={`w-64 bg-black text-white fixed h-full transition-all duration-300 z-40
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <a 
                href="/admin" 
                className="block px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a 
                href="/admin/users" 
                className="block px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                Users
              </a>
            </li>
            <li>
              <a 
                href="/admin/analytics" 
                className="block px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                Analytics
              </a>
            </li>
            <li>
              <a 
                href="/admin/courses" 
                className="block px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                Courses
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 overflow-auto md:ml-64 pt-16 md:pt-0">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}