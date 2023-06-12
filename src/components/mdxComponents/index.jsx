import React from "react"
import { styled } from "@linaria/react"
import { copyToClipboard } from "./copyToClipboard"

import { Pre } from "./Pre"
import { AnchorTag } from "./Anchor"
import { Icon } from "./Icons"
import { Table, TableWrapper } from "./Table"
import { BlockQuote } from "./BlockQuote"
import { MathBlock, MathInline } from "./Math"
import { SSRWrapper } from "./SSRWrapper"

const StyledFlex = styled.div`
  display: flex;

  &.ais {
    align-items: stretch;
  }
  &.fxww {
    flex-wrap: wrap;
  }

  &.fc2 > * {
    width: 50%;
  }
  &.flex-childs > * {
    flex: 1 0 auto;
  }
`

const StyledHeading = styled.h1`
  & > button {
    margin-left: 0.2em;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: inherit;
    font-weight: 700;
    transition: color 0.15s ease-in;
    color: var(--decoColor);

    &:hover {
      color: var(--accentColor);
    }
    &:active {
      color: var(--decoColor);
    }
  }
`

const Heading = ({ children, as = "h1", ...props }) => {
  const id = generateHeadingId(children)
  let url = ""

  if (typeof window !== "undefined") {
    url = window.location.origin + window.location.pathname + "#" + id
  }

  return (
    <StyledHeading as={as} {...props} id={id}>
      {children}{" "}
      {url && (
        <button
          aria-label="Скопировать ссылку"
          title="Скопировать ссылку"
          onClick={() => copyToClipboard(url)}
        >
          #
        </button>
      )}
    </StyledHeading>
  )
}

export function generateHeadingId(title) {
  return title // eslint-disable-next-line no-useless-escape
    .replace(/[/,.\()\?–]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase()
}

export const mdxComponents = {
  p: props => <p {...props} className="paragraph" />,
  h1: ({ children, ...props }) => (
    <Heading {...props} as="h1" className="heading1">
      {children}
    </Heading>
  ),
  h2: ({ children, ...props }) => (
    <Heading {...props} as="h2" className="heading2">
      {children}
    </Heading>
  ),
  h3: ({ children, ...props }) => (
    <Heading {...props} as="h3" className="heading3">
      {children}
    </Heading>
  ),
  h4: ({ children, ...props }) => (
    <Heading {...props} as="h4" className="heading4">
      {children}
    </Heading>
  ),
  h5: ({ children, ...props }) => (
    <Heading {...props} as="h5" className="heading5">
      {children}
    </Heading>
  ),
  h6: ({ children, ...props }) => (
    <Heading {...props} as="h6" className="heading6">
      {children}
    </Heading>
  ),
  blockquote: BlockQuote,
  table: Table,
  a: AnchorTag,
  div: props => {
    if (props.className?.includes("math-display")) {
      return (
        <SSRWrapper fallback={<math {...props} />}>
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
  // shortcodes
  Icon,
  Flex: StyledFlex,
  Pre: Pre,
  TableWrapper,
}
