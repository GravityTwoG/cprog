import React from "react";
import styled from "@emotion/styled";

const StyledTableWrapper = styled.div`
  display: flex;
  margin: 0 -60px;
  width: calc(100% + 120px);
  overflow-x: auto;
  
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
    padding: 0;
    border-collapse: collapse;
  }

  table tr {
    border-top: 1px solid #cccccc;
    margin: 0;
    padding: 0;
  }

  table tr:nth-of-type(2n) {
    background-color: #f8f8f8;

    html[data-theme="dark"] & {
      background-color: #001523;
    }
  }

  table tr th {
    font-weight: bold;
    border: 1px solid #cccccc;
    text-align: left;
    margin: 0;
    padding: 6px 13px;
  }

  table tr td {
    border: 1px solid #cccccc;
    text-align: left;
    margin: 0;
    padding: 6px 13px;
  }

  table tr th :first-of-type,
  table tr td :first-of-type {
    margin-top: 0;
  }

  table tr th :last-child,
  table tr td :last-child {
    margin-bottom: 0;
  }
`

export const Table = props => (
  <StyledTableWrapper>
    <div/><table {...props} /><div/>
  </StyledTableWrapper>
)