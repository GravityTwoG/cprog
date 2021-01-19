import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import styled from "@emotion/styled"
import config from "../../config"

import { NextPrevious } from "../components/NextPrevious"
import { GithubButton } from "../components/GithubButton"

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
  padding-bottom: 12px;
  border-bottom: 1px solid var(--decoColor);
  
  & > div {
    margin-top: 12px;
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
              <GithubButton
                to={githubUrl}
                aria-label="Star on GitHub"
              >
                Star
              </GithubButton>
            )}
            {docsLocation && (
              <GithubButton to={`${docsLocation}/${mdx.parent.relativePath}`}>
                Edit on GitHub
              </GithubButton>
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
