import type { Config } from "tailwindcss";

const config: Pick<Config, "presets"> = {
  presets: [{
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                "primary": {
                    DEFAULT: "#2970FF",
                    50: "#F5F8FF",
                    100: "EBEFFF",
                    200: "#2970FF",
                    300: "#004EEB",
                    400: "#00359E",
                },
                "secondary": {
                    50: '#F8F9FA',
                    100: '#F3F4F6',
                    200: '#E5E7EB',
                    300: '#D2D6DB',
                    400: '#9DA4AE',
                    500: '#6C737F',
                    600: '#4D5761',
                    700: '#2F3746',
                    800: '#1C2536',
                    900: '#111927',
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
}],
};

export default config;
