import React, { useEffect } from "react"

const TeX = React.lazy(() => import("@matejmazur/react-katex"))

const SSRWrapper = props => {
  const isSSR = typeof window === "undefined"

  if (isSSR) {
    return props.fallback
  }

  return props.children
}

const MathBlock = props => {
  useEffect(() => {
    import("katex/dist/katex.min.css").catch(e => console.log(e))
  }, [])

  return (
    <React.Suspense fallback={<div {...props} />}>
      <TeX block math={props.children} />
    </React.Suspense>
  )
}

const MathInline = props => {
  useEffect(() => {
    import("katex/dist/katex.min.css").catch(e => console.log(e))
  }, [])

  return (
    <React.Suspense fallback={<span {...props} />}>
      <TeX math={props.children} />
    </React.Suspense>
  )
}

export const components = {
  div: props => {
    if (props.className?.includes("math-display")) {
      return (
        <SSRWrapper fallback={<div {...props} />}>
          <MathBlock {...props} />
        </SSRWrapper>
      )
    }
    return <div {...props} />
  },
  span: props => {
    if (props.className?.includes("math-inline")) {
      return (
        <SSRWrapper fallback={<span {...props} />}>
          <MathInline {...props} />
        </SSRWrapper>
      )
    }
    return <span {...props} />
  },
}
