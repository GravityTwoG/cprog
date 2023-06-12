import React from "react"
import { styled } from "@linaria/react"

const StyledTableWrapper = styled.div`
  display: flex;
  margin: 1rem -60px 2.5rem;
  width: calc(100% + 120px);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  // pad
  & > div {
    width: 60px;
    flex: 0 0 60px;
  }

  @media only screen and (max-width: 520px) {
    margin: 1rem -16px 2.5rem;
    width: calc(100% + 32px);

    & > div {
      width: 16px;
      flex: 0 0 16px;
    }
  }
`

export const Table = props => (
  <StyledTableWrapper>
    <div />
    <table {...props} />
    <div />
  </StyledTableWrapper>
)

export const TableWrapper = props => (
  <StyledTableWrapper>
    <div />
    {props.children}
    <div />
  </StyledTableWrapper>
)
