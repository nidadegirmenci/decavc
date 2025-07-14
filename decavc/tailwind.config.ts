import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        "soft-purple": "#E6E6FA",
        "soft-pink": "#FFB6C1",
        "soft-blue": "#ADD8E6",
        "soft-coral": "#FFA07A",
        "soft-mint": "#98FB98",
        purple: {
          50: "#F3F0FF",
          100: "#E6E6FA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
        },
        pink: {
          50: "#FDF2F8",
          100: "#FFB6C1",
          500: "#EC4899",
          600: "#DB2777",
        },
        blue: {
          50: "#EFF6FF",
          100: "#ADD8E6",
          500: "#3B82F6",
          600: "#2563EB",
        },
        coral: {
          50: "#FFF7ED",
          100: "#FFA07A",
          500: "#F97316",
          600: "#EA580C",
        },
        mint: {
          50: "#F0FDF4",
          100: "#98FB98",
          500: "#22C55E",
          600: "#16A34A",
        },
        cream: {
          50: "#FEFDFB",
          100: "#FDF9F3",
          200: "#FAF4E8",
          300: "#F7EFDD",
          400: "#F1E5C7",
          500: "#EBD9B1",
          600: "#D4C39F",
          700: "#8E826A",
          800: "#6B6250",
          900: "#474135",
        },
        "off-white": "#FEFEFE",
        "warm-gray": {
          50: "#FAFAF9",
          100: "#F5F5F4",
          200: "#E7E5E4",
          300: "#D6D3D1",
          400: "#A8A29E",
          500: "#78716C",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "scroll-down": {
          "0%": {
            transform: "translateY(-50%)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
        "scroll-up": {
          "0%": {
            transform: "translateY(0%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        "scroll-down-slow": {
          "0%": {
            transform: "translateY(-50%)",
          },
          "100%": {
            transform: "translateY(0%)",
          },
        },
        "scroll-up-slow": {
          "0%": {
            transform: "translateY(0%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        "scroll-right": {
          "0%": {
            transform: "translateX(-50%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
        "scroll-left": {
          "0%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scroll-down": "scroll-down 20s linear infinite",
        "scroll-up": "scroll-up 20s linear infinite",
        "scroll-down-slow": "scroll-down-slow 100s linear infinite",
        "scroll-up-slow": "scroll-up-slow 100s linear infinite",
        "scroll-right": "scroll-right 60s linear infinite",
        "scroll-left": "scroll-left 60s linear infinite",
        pause: "paused",
      },
      backgroundImage: {
        "gradient-soft": "linear-gradient(135deg, #E6E6FA 0%, #FFB6C1 25%, #ADD8E6 50%, #FFA07A 75%, #98FB98 100%)",
        "gradient-purple-pink": "linear-gradient(135deg, #E6E6FA 0%, #FFB6C1 100%)",
        "gradient-blue-mint": "linear-gradient(135deg, #ADD8E6 0%, #98FB98 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
