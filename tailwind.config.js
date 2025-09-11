/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    plugins: ["tailwindcss-animate"],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                background: {
                    DEFAULT: "hsl(var(--background))",
                    
                    /** Card and other surface colors except background(root) */
                    surface: "hsl(var(--surface))",

                    /* Controls (Sliders, Toggles, Inputs, Checkboxes, Radios) */
                    "control": "var(--control-bg)",
                    "control-active": "var(--control-active)",
                    "control-muted": "var(--control-muted)",

                    /* Select */
                    select: "var(--select-bg)",
                },
                foreground: {
                    DEFAULT: "hsl(var(--foreground))",
                    danger: "#ef4444",
                    success: "#10b981",
                    surface: "var(--on-surface)",

                    /* Controls (Sliders, Toggles, Inputs, Checkboxes, Radios) */
                    "control": "var(--control-fg)",
                    
                    /* Select */
                    select: "var(--select-fg)",

                    /* Link */
                    link: "var(--link)",
                },
                border: {
                    normal: "var(--border-normal)",
                    hard: "var(--border-hard)",
                },
                ring: "var(--ring-r)",
            },
            boxShadow: {
                "box-shadow": "var(--box-shadow)",
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
                "icon-btn-width": "var(--icon-btn-width)",
            },
            height: {
                "btn-height-sm": "var(--btn-height-sm)",
                "btn-height-md": "var(--btn-height-md)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
