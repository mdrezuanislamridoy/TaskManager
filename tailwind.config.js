/** @type {import('tailwindcss').Config} */



export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                'mod-color': {
                    50: '#f6faf1',
                    100: '#e9f5e1',
                    200: '#d3eac4',
                    300: '#b2d89c',
                    400: '#8ac06e',
                    500: '#68a446',
                    600: '#4f8434',
                    700: '#3f682b',
                    800: '#355326',
                    900: '#2d4522',
                    950: '#13230e',
                }
            }
        },
        fontFamily: {
            'sans': ['Roboto', 'sans-serif'],
            'newspaper': ['Times New Roman', 'serif'],
        }
    },
    plugins: [],
};
