import React, { useContext } from "react"

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
    document.documentElement.setAttribute(
      "data-theme",
      isDarkThemeActive ? "dark" : "light"
    )
  }

  toggleActiveTheme = () => {
    window.localStorage.setItem(
      "isDarkThemeActive",
      JSON.stringify(!this.state.isDarkThemeActive)
    )
    document.documentElement.setAttribute(
      "data-theme",
      !this.state.isDarkThemeActive ? "dark" : "light"
    )
    this.setState(prevState => ({
      isDarkThemeActive: !prevState.isDarkThemeActive,
    }))
  }

  render() {
    const { isDarkThemeActive } = this.state

    return (
      <ThemeContext.Provider
        value={{ isDarkThemeActive, toggleActiveTheme: this.toggleActiveTheme }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}

export const useThemeContext = () => {
  const { toggleActiveTheme, isDarkThemeActive } = useContext(ThemeContext)
  return [toggleActiveTheme, isDarkThemeActive]
}
