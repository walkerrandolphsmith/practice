import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import { LessonsGrid } from "../components/LessonsGrid"
import { BaseLayout } from "../components/BaseLayout"

export default ({ data }) => {
  return (
    <BaseLayout slim>
      <Helmet
        title="Blog"
        meta={[
          {
            name: "description",
            content: "All lessons",
          },
        ]}
      >
        <html lang={"en"} />
      </Helmet>
      <section class="body-font">
        <div class="container px-5 py-24 mx-auto">
          <LessonsGrid lessons={data.allMdx.nodes} />
        </div>
      </section>
    </BaseLayout>
  )
}

export const query = graphql`
  query AllBlogPostsQuery {
    allMdx(filter: { fileAbsolutePath: { regex: "/posts/" } }) {
      nodes {
        id
        slug
        frontmatter {
          path
          title
          description
          keywords
          date
          thumbnail
        }
      }
    }
  }
`
