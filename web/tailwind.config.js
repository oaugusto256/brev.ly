/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Blue
        blue: {
          base: "#2C46B1",
          dark: "#2C4091",
        },
        // Grayscale
        gray: {
          100: "#F9F9FB",
          200: "#E4E6EC",
          300: "#CDCFD5",
          400: "#74798B",
          500: "#4D505C",
          600: "#1F2025",
        },
        // Feedback
        danger: "#B12C4D",
      },
      fontFamily: {
        sans: ['"Open Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ["0.625rem", { lineHeight: "0.875rem" }], // 10px / 14px
        sm: ["0.75rem", { lineHeight: "1rem" }],      // 12px / 16px
        md: ["0.875rem", { lineHeight: "1.125rem" }], // 14px / 18px
        lg: ["1.125rem", { lineHeight: "1.5rem" }],   // 18px / 24px
        xl: ["1.5rem", { lineHeight: "2rem" }],       // 24px / 32px
      },
      fontWeight: {
        regular: "400",
        semibold: "600",
        bold: "700",
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "10px",
      },
    },
  },
  plugins: [],
}
