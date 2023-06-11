import React from "react"
import { styled } from "@linaria/react"

// const CodeSkeleton = styled.div`
//   width: 100%;
//   height: 170px;
//   background: #011627;
//   border-radius: 5px;
// `

// const LazyCodeBlock = React.lazy(() =>
//   import("./CodeBlock").then(module => ({ default: module.CodeBlock }))
// )

const StyledPre = styled.pre`
  padding: 16px;
  background: var(--preFormattedTextColor);
  border-radius: 5px;
  overflow: auto;
  max-width: 100%;

  &.wrap {
    white-space: normal;
  }

  & p.paragraph {
    margin: 0;
  }
`

export const Pre = props => {
  // console.log("pre", props)
  // if (props.children?.props?.mdxType === "code") {
  //   return <CodeBlock {...props} />
  //   // TODO: Make it lazy
  //   return (
  //     <React.Suspense fallback={<CodeSkeleton />}>
  //       <LazyCodeBlock {...props} />
  //     </React.Suspense>
  //   )
  // }

  return (
    <StyledPre
      {...props}
      className={`${props.className || "" + props.wrap ? " wrap" : ""}`}
    />
  )
}
