/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        secondary: "#4F46E5",
        accent: "#10B981",
        surface: "#18181B",
        background: "#0B0B10",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(124, 58, 237, 0.3)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'elevated': '0 4px 16px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'progress-bar': 'progressBar 2s linear infinite',
      },
      keyframes: {
        progressBar: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}