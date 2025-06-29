import { useTypedTranslation } from './useTypedTranslation'

export default function useCurrentLangIsEnglish() {
    const { i18n } = useTypedTranslation()
    return i18n.language.includes("en")
}
