export const SSRWrapper = props => {
  const isSSR = typeof window === "undefined"

  if (isSSR) {
    return props.fallback
  }

  return props.children
}
