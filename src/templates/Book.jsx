import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import styled from "@emotion/styled"
import config from "../../config"

import { Link } from "../components/Link"
import { NextPrevious } from "../components/NextPrevious"
import gitHub from "../images/github.svg"

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
      siteMetadata: { docsLocation },
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
          <Edit className={"mobileView"}>
            {docsLocation && (
              <Link
                className={"gitBtn"}
                target="_blank"
                to={`${docsLocation}/${mdx.parent.relativePath}`}
              >
                <img src={gitHub} alt={"Github logo"} /> Edit on GitHub
              </Link>
            )}
          </Edit>
        </StyledTitleWrapper>
      </PaddingWrapper>

      <StyledMainWrapper>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </StyledMainWrapper>

      <PaddingWrapper className={"addPaddTopBottom"}>
        <NextPrevious mdx={mdx} />
      </PaddingWrapper>
    </>
  )
}

export default BookTemplate

export const PaddingWrapper = styled.div`
  padding: 0 60px;

  @media only screen and (max-width: 520px) {
    padding: 0 25px;
  }
`

export const StyledMainWrapper = styled.div`
  max-width: 100%;
  color: var(--textColor);
  overflow: hidden;
  padding: 0 60px;

  @media (max-width: 1440px) {
    max-width: 100%;
  }

  @media only screen and (max-width: 520px) {
    padding: 0 25px;
  }

  ul,
  ol {
    -webkit-padding-start: 40px;
    -moz-padding-start: 40px;
    -o-padding-start: 40px;
    margin: 24px 0px;
    padding: 0px 0px 0px 2em;

    li {
      font-size: 16px;
      line-height: 1.8;
      font-weight: 400;
    }
  }

  a {
    transition: color 0.15s;
    color: var(--linkColor);
  }

  code {
    max-width: 100%;
    border: 1px solid #ede7f3;
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 0.9375em;

    background: var(--backgroundColor);
  }
`

const StyledTitleWrapper = styled.div`
  margin-bottom: 20px;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--decoColor);
`

export const StyledHeading = styled("h1")`
  max-width: 100%;
  flex: 1;
  font-size: 32px;
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
    font-size: 24px;
  }
`

export const Edit = styled("div")`
  margin: 0.5rem 0 0.5rem 0.5rem;
  a {
    width: 150px;
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
