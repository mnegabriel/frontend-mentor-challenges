import { createLocalStore } from "../utils/local-storage"

const TODOS_STORE_KEY = "gd-preferences-store" as const

type Preferences = {
    theme: "dark" | "light";
}

export function createPreferencesLocalStorage() {
    const browserPreferenceIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const [preferences, setPreferences] = createLocalStore<Preferences>(TODOS_STORE_KEY, {
        theme: browserPreferenceIsDark ? "dark" : "light"
    })

    function toggleTheme(variant?: Preferences["theme"]) {
        if (!variant) {
            setPreferences("theme", val => val === "light" ? "dark" : "light")
            return
        }
        setPreferences("theme", variant)
    }


    return { preferences, toggleTheme }
}
