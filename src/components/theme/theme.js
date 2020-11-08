const baseTheme = {
  fonts: {
    mono: '"SF Mono", "Roboto Mono", Menlo, monospace',
  },
  colors: { accent: "#3884ff" },
}

const lightTheme = {
  ...baseTheme,
  isDark: false,
  colors: {
    ...baseTheme.colors,
    background: "#fff",
    heading: "#000",
    text: "#3B454E",
    preFormattedText: "rgb(245, 247, 249)",
    link: "#3884ff",
    deco: "rgb(230,236,241)",
  },
  boxShadow: "rgba(116, 129, 141, 0.1) 0px 3px 8px 0px",
}

const darkTheme = {
  ...baseTheme,
  isDark: true,
  colors: {
    ...baseTheme.colors,
    background: "#2a2b2d",
    heading: "#fff",
    text: "#fafafa",
    preFormattedText: "#201f23",
    link: "#3884ff",
    deco: "#777",
  },
  boxShadow: "rgba(0, 0, 0, 0.3) 0px 4px 12px 0px",
}

export { lightTheme, darkTheme }
