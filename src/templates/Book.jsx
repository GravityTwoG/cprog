import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer"
import styled from "@emotion/styled"

import { Link } from "../components/Link"
import { NextPrevious } from "../components/NextPrevious"
import gitHub from "../images/github.svg"
import config from "../../config"

const forcedNavOrder = config.sidebar.forcedNavOrder

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
    allMdx {
      edges {
        node {
          fields {
            slug
            title
          }
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
  if (!props.data) {
    return null
  }
  const {
    allMdx,
    mdx,
    site: {
      siteMetadata: { docsLocation },
    },
  } = props.data

  const navItems = allMdx.edges
    .map(({ node }) => node.fields.slug)
    .filter(slug => slug !== "/")
    .sort()
    .reduce(
      (acc, cur) => {
        if (forcedNavOrder.find(url => url === cur)) {
          return { ...acc, [cur]: [cur] }
        }

        let prefix = cur.split("/")[1]

        if (config.gatsby && config.gatsby.trailingSlash) {
          prefix = prefix + "/"
        }

        if (prefix && forcedNavOrder.find(url => url === `/${prefix}`)) {
          return { ...acc, [`/${prefix}`]: [...acc[`/${prefix}`], cur] }
        } else {
          return { ...acc, items: [...acc.items, cur] }
        }
      },
      { items: [] }
    )

  const nav = forcedNavOrder
    .reduce((acc, cur) => {
      return acc.concat(navItems[cur])
    }, [])
    .concat(navItems.items)
    .map(slug => {
      if (slug) {
        const { node } = allMdx.edges.find(
          ({ node }) => node.fields.slug === slug
        )

        return { title: node.fields.title, url: node.fields.slug }
      }
      return null
    })

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
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

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

      <StyledMainWrapper>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </StyledMainWrapper>

      <div className={"addPaddTopBottom"}>
        <NextPrevious mdx={mdx} nav={nav} />
      </div>
    </>
  )
}

export default BookTemplate

const StyledTitleWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.deco};
`

export const StyledHeading = styled("h1")`
  font-size: 32px;
  line-height: 1.5;
  font-weight: 500;
  border-left: 2px solid ${props => props.theme.colors.accent};
  padding: 0 16px;
  flex: 1;
  margin-top: 0;
  padding-top: 0;
  color: ${props => props.theme.colors.heading};
`

export const Edit = styled("div")`
  padding: 1rem 1.5rem;

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

export const StyledMainWrapper = styled.div`
  max-width: 750px;
  color: ${props => props.theme.colors.text};

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
    color: ${props => props.theme.colors.link};
  }

  code {
    border: 1px solid #ede7f3;
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 0.9375em;

    background: ${props => props.theme.colors.background};
  }

  @media (max-width: 767px) {
    padding: 0 15px;
  }
`
