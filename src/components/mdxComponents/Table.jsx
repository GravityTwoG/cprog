import React from "react"
import { styled } from "@linaria/react"

const borderColor = "#cccccc"
const nthBackgroundLight = "#f8f8f8"
const nthBackgroundDark = "#146da9"

const StyledTableWrapper = styled.div`
  display: flex;
  margin: 0 -60px;
  width: calc(100% + 120px);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  // pad
  & > div {
    flex: 0 0 60px;
  }

  @media only screen and (max-width: 520px) {
    margin: 0 -16px;
    width: calc(100% + 32px);

    & > div {
      flex: 0 0 16px;
    }
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  thead tr th {
    position: sticky;
    top: 0;
  }

  table tr {
    margin: 0;
    padding: 0;
    background: var(--backgroundColor);
  }

  table thead tr {
    background-color: ${nthBackgroundLight};

    html[data-theme="dark"] & {
      background-color: ${nthBackgroundDark};
    }

    & th {
      font-weight: bold;
      border: 1px solid ${borderColor};
      text-align: left;
      margin: 0;
      padding: 6px 13px;
    }
  }

  table tbody tr:nth-of-type(2n) {
    background-color: ${nthBackgroundLight};

    html[data-theme="dark"] & {
      background-color: ${nthBackgroundDark};
    }
  }

  table td {
    border: 1px solid ${borderColor};
    text-align: left;
    margin: 0;
    padding: 6px 13px;
  }
`

export const Table = props => (
  <StyledTableWrapper>
    <div />
    <table {...props} />
    <div />
  </StyledTableWrapper>
)
