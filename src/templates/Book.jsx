import React from "react"
import Helmet from "react-helmet"
import { styled } from "@linaria/react"

import { graphql } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"

import { GithubButton } from "../components/molecules/GithubButton"
import { NextPrevious } from "../components/organisms/NextPrevious"
import { TableOfContents } from "../components/organisms/TableOfContents"

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
  margin: 1rem 0;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--decoColor);

  & > div {
    align-self: flex-end;
  }
`

const StyledHeading = styled.h1`
  flex: 1;
  max-width: 100%;
  font-size: 28px;
  line-height: 1.5;
  font-weight: 500;
  border-left: 2px solid var(--accentColor);
  padding-left: 1rem;
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

  return (
    <>
      <Helmet
        title={metaTitle}
        meta={[
          { name: "title", content: metaTitle },
          { name: "og:title", content: metaTitle },
          { name: "twitter:title", content: metaTitle },
          { name: "description", content: metaDescription },
          { name: "og:description", content: metaDescription },
          { name: "twitter:description", content: metaDescription },
          {
            name: "google-site-verification",
            content: "e8ODwZKRJ5H_TiNsq-70JsUkCkCiXRtvC6IMNJayTN8",
          },
        ]}
      />

      <PaddingWrapper>
        <NextPrevious mdx={mdx} />
      </PaddingWrapper>

      <PaddingWrapper>
        <StyledTitleWrapper className={"titleWrapper"}>
          <StyledHeading>{mdx.fields.title}</StyledHeading>
        </StyledTitleWrapper>
      </PaddingWrapper>

      <PaddingWrapper>
        <TableOfContents
          location={props.location}
          isDefaultCollapsed
          className="before-content"
        />
      </PaddingWrapper>

      <PaddingWrapper className="main">
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </PaddingWrapper>

      <PaddingWrapper>
        {githubUrl && (
          <GithubButton to={githubUrl} aria-label="Star on GitHub">
            Star
          </GithubButton>
        )}
        {docsLocation && (
          <GithubButton to={`${docsLocation}/${mdx.parent.relativePath}`}>
            Edit on GitHub
          </GithubButton>
        )}
      </PaddingWrapper>

      <PaddingWrapper>
        <NextPrevious mdx={mdx} />
      </PaddingWrapper>
    </>
  )
}

export default BookTemplate
