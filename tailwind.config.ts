import type { Config } from 'tailwindcss'
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        noir: "#0e0e11",
        gold: "#c9a227",
        cream: "#faf3e0"
      }
    }
  },
  plugins: []
}
export default config