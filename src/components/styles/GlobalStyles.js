import { injectGlobal } from "emotion"

export const baseStyles = injectGlobal`        
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-display: swap;
  }
  html, body {
    font-size: 16px;
    scroll-behavior: smooth;
  }
  body {
    font-family: 'Roboto', 'Roboto Light', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight: 400;
    overflow-x: hidden;
  }

  ::-webkit-input-placeholder {
    /* Edge */
    color: #c2c2c2;
  }
  :-ms-input-placeholder {
    /* Internet Explorer */
    color: #c2c2c2;
  }
  ::placeholder {
    color: #c2c2c2;
  }

  .video-responsive {
    position: relative;
    padding-bottom: 56.2%;
  }
  .video-responsive iframe {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  a {
    transition: color 0.15s;
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }

  .displayInline {
    display: inline-block;
  }

  .divider {
    height: 30px;
    margin: 0 15px;
    border-right: 1px solid rgba(255, 255, 255, 0.3);
  }

  .headerTitle {
    height: auto;
    font-size: 22px;
    line-height: 1;
    font-weight: 700;
    color: #000;
    margin-top: 16px;
    text-transform: uppercase;
  }
  .headerTitle a {
    color: #000;
  }

  .headerTitle a:hover {
    text-decoration: none;
    opacity: 0.8;
  }

  /* Header section starts here */
  .navBarHeader {
    min-width: 335px;
    padding-right: 20px;
    display: flex;
    align-items: center;
  }
  .navBarBrand {
    padding: 0px 0px;
    display: flex;
    align-items: center;
  }

  .navBarBrand img {
    width: 120px;
    margin-right: 6px;
    display: inline-block;
  }
  pre {
    border: 0 !important;
    background-color: rgb(245, 247, 249); /* !important; */
  }
  
  blockquote {
    color: rgb(116, 129, 141);
    margin: 0px 0px 24px;
    padding: 0px 0px 0px 12px;
    border-left: 4px solid rgb(230, 236, 241);
    border-color: rgb(230, 236, 241);
  }
  .socialWrapper {
    display: flex;
    align-items: center;
  }
  .socialWrapper li {
    display: inline-block;
  }
  .socialWrapper li a {
    display: contents;
  }

  .gitBtn {
    height: 30px;
    min-height: 30px;
    display: flex;
    align-items: center;

    & img {
      width: 15px;
      display: inline-block;
      margin-right: 5px;
    }
  }

  .addPaddTopBottom {
    padding-top: 30px;
    padding-bottom: 30px;
  }

  /* **************************** */
  table {
    padding: 0;
    border-collapse: collapse;
  }

  table tr {
    border-top: 1px solid #cccccc;
    margin: 0;
    padding: 0;
  }

  table tr:nth-child(2n) {
    background-color: #f8f8f8;
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

  table tr th :first-child,
  table tr td :first-child {
    margin-top: 0;
  }

  table tr th :last-child,
  table tr td :last-child {
    margin-bottom: 0;
  }

  /* Image styling */
  img {
    max-width: 100%;
  }
  /* end image */
  .githubBtn {
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 10px 0px;
    padding-left: 15px;
    max-height: 40px;
  }
  .githubBtn span span {
    display: flex;
    align-items: center;
  }

  .heading1, .heading2, .heading3, .heading4, .heading5, .heading6 {
    line-height: 1.5;
    margin-bottom: 16px;
    margin-top: 16px;
  }

  .heading1 {
    font-size: 26px;
    font-weight: 700;
  }

  .heading2 {
    font-size: 24px;
    font-weight: 700;
  }

  .heading3 {
    font-size: 20px;
    font-weight: 600;
  }

  .heading4 {
    font-size: 18px;
    font-weight: 500;
  }

  .heading5 {
    font-size: 16px;
    font-weight: 400;
  }

  .heading6 {
    font-size: 14px;
    font-weight: 400;
    
  }

  @media (max-width: 767px) {
    .heading1 {
      font-size: 24px;
    }
    .heading2 {
      font-size: 22px;
    }
    .heading3 {
      font-size: 18px;
    }
    .heading4 {
      font-size: 16px;
    }
    .heading5 {
      font-size: 14px;
    }
    .heading6 {
      font-size: 12px;
    }
  }

  .paragraph {
    margin: 16px 0px 32px;
    line-height: 1.625;
  }

  .pre {
    font-size: 14px;
    margin: 0px;
    padding: 16px;
    overflow: auto;
    max-width: 100%;
    min-width: min-content;
  }

  @media (max-width: 767px) {
    .socialWrapper {
      position: absolute;
      right: 10px;
      top: 29px;
    }
    .headerTitle {
      padding-right: 50px;
      font-size: 16px;
    }
    .navBarBrand {
      min-height: 40px;
    }
    .navBarBrand img {
      margin-right: 8px;
    }

    hr {
      margin-top: 0;
      margin-bottom: 0;
    }

    .navBarHeader {
      display: flex;
      min-width: auto;
      padding-right: 0;
      align-items: center;
    }

    .navBarBrand {
      font-size: 20px;
      padding: 0 0;
      padding-left: 0;
      flex: initial;
      padding-right: 15px;
    }

    .gitBtn {
      display: inline-block;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .navBarBrand {
      font-size: 22px;
    }
    .navBarHeader {
      min-width: 240px;
      flex: initial;
    }
    .githubBtn {
      padding: 10px 10px;
    }
    .divider {
      margin: 0 5px;
      height: 20px;
    }
  }
`
