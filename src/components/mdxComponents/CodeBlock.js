import React from "react"
import { styled } from "@linaria/react"
import "prismjs/themes/prism-tomorrow.css"
import "./code-block.scss"

const StyledDiv = styled.div`
  overflow: hidden;
  border-radius: 5px;

  @media (max-width: 767px) {
    font-size: 14px;
  }

  & > pre {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    padding: 16px;
    background-color: #011627 !important;

    scrollbar-width: auto;
    scrollbar-color: var(--accentColor) transparent;

    &::-webkit-scrollbar {
      height: 12px;
      cursor: pointer;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--accentColor);
      border-radius: 6px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: var(--accentHoverColor);
    }
  }
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  background-color: var(--accentColor);
  height: 26px;

  & > span {
    font-family: monospace;
    font-size: 16px;
    line-height: 16px;
    color: #fff;
  }
`

export const CodeBlock = ({ children, ...props }) => {
  const language = props.className
    ? props.className.replace(/language-/, "").toUpperCase()
    : ""
  return (
    <StyledDiv {...props}>
      <StyledHeader>
        <span>{language}</span>
        {/* <CopyButton string={children} /> */}
      </StyledHeader>

      <pre>{children}</pre>
    </StyledDiv>
  )
}

// const StyledCopyButton = styled.button`
//   padding: 8px 12px;
//   background-color: #511190;
//   border-radius: 5px 5px 0 5px;

//   border: none;
//   box-shadow: none;
//   text-decoration: none;
//   cursor: pointer;

//   font-size: 14px;
//   font-family: inherit;
//   line-height: 1;
//   color: #e2e8f0;
// `

// const copyButtonText = {
//   copied: "Скопировано",
//   copy: "Копировать",
// }

// const CopyButton = ({ string }) => {
//   const [isCopied, setIsCopied] = React.useState(false)

//   return (
//     <StyledCopyButton
//       onClick={() => {
//         copyToClipboard(string)
//         setIsCopied(true)
//         setTimeout(() => setIsCopied(false), 1500)
//       }}
//     >
//       {isCopied ? copyButtonText.copied : copyButtonText.copy}
//     </StyledCopyButton>
//   )
// }

// function copyToClipboard(str) {
//   const el = document.createElement("textarea")
//   el.value = str
//   el.setAttribute("readonly", "")
//   el.style.position = "absolute"
//   el.style.left = "-9999px"
//   document.body.appendChild(el)
//   el.select()
//   document.execCommand("copy")
//   document.body.removeChild(el)
// }
