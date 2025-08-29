import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#228fb3",
          600: "#309bbb",
          900: "#001221"
        },
        background: "#001424",
        codeBackground: "#0F0E0E",
        accent: "#309bbb",
        panel: "#0a1e2d",
        ink: "#e6f7ff"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.25)"
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      typography: (theme: any) => ({
  invert: {
    css: {
      // base text
      color: theme("colors.ink"),

      // headings
      h1: { color: theme("colors.accent") },
      h2: { color: theme("colors.accent") },
      h3: { color: theme("colors.accent") },

      // links
      a: { color: theme("colors.primary.DEFAULT"), fontWeight: "500" },

      // inline code (ONLY inside text, not in <pre>)
      "code:not(pre code)": {
        //color: theme("colors.ink"),
        //backgroundColor: theme("colors.panel"),
        padding: "2px 6px",
        borderRadius: "0.25rem",
      },

      // blockquotes
      blockquote: {
        borderLeftColor: theme("colors.primary.600"),
        color: theme("colors.ink"),
      },
    },
  },
}),
    },
  },
  plugins: [typography],
}
export default config
