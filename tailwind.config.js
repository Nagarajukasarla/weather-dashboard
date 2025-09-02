/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
            colors: {
                "header-icon": "#a855f7",
                background: {
                    DEFAULT: "hsl(var(--background))",
                    foreground: "hsl(var(--foreground))",

                    /** Card and other surface colors except background(root) */
                    surface: "hsl(215, 27.91%, 16.86%)",

                    // onSurface: "#d1d5db",

                    tooltipTextValue: "#93c5fd",
                    "toggle-muted": "#555555",
                    "toggle-active": "#A78BFA",
                },
                foreground: {
                    DEFAULT: "hsl(var(--foreground))",
                    surface: "#d1d5db",
                    danger: "#ef4444",
                    success: "#10b981",
                },
                // primary: {
                //     DEFAULT: "hsl(var(--primary))",
                //     foreground: "hsl(var(--primary-foreground))",
                // },
                // secondary: {
                //     DEFAULT: "hsl(var(--secondary))",
                //     foreground: "hsl(var(--secondary-foreground))",
                // },
                border: {
                    normal: "var(--border-normal)",
                    hard: "var(--border-hard)",
                },
                ring: "hsl(var(--ring))",

                /** Tooltip text color  <== This is can secondary categorized into secondary surface */
                "tooltip-text": "hsl(var(--tooltip-text))",
            },
            boxShadow: {
                header: "0 1px 1px rgba(0, 0, 0, 0.15)",
            },
            backdropBlur: {
                sm: "4px",
            },
            spacing: {
                "relative-x": "min(5rem, 8%)",
                "relative-y": "min(1rem, 8%)",
                wrapper: "min(1.5rem, calc(1vw + 0.5rem))",
            },
            fontSize: {
                "heading-h1": "var(--heading-h1)",
                "heading-h2": "var(--heading-h2)",
                "text-t1": "var(--text-t1)",
                "text-t2": "var(--text-t2)",
                "text-t3": "var(--text-t3)",
            },
            width: {
                "btn-width-sm": "var(--btn-width-sm)",
                "btn-width-md": "var(--btn-width-md)",
            },
            height: { 
                "btn-height-sm": "var(--btn-height-sm)" ,
                "btn-height-md": "var(--btn-height-md)" 
            },
        },
    },
    plugins: [],
};
