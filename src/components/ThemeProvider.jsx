import React, { useContext } from "react"
import { Helmet } from "react-helmet"

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
    const isDarkThemeActive =
      window.localStorage.getItem("isDarkThemeActive") === "true"
    this.setState({ isDarkThemeActive }, () => {
      document.documentElement.setAttribute(
        "data-theme",
        isDarkThemeActive ? "dark" : "light"
      )
    })
  }

  toggleActiveTheme = () => {
    this.setState(
      prevState => ({
        isDarkThemeActive: !prevState.isDarkThemeActive,
      }),
      () => {
        window.localStorage.setItem(
          "isDarkThemeActive",
          this.state.isDarkThemeActive ? "true" : "false"
        )
        document.documentElement.setAttribute(
          "data-theme",
          this.state.isDarkThemeActive ? "dark" : "light"
        )
      }
    )
  }

  render() {
    const { isDarkThemeActive } = this.state

    return (
      <ThemeContext.Provider
        value={{ isDarkThemeActive, toggleActiveTheme: this.toggleActiveTheme }}
      >
        <Helmet>
          {isDarkThemeActive ? (
            <meta name="theme-color" content="#2a2b2d" />
          ) : (
            <meta name="theme-color" content="#ffffff" />
          )}
        </Helmet>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}

export const useThemeContext = () => {
  const { toggleActiveTheme, isDarkThemeActive } = useContext(ThemeContext)
  return [toggleActiveTheme, isDarkThemeActive]
}
