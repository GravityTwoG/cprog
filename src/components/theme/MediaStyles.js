import { injectGlobal } from "@emotion/css"

export const mediaStyles = injectGlobal`        
  @media (max-width: 1024px) {
    .hiddenMobile {
      display: none;
    }
  }

  .visibleMobile {
    display: none;
  }
  .visibleMobileView {
    display: none !important;
  }

  @media (max-width: 767px) {
    .visibleMobileView {
      display: block !important;
    }
    .mobileView {
      text-align: left !important;
      padding-left: 0 !important;
    }
  }
`
