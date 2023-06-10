import React from "react"
import Helmet from "react-helmet"
import { styled } from "@linaria/react"

import { graphql } from "gatsby"

import { ContentPadding } from "../components/atoms/ContentPadding"
import { GithubButton } from "../components/molecules/GithubButton"
import { NextPrevious } from "../components/organisms/NextPrevious"
import { TableOfContents } from "../components/organisms/TableOfContents"

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
      tableOfContents
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
            name: "keywords",
            content:
              "cprog, ermak, сипрог, ермак, ermak.cs.nstu.ru cprog, cprog ermak nstu, cprog ermak, cprog.ru, cprog.rar, C++, C, programming, программирование, ООП, OOP, Си, Си++, учебник по программированию",
          },
        ]}
      />

      <ContentPadding>
        <NextPrevious mdx={mdx} />
      </ContentPadding>

      <ContentPadding>
        <StyledTitleWrapper className={"titleWrapper"}>
          <StyledHeading>{mdx.fields.title}</StyledHeading>
        </StyledTitleWrapper>
      </ContentPadding>

      <ContentPadding>
        <TableOfContents
          isDefaultCollapsed
          className="before-content"
          content={mdx.tableOfContents}
        />
      </ContentPadding>

      <ContentPadding className="main">{props.children}</ContentPadding>

      <ContentPadding>
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
      </ContentPadding>

      <ContentPadding>
        <NextPrevious mdx={mdx} />
      </ContentPadding>
    </>
  )
}

export default BookTemplate
