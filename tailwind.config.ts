import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f7f7f7',
                    100: '#e3e3e3',
                    200: '#c8c8c8',
                    300: '#a4a4a4',
                    400: '#818181',
                    500: '#808080',
                    600: '#6a6a6a',
                    700: '#525252',
                    800: '#3a3a3a',
                    900: '#242424',
                    950: '#121212',
                },
                secondary: {
                    50: '#fef2f3',
                    100: '#fde6e7',
                    200: '#fbd0d5',
                    300: '#f7aab2',
                    400: '#f27a88',
                    500: '#e84b5f',
                    600: '#DC143C',
                    700: '#b71034',
                    800: '#980e2d',
                    900: '#7f0f2a',
                    950: '#460513',
                },
                accent: {
                    orange: {
                        light: '#f7aab2',
                        DEFAULT: '#e84b5f',
                        dark: '#DC143C',
                    },
                    pink: {
                        light: '#fbd0d5',
                        DEFAULT: '#f27a88',
                        dark: '#e84b5f',
                    },
                    purple: {
                        light: '#c8c8c8',
                        DEFAULT: '#a4a4a4',
                        dark: '#818181',
                    },
                },
                background: {
                    dark: '#242424',
                    darker: '#121212',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-primary': 'linear-gradient(135deg, #808080 0%, #6a6a6a 50%, #525252 100%)',
                'gradient-secondary': 'linear-gradient(135deg, #DC143C 0%, #b71034 50%, #980e2d 100%)',
                'gradient-success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                'gradient-warm': 'linear-gradient(135deg, #DC143C 0%, #e84b5f 50%, #f7aab2 100%)',
                'gradient-cool': 'linear-gradient(135deg, #6a6a6a 0%, #525252 50%, #3a3a3a 100%)',
                'gradient-sunset': 'linear-gradient(135deg, #DC143C 0%, #980e2d 30%, #808080 70%, #6a6a6a 100%)',
                'gradient-blend': 'linear-gradient(135deg, #808080 0%, #b71034 50%, #DC143C 100%)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'fade-in-up': 'fadeInUp 0.6s ease-out',
                'slide-in-right': 'slideInRight 0.4s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 3s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.9)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'glow': '0 0 20px rgba(220, 20, 60, 0.5)',
                'glow-lg': '0 0 40px rgba(220, 20, 60, 0.6)',
            },
        },
    },
    plugins: [],
};

export default config;
