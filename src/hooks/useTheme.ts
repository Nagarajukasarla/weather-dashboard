import { useEffect, useState } from "react";
import { logEvent } from "@/utils/logEvent";

const useTheme = () => {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme) return savedTheme === "dark";
            return true;
        }
        return true;
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            root.classList.remove("light");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.add("light");
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    const toggleMode = () => {
        setIsDark(prev => !prev);
        logEvent("theme-toggle", { isDark: !isDark });
    };

    return { isDark, toggleMode };
};

export default useTheme;
