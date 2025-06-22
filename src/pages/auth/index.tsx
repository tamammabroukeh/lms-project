import AuthForm from "@/components/forms/AuthForm";
import {
  Flex,
  ReusableTabs,
  ReusableCard,
} from "@/components/Reusable-Components";
import AuthData from "@/data/auth";
import { useLocalStorage, useTypedTranslation } from "@/hooks";
import { LogInIcon, UserPlus } from "lucide-react";
import { useMemo } from "react";

function AuthPage() {
  const [activeTab, setActiveTab] = useLocalStorage<string>(
    "auth-tab",
    localStorage.getItem("auth-tab") ?? "Sign In"
  );
  const { t } = useTypedTranslation();

  function handleTabChange(value: string) {
    setActiveTab(value);
  }
  const signUpFormControls = useMemo(() => AuthData(t).signUpFormControls, [t]);

  return (
    <Flex classes="my-auto bg-background">
      <ReusableTabs
        value={activeTab}
        defaultValue="Sign In"
        onValueChange={handleTabChange}
        tabTriggerValues={[
          { title: t("auth:signin"), value: "Sign In" },
          { title: t("auth:signup"), value: "Sign Up" },
        ]}
        tabContentValues={[
          {
            value: "Sign In",
            children: (
              <ReusableCard
                Icon={LogInIcon}
                title={t("auth:loginTitle")}
                description={t("auth:loginDescription")}
              >
                <AuthForm
                  link={{
                    path: "/auth/forgot-password",
                    title: t("auth:forgot_password"),
                  }}
                  forgetPassword={true}
                  {...{ activeTab }}
                  dataInputs={signUpFormControls.slice(1)}
                />
              </ReusableCard>
            ),
          },
          {
            value: "Sign Up",
            children: (
              <ReusableCard
                Icon={UserPlus}
                title={t("auth:registerTitle")}
                description={t("auth:registerDescription")}
              >
                <AuthForm {...{ activeTab }} dataInputs={signUpFormControls} />
              </ReusableCard>
            ),
          },
        ]}
      />
    </Flex>
  );
}

export default AuthPage;
