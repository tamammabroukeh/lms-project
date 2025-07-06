import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import useLogout from "@/hooks/auth/useLogout";
import { ReusableButton } from "../Reusable-Components";
import LanguageSelector from "../LanguageSelector";
import { useAuthContext, useTypedTranslation } from "@/hooks";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const { btnText, handleLoginOrLogout, isLoading } = useLogout();
  const { auth } = useAuthContext()
  const { t } = useTypedTranslation()
  let role = auth?.userData?.role
  let isTeacher = role === "teacher"
  return (
    <header className="flex items-center justify-between p-4 border-b relative">
      <div className="flex items-center space-x-4">
        <Link to="/" className="flex items-center hover:text-black">
          <GraduationCap className="h-8 w-8 mr-4 " />
          <span className="font-extrabold md:text-xl text-[14px]">
            LMS LEARN
          </span>
        </Link>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            onClick={() => {
              location.pathname.includes("/courses")
                ? null
                : navigate("/courses");
            }}
            className="text-[14px] md:text-[16px] font-medium"
          >
            {t("course:explore")} {t("course:courses")}
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/about")
            }
            className="text-[14px] md:text-[16px] font-medium"
          >
            {t("course:about_us")}
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              navigate("/contact")
            }
            className="text-[14px] md:text-[16px] font-medium"
          >
            {t("course:contact_us")}
          </Button>
          <LanguageSelector />
          {(isTeacher || role === "admin") && <ReusableButton
            isLoading={false}
            btnText={t("course:my_dashboard")}
            onClick={() => navigate(isTeacher ? "/instructor" : "/admin")}
          />}

        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex gap-4 items-center">
          <div
            onClick={() => navigate("/student-courses")}
            className="flex cursor-pointer items-center gap-3"
          >
            <span className="font-extrabold md:text-xl text-[14px]">
              {t("course:my_courses")}
            </span>
            <TvMinimalPlay className="w-8 h-8 cursor-pointer" />
          </div>
          <ReusableButton
            onClick={handleLoginOrLogout}
            {...{ btnText, isLoading }}
          />
        </div>
      </div>
    </header >
  );
}

export default StudentViewCommonHeader;
