import React, { useEffect } from "react"

const TeX = React.lazy(() => import("@matejmazur/react-katex"))

export const MathBlock = props => {
  useEffect(() => {
    import("katex/dist/katex.min.css").catch(e => console.log(e))
  }, [])

  return (
    <React.Suspense fallback={<math {...props} />}>
      <TeX block math={props.children} />
    </React.Suspense>
  )
}

export const MathInline = props => {
  useEffect(() => {
    import("katex/dist/katex.min.css").catch(e => console.log(e))
  }, [])

  return (
    <React.Suspense fallback={<span {...props} />}>
      <TeX math={props.children} />
    </React.Suspense>
  )
}
