import { injectGlobal } from "emotion"

export const baseStyles = injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-display: swap;
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
  html,
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Roboto Light', 'Segoe UI', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 16px;
    scroll-behavior: smooth;
  }
  body {
    overflow-x: hidden;
  }

  .visibleMobile {
    display: none;
  }
  .visibleMobileView {
    display: none !important;
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

  /* Header section ends here */
  .sidebarTitle {
    /* box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16); */
    background-color: #f8f8f8;
    padding: 18px 16px;
    font-family: 'Roboto';
    font-size: 18px;
    font-weight: 600;
    color: #001934;
    display: flex;
    align-items: center;
  }

  .sideBarShow {
    display: none;
  }

  .sidebarTitle a {
    color: #001934;
  }

  .titleWrapper {
    display: flex;
    align-items: center;
    padding-bottom: 40px;
    margin-bottom: 32px;
  }

  .gitBtn {
    height: 30px;
    min-height: 30px;
    display: flex;
    align-items: center;
  }

  .gitBtn img {
    width: 15px;
    display: inline-block;
    margin-right: 5px;
  }

  .addPaddTopBottom {
    padding: 50px 0;
  }

  .preRightWrapper {
    display: block;
    margin: 0px;
    flex: 1 1 0%;
    padding: 16px;
    text-align: right;
  }

  .smallContent {
    display: block;
    margin: 0px;
    padding: 0px;
    color: #6e6e6e;
  }

  .smallContent span {
    font-size: 12px;
    line-height: 1.625;
    font-weight: 400;
  }

  /* **************************** */

  .nextRightWrapper {
    display: block;
    margin: 0px;
    padding: 16px;
    flex: 1 1 0%;
  }

  /* tables.css */
  .tableWrapper {
    max-width: 100%;
    overflow: auto;

    @media (max-width: 767px) {
      margin: 0 -25px;
      max-width: calc(100% + 50px);
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
  /* end - tables.css */

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

  .heading1 {
    font-size: 26px;
    font-weight: 800;
    line-height: 1.5;
    margin-bottom: 16px;
    margin-top: 32px;
  }

  .heading2 {
    font-size: 24px;
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 16px;
    margin-top: 32px;
  }

  .heading3 {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.5;
    margin-bottom: 16px;
    margin-top: 32px;
  }

  .heading4 {
    font-size: 18px;
    font-weight: 500;
    line-height: 1.5;
    margin-bottom: 16px;
    margin-top: 32px;
  }

  .heading5 {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    margin-bottom: 16px;
    margin-top: 32px;
  }

  .heading6 {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    margin-bottom: 16px;
    margin-top: 32px;
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
  }

  .poweredBy {
    font-size: 0.6em;
    text-align: end;
    padding: 0;
  }

  @media (max-width: 767px) {
    .visibleMobileView {
      display: block !important;
    }
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

    .hiddenMobile {
      display: none !important;
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

    .titleWrapper {
      padding: 0 15px;
      display: block;
    }

    .gitBtn {
      display: inline-block;
    }

    .mobileView {
      text-align: left !important;
      padding-left: 0 !important;
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
