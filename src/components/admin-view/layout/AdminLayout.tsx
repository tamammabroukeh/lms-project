import { Link, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Loader2, Menu, X } from 'lucide-react';
import { useLogout, useTypedTranslation } from '@/hooks';
import i18n from '@/i18n/config'; // Assuming you have an i18n config file
import { Button } from '@/components/ui/button';

export default function AdminLayout() {
  const { t } = useTypedTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Determine current language and if it's an RTL language
  const currentLanguage = i18n.language;
  const isRTL = currentLanguage === "ar"; // Assuming 'ar' is your Arabic language code

  // Update document direction based on language
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  // Define translated strings as variables
  const adminPanelTitle = t('admin:adminPanel');
  const dashboardLink = t('admin:dashboard');
  const usersLink = t('admin:users');
  const analyticsLink = t('admin:analytics');
  const coursesLink = t('admin:courses');
  const logout = t('auth:signout');
  // Function to handle language change
  const changeLanguage = (lng: string | undefined) => {
    i18n.changeLanguage(lng);
  };
  const { logoutHandler, isLoading } = useLogout()
  return (
    <div className={`flex h-screen bg-white text-gray-900 ${isRTL ? 'flex-row-reverse' : ''}`}>
      {/* Mobile sidebar toggle */}
      <button
        className={`md:hidden fixed top-4 z-50 p-2 rounded-md bg-black text-white transition-all duration-300
          ${isRTL
            ? (sidebarOpen ? 'right-64 mr-4' : 'right-4')
            : (sidebarOpen ? 'left-64 ml-4' : 'left-4')
          }`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - shows on desktop, toggles on mobile */}
      <aside
        className={`w-64 bg-black text-white fixed h-full transition-all duration-300 z-40
          ${sidebarOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full md:translate-x-0' : '-translate-x-full md:translate-x-0')}
          ${isRTL ? 'right-0' : 'left-0'} `}
      >
        <div className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold text-center">{adminPanelTitle}</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin"
                className="block px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                {dashboardLink}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="block px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                {usersLink}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/analytics"
                className="block px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                {analyticsLink}
              </Link>
            </li>
            <li>
              <Link
                to="/admin/courses"
                className="block px-4 py-2 rounded hover:bg-gray-800 transition"
              >
                {coursesLink}
              </Link>
            </li>
            <li>
              <Button
                variant={"ghost"}
                onClick={logoutHandler}
                className="flex items-center justify-start px-4 py-2 w-full text-start hover:text-white rounded hover:bg-gray-800 transition"
              >
                {logout}
                {isLoading && <Loader2 className='animate-spin ' />}
              </Button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <main className={`flex-1 overflow-auto pt-16 md:pt-0
        ${isRTL ? 'md:mr-64' : 'md:ml-64'}`}>
        <div className="p-6">
          {/* Language Switcher */}
          <div className={`fixed top-4 z-50 p-2 rounded-md bg-gray-100 text-gray-800 flex space-x-2
            ${isRTL ? 'left-4' : 'right-4'}`}>
            <button
              className={`px-3 py-1 rounded ${currentLanguage === 'en' ? 'bg-black text-white' : 'bg-gray-200'}`}
              onClick={() => changeLanguage('en')}
            >
              English
            </button>
            <button
              className={`px-3 py-1 rounded ${currentLanguage === 'ar' ? 'bg-black text-white' : 'bg-gray-200'}`}
              onClick={() => changeLanguage('ar')}
            >
              العربية
            </button>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
