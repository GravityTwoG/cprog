import React, { useEffect } from "react"

const TeX = React.lazy(() => import("@matejmazur/react-katex"))

const MathBlock = props => {
  const isSSR = typeof window === "undefined"
  useEffect(() => {
    if (!isSSR) {
      import("katex/dist/katex.min.css").catch(e => console.log(e))
    }
  }, [])

  if (isSSR) {
    return <div {...props} />
  }

  return (
    <React.Suspense fallback={<div {...props} />}>
      <TeX block math={props.children} />
    </React.Suspense>
  )
}

const MathInline = props => {
  const isSSR = typeof window === "undefined"
  useEffect(() => {
    if (!isSSR) {
      import("katex/dist/katex.min.css").catch(e => console.log(e))
    }
  }, [])

  if (isSSR) {
    return <span {...props} />
  }

  return (
    <React.Suspense fallback={<span {...props} />}>
      <TeX math={props.children} />
    </React.Suspense>
  )
}

export const components = {
  div: props => {
    if (props.className.includes("math-display")) {
      return <MathBlock {...props} />
    }
    return <div {...props} />
  },
  span: props => {
    if (props.className.includes("math-inline")) {
      return <MathInline {...props} />
    }
    return <span {...props} />
  },
}
