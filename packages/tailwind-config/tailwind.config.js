module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                "primary": {
                    DEFAULT: "#FF2929",
                    50: "#FFF5F5",
                    100: "#FFEBEB",
                    200: "#FF2929",
                    300: "#EB0000",
                    400: "#9E0000",
                },
                "secondary": {
                    50: "#F8F9FA",
                    100: "#F3F4F6",
                    200: "#EBE5E5",
                    300: "#DBD2D2",
                    400: "#AE9D9D",
                    500: "#7F6C6C",
                    600: "#614D4D",
                    700: "#462F2F",
                    800: "#361C1C",
                    900: "#271111",
                },
                "success": {
                    DEFAULT: "#10B981",
                },
                "warning": {
                    DEFAULT: "#F79009",
                },
                "error": {
                    DEFAULT: "#F04438",
                },
                "info": {
                    DEFAULT: "#06AED4",
                },
            },
        },
    },
};