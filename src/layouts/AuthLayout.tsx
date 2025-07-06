import { Outlet } from "react-router-dom";
import { Typography } from "@/components/ui/typography";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
export default function AuthLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b">
        <Link to={"/"} className="flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-4" />
          <Typography variant="h4" weight="extrabold">
            LMS LEARN
          </Typography>
        </Link>
        <LanguageSelector />
      </header>
      <Outlet />
    </div>
  );
}
