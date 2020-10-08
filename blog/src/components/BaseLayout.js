import React, { useState } from "react"
import { Hero } from "./Hero"
import { Footer } from "./Footer"

export const BaseLayout = ({ children, slim }) => {
  const [isDarkTheme, setTheme] = useState(false)
  const toggleTheme = () => setTheme(isDarkTheme => !isDarkTheme)

  return (
    <div
      className={`app bg-base ${isDarkTheme ? " dark-mode" : ""} text-base-700`}
    >
      <Hero slim={slim} setTheme={toggleTheme} />
      <div style={{ minHeight: "75vh" }}>{children}</div>
      <Footer />
    </div>
  )
}
