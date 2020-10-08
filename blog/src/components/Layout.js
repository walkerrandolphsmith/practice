import React from "react"
import Helmet from "react-helmet"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { BaseLayout } from "../components/BaseLayout"

const shortcodes = { Link }

export default ({ data }) => {
  return (
    <BaseLayout slim>
      <Helmet
        title={data.mdx.frontmatter.title}
        meta={[
          {
            name: "description",
            content: data.mdx.frontmatter.description,
          },
          {
            name: "keywords",
            content: (data.mdx.frontmatter.keywords || []).join(", "),
          },
        ]}
      >
        <html lang={"en"} />
      </Helmet>
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </MDXProvider>
    </BaseLayout>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        description
        keywords
      }
    }
  }
`
