import React, { useContext, useEffect, useState } from "react"
import { Helmet } from "react-helmet"

const ThemeContext = React.createContext({
  isDarkThemeActive: false,
  toggleActiveTheme: () => {},
})

export const ThemeProvider = props => {
  const [isDarkThemeActive, setActiveTheme] = useState(false)

  useEffect(() => {
    const isDarkThemeActive =
      window.localStorage.getItem("isDarkThemeActive") === "true"
    setActiveTheme(isDarkThemeActive)
    document.documentElement.setAttribute(
      "data-theme",
      isDarkThemeActive ? "dark" : "light"
    )
  }, [])

  const toggleActiveTheme = () => {
    const isDark = !isDarkThemeActive
    setActiveTheme(isDark)
    window.localStorage.setItem("isDarkThemeActive", isDark ? "true" : "false")
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    )
  }

  return (
    <ThemeContext.Provider value={{ isDarkThemeActive, toggleActiveTheme }}>
      <Helmet>
        <meta
          name="theme-color"
          content={isDarkThemeActive ? "#2a2b2d" : "#fff"}
        />
      </Helmet>
      {props.children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const { toggleActiveTheme, isDarkThemeActive } = useContext(ThemeContext)
  return [toggleActiveTheme, isDarkThemeActive]
}
