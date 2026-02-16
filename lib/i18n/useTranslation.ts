import translations from "./en.json";

type TranslationKey = string;

export function useT() {
    return (key: TranslationKey): string => {
        const parts = key.split(".");
        let result: unknown = translations;
        for (const part of parts) {
            if (result && typeof result === "object" && part in result) {
                result = (result as Record<string, unknown>)[part];
            } else {
                return key;
            }
        }
        return typeof result === "string" ? result : key;
    };
}
