import React from "react"
import { styled } from "@linaria/react"
import { ReactComponent as LogoSVG } from "../../images/clogo.svg"

const StyledLogo = styled(LogoSVG)`
  max-width: 100%;
  max-height: 100%;
  height: 46px;

  & > path:nth-of-type(2) {
    //animation: op 3s ease-in-out 0.2s infinite;
  }
  & > path:nth-of-type(3) {
    //animation: op 3s ease-in-out 0.4s infinite;
  }

  @keyframes op {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`

export const Logo = () => {
  return <StyledLogo />
}
