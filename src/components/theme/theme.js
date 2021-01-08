const baseTheme = {
  accentColor: "#3884ff"
}

const light = {
  ...baseTheme,
  isDark: false,
  backgroundColor: "#fff",
  headingColor: "#000",
  textColor: "#3B454E",
  preFormattedTextColor: "rgb(245, 247, 249)",
  linkColor: "#3884ff",
  decoColor: "rgb(230,236,241)",
  boxShadow: "rgba(116, 129, 141, 0.1) 0px 3px 8px 0px",
}

const dark = {
  ...baseTheme,
  isDark: true,
  backgroundColor: "#2a2b2d",
  headingColor: "#fff",
  textColor: "#fafafa",
  preFormattedTextColor: "#201f23",
  linkColor: "#3884ff",
  decoColor: "#777",
  boxShadow: "rgba(0, 0, 0, 0.3) 0px 4px 12px 0px",
}

const makeCssTheme = (jsTheme) =>
  Object.entries(jsTheme).reduce(
    (cssTheme, [key, value]) => ({
      ...cssTheme,
      [`--${key}`]: value
    }),
    {}
  );

const lightTheme = makeCssTheme(light)
const darkTheme = makeCssTheme(dark)

export { lightTheme, darkTheme }
