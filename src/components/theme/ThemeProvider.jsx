import React, { useContext } from "react"
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming"
import { Global } from "@emotion/core"

import { lightTheme, darkTheme } from "./theme"
import "../../fonts/fonts.css"
import { baseStyles } from "../styles/GlobalStyles"
import { mediaStyles } from "../styles/MediaStyles"

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
  }

  toggleActiveTheme = () => {
    this.setState(prevState => ({
      isDarkThemeActive: !prevState.isDarkThemeActive,
    }))

    window.localStorage.setItem(
      "isDarkThemeActive",
      JSON.stringify(!this.state.isDarkThemeActive)
    )
  }

  render() {
    const { children } = this.props

    const { isDarkThemeActive } = this.state

    const currentActiveTheme = isDarkThemeActive ? darkTheme : lightTheme

    return (
      <ThemeContext.Provider
        value={{ isDarkThemeActive, toggleActiveTheme: this.toggleActiveTheme }}
      >
        <EmotionThemeProvider theme={currentActiveTheme}>
          <Global styles={mediaStyles} />
          <Global styles={baseStyles} />
          {children}
        </EmotionThemeProvider>
      </ThemeContext.Provider>
    )
  }
}

export const useThemeContext = () => {
  const { toggleActiveTheme, isDarkThemeActive } = useContext(ThemeContext)

  return [toggleActiveTheme, isDarkThemeActive]
}
