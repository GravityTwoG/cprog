import React from "react"
import styled from "@emotion/styled"
import Highlight, { Prism } from "prism-react-renderer"
import prismTheme from "prism-react-renderer/themes/nightOwl"

const StyledPre = styled.pre`
  position: relative;
`

export const CodeBlock = ({ children: exampleCode, ...props }) => {
  const language = props.className ? props.className.replace(/language-/, '') : ""

  return (
    <Highlight
      Prism={Prism}
      code={exampleCode}
      language={language}
      theme={prismTheme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <StyledPre className={className + " pre"} style={style} p={3}>
          <CopyButton string={exampleCode} />

          {cleanTokens(tokens).map((line, i) => {
            let lineClass = {}
            let isDiff = false

            if (
              line[0] &&
              line[0].content.length &&
              line[0].content[0] === "+"
            ) {
              lineClass = { backgroundColor: "rgba(76, 175, 80, 0.2)" }
              isDiff = true
            } else if (
              line[0] &&
              line[0].content.length &&
              line[0].content[0] === "-"
            ) {
              lineClass = { backgroundColor: "rgba(244, 67, 54, 0.2)" }
              isDiff = true
            } else if (
              line[0] &&
              line[0].content === "" &&
              line[1] &&
              line[1].content === "+"
            ) {
              lineClass = { backgroundColor: "rgba(76, 175, 80, 0.2)" }
              isDiff = true
            } else if (
              line[0] &&
              line[0].content === "" &&
              line[1] &&
              line[1].content === "-"
            ) {
              lineClass = { backgroundColor: "rgba(244, 67, 54, 0.2)" }
              isDiff = true
            }
            const lineProps = getLineProps({ line, key: i })

            lineProps.style = lineClass
            const diffStyle = {
              userSelect: "none",
              MozUserSelect: "-moz-none",
              WebkitUserSelect: "none",
            }

            let splitToken

            return (
              <div {...lineProps} key={line + i}>
                {line.map((token, key) => {
                  if (isDiff) {
                    if (
                      (key === 0 || key === 1) &
                      (token.content.charAt(0) === "+" ||
                        token.content.charAt(0) === "-")
                    ) {
                      if (token.content.length > 1) {
                        splitToken = {
                          types: ["template-string", "string"],
                          content: token.content.slice(1),
                        }
                        const firstChar = {
                          types: ["operator"],
                          content: token.content.charAt(0),
                        }

                        return (
                          <React.Fragment key={token + key}>
                            <span
                              {...getTokenProps({ token: firstChar, key })}
                              style={diffStyle}
                            />
                            <span
                              {...getTokenProps({ token: splitToken, key })}
                            />
                          </React.Fragment>
                        )
                      } else {
                        return (
                          <span
                            {...getTokenProps({ token, key })}
                            style={diffStyle}
                          />
                        )
                      }
                    }
                  }
                  return <span {...getTokenProps({ token, key })} />
                })}
              </div>
            )
          })}
        </StyledPre>
      )}
    </Highlight>
  )
}

/** Removes the last token from a code example if it's empty. */
function cleanTokens(tokens) {
  const tokensLength = tokens.length

  if (tokensLength === 0) {
    return tokens
  }
  const lastToken = tokens[tokensLength - 1]

  if (lastToken.length === 1 && lastToken[0].empty) {
    return tokens.slice(0, tokensLength - 1)
  }
  return tokens
}

const StyledCopyButton = styled.button`
  margin: 8px;
  padding: 8px 12px;
  background-color: #054e7e;
  border-radius: 5px;
  
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  
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
        setTimeout(() => setIsCopied(false), 3000)
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