import React from "react"
import styled from "@emotion/styled"
import "prismjs/themes/prism-tomorrow.css"

const StyledDiv = styled.div`
  overflow: hidden;
  border-radius: 5px;
  
  & > pre {
    overflow: auto;
    padding: 16px;
    background-color: #011627!important;
  }
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  background-color: var(--accentColor);
  height: 30px;
  
  & > span {
    font-size: 20px;
    color: #fff;
  }
`

export const CodeBlock = ({children, ...props}) => {
  const language = props.className ? props.className.replace(/language-/, '') : ""

  return (
    <StyledDiv {...props}>
      {/*<StyledHeader>*/}
      {/*  <span>{language}</span>*/}
      {/*  <CopyButton string={props.children} />*/}
      {/*</StyledHeader>*/}
      <pre>{children}</pre>
    </StyledDiv>
  )
}

const StyledCopyButton = styled.button`
  padding: 8px 12px;
  background-color: #511190;
  border-radius: 5px 5px 0px 5px;
  
  border: none;
  box-shadow: none;
  text-decoration: none;
  cursor: pointer;
  
  font-size: 14px;
  font-family: inherit;
  line-height: 1;
  color: #E2E8F0;
`

const copyButtonText = {
  copied: 'Скопировано',
  copy: 'Копировать'
}

const CopyButton = ({ string }) => {
  const [isCopied, setIsCopied] = React.useState(false)

  return (
    <StyledCopyButton
      onClick={() => {
        copyToClipboard(string)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 1500)
      }}
    >
      {isCopied ? copyButtonText.copied : copyButtonText.copy}
    </StyledCopyButton>
  )
}

function copyToClipboard(str) {
  const el = document.createElement("textarea")
  el.value = str
  el.setAttribute("readonly", "")
  el.style.position = "absolute"
  el.style.left = "-9999px"
  document.body.appendChild(el)
  el.select()
  document.execCommand("copy")
  document.body.removeChild(el)
}