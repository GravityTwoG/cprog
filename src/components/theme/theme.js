const baseTheme = {
  fonts: {
    mono: '"SF Mono", "Roboto Mono", Menlo, monospace',
  },
  colors: { accent: "#3884ff" },
}

const lightTheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    background: "#fff",
    heading: "#000",
    text: "#3B454E",
    preFormattedText: "rgb(245, 247, 249)",
    link: "#3884ff",
  },
}

const darkTheme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    background: "#001933",
    heading: "#fff",
    text: "#fff",
    preFormattedText: "#000",
    link: "#3884ff",
  },
}

export { lightTheme, darkTheme }
