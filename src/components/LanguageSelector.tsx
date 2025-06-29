import { ReusableSelect } from "./Reusable-Components";
import { useTypedTranslation } from "@/hooks";

function LanguageSelector() {
  const { i18n } = useTypedTranslation();
  console.log("i18n.language",i18n.language)
  return (
    <ReusableSelect
      triggerStyle="w-fit"
      placeholder="English"
      defaultValue={i18n.language ?? "en"}
      onValueChange={(value) => i18n.changeLanguage(value)}
      selectValues={[
        { title: "English", value: "en" },
        { title: "Arabic", value: "ar" },
      ]}
    />
  );
}
export default LanguageSelector;
