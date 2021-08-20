import React from "react"
import { styled } from "@linaria/react"
import "prismjs/themes/prism-tomorrow.css"
import "./code-block.scss"

const StyledDiv = styled.div`
  overflow: hidden;
  border-radius: 5px;

  & > pre {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    padding: 12px 16px;
    background-color: #011627 !important;
  }

  & code {
    font-size: 18px;
  }

  @media (min-width: 768px) {
    & > pre {
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
  }

  @media (max-width: 1023px) {
    & code {
      font-size: 16px;
    }
  }
  @media (max-width: 575px) {
    & > pre {
      padding: 8px 13px;
    }

    & code {
      font-size: 14px;
    }
  }
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--accentColor);
  padding: 5px 0px 5px 10px;

  & > span {
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    font-weight: 700;
    font-size: 16px;
    line-height: 16px;
    color: #fff;
  }

  @media (max-width: 575px) {
    padding: 4px 0px 2px 6px;

    & > span {
      font-size: 14px;
      line-height: 14px;
    }
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
