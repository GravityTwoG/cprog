import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import styled from "@emotion/styled"
import config from "../../config"

import { Link } from "../components/Link"
import { NextPrevious } from "../components/NextPrevious"
import gitHub from "../images/github.svg"
import "../components/theme/global-styles.scss"
import "../components/theme/media-styles.scss"

export const PaddingWrapper = styled.div`
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

const StyledTitleWrapper = styled.div`
  margin-bottom: 20px;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--decoColor);
  
  & > div {
    margin-top: 16px;
    align-self: flex-end;
  }
`

const StyledHeading = styled.h1`
  max-width: 100%;
  flex: 1;
  font-size: 28px;
  line-height: 1.5;
  font-weight: 500;
  border-left: 2px solid var(--accentColor);
  padding: 0 16px;
  margin-top: 0;
  color: var(--headingColor);

  @media (max-width: 767px) {
    font-size: 28px;
  }
  @media (max-width: 576px) {
    font-size: 20px;
  }
`

const GitBtn = styled.span`
  margin: 0.5rem 0 0 0.5rem;
  a {
    font-size: 14px;
    font-weight: 500;
    line-height: 1em;
    text-decoration: none;
    color: rgb(36, 42, 49);
    padding: 5px 16px;

    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(211, 220, 228);
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.2s ease-out 0s;
    box-shadow: rgba(116, 129, 141, 0.1) 0px 1px 1px 0px;
    &:hover {
      background-color: rgb(245, 247, 249);
      color: rgb(36, 42, 49);
    }
  }
`

export const pageQuery = graphql`
  query BookQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        metaDescription
        metaTitle
        title
      }
      body
      fields {
        slug
        title
      }
      parent {
        ... on File {
          relativePath
        }
      }
    }
    site {
      siteMetadata {
        docsLocation
        githubUrl
      }
    }
  }
`

const BookTemplate = props => {
  React.useEffect(() => {
    (async () => {await import("katex/dist/katex.min.css")})()
  }, [])

  if (!props.data) {
    return null
  }

  const {
    mdx,
    site: {
      siteMetadata: { docsLocation, githubUrl },
    },
  } = props.data

  // meta tags
  const metaTitle = mdx.frontmatter.metaTitle
  const metaDescription = mdx.frontmatter.metaDescription
  let canonicalUrl = config.gatsby.siteUrl
  canonicalUrl =
    config.gatsby.pathPrefix !== "/"
      ? canonicalUrl + config.gatsby.pathPrefix
      : canonicalUrl
  canonicalUrl = canonicalUrl + mdx.fields.slug

  return (
    <>
      <Helmet>
        {metaTitle ? <title>{metaTitle}</title> : null}
        {metaTitle ? <meta name="title" content={metaTitle} /> : null}
        {metaDescription ? (
          <meta name="description" content={metaDescription} />
        ) : null}
        {metaTitle ? <meta property="og:title" content={metaTitle} /> : null}
        {metaDescription ? (
          <meta property="og:description" content={metaDescription} />
        ) : null}
        {metaTitle ? (
          <meta property="twitter:title" content={metaTitle} />
        ) : null}
        {metaDescription ? (
          <meta property="twitter:description" content={metaDescription} />
        ) : null}
        {/* Google Search Console verification */}
        <meta
          name="google-site-verification"
          content="e8ODwZKRJ5H_TiNsq-70JsUkCkCiXRtvC6IMNJayTN8"
        />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <PaddingWrapper className="addPaddTopBottom">
        <NextPrevious mdx={mdx} />
      </PaddingWrapper>

      <PaddingWrapper>
        <StyledTitleWrapper className={"titleWrapper"}>
          <StyledHeading>{mdx.fields.title}</StyledHeading>
          <div>
            {githubUrl && (
              <GitBtn>
                <Link
                  className={"gitBtn"}
                  target="_blank"
                  to={githubUrl}
                  rel="noopener"
                  aria-label="Star on GitHub"
                >
                  <img src={gitHub} alt={"Github logo"} /> Star
                </Link>
              </GitBtn>
            )}
            {docsLocation && (
              <GitBtn>
                <Link
                  className={"gitBtn"}
                  target="_blank"
                  to={`${docsLocation}/${mdx.parent.relativePath}`}
                  rel="noopener"
                >
                  <img src={gitHub} alt={"Github logo"} /> Edit on GitHub
                </Link>
              </GitBtn>
            )}
          </div>
        </StyledTitleWrapper>
      </PaddingWrapper>

      <PaddingWrapper className="main">
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </PaddingWrapper>

      <PaddingWrapper className={"addPaddTopBottom"}>
        <NextPrevious mdx={mdx} />
      </PaddingWrapper>
    </>
  )
}

export default BookTemplate
