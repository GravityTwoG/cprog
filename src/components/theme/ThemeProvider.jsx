import React, { useContext } from "react"
import { Global } from "@emotion/react"

import "../../fonts/fonts.css"
import { baseStyles } from "./GlobalStyles"
import { mediaStyles } from "./MediaStyles"

const ThemeContext = React.createContext({
  isDarkThemeActive: false,
  toggleActiveTheme: () => {},
})

export class ThemeProvider extends React.Component {
  state = {
    isDarkThemeActive: false,
  }

  componentDidMount() {
    this.retrieveActiveTheme()
  }

  retrieveActiveTheme = () => {
    const isDarkThemeActive = JSON.parse(
      window.localStorage.getItem("isDarkThemeActive")
    )
    this.setState({ isDarkThemeActive })
    document.documentElement.setAttribute('data-theme', isDarkThemeActive ? 'dark' : 'light');
  }

  toggleActiveTheme = () => {
    this.setState(prevState => {

      window.localStorage.setItem(
        "isDarkThemeActive",
        JSON.stringify(!prevState.isDarkThemeActive)
      )
      document.documentElement.setAttribute('data-theme', !prevState.isDarkThemeActive ? 'dark' : 'light');

      return {
        isDarkThemeActive: !prevState.isDarkThemeActive
      }
    })


  }

  render() {
    const { children } = this.props

    const { isDarkThemeActive } = this.state

    return (
      <ThemeContext.Provider
        value={{ isDarkThemeActive, toggleActiveTheme: this.toggleActiveTheme }}
      >
          <Global styles={mediaStyles} />
          <Global styles={baseStyles} />
          {children}
      </ThemeContext.Provider>
    )
  }
}

export const useThemeContext = () => {
  const { toggleActiveTheme, isDarkThemeActive } = useContext(ThemeContext)

  return [toggleActiveTheme, isDarkThemeActive]
}
