import { styled } from "@linaria/react"

export const ContentPadding = styled.div`
  padding: 0 60px;

  @media (max-width: 520px) {
    padding: 0 16px;
  }

  &.main {
    max-width: 100%;
    color: var(--textColor);
    overflow: hidden;

    & a {
      transition: color 0.15s;
      color: var(--linkColor);
    }
  }
`
