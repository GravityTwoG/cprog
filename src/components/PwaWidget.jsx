import React from 'react'
import styled from "@emotion/styled";
import {usePwaContext} from "./PwaProvider";

import {StyledText} from "./StyledText";

const StyledDiv = styled.div`
  padding: 16px 16px 16px 32px;
  
  @media all and (display-mode: standalone) {
    .pwa-install {
      display: none;
    }
  }
`

const StyledButton = styled.button`
  margin: 8px 0;
  width: 100%;
  background-color: var(--accentColor);
  border: none;
  border-radius: 3px;
  padding: 8px 12px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  transition: background-color .3s linear;
  
  &:hover {
    background-color: #575bb1;
  }
`

export const PwaWidget = () => {
  const {buildDate, installApp, installable} = usePwaContext()

  return (
    <StyledDiv>
      {installable &&
        <div className="pwa-install">
          <StyledButton
            type="button"
            onClick={installApp}
          >Установить</StyledButton>
        </div>
      }

      <StyledText>Последнее обновление:</StyledText>
      <StyledText>{buildDate}</StyledText>
    </StyledDiv>)
}

