import React from "react"
import { OurTeam } from "../components/OurTeam"
import { PricingTeirs } from "../components/PricingTeirs"
import { TopLessons } from "../components/TopLessons"
import { BaseLayout } from "../components/BaseLayout"

export default ({ data }) => {
  return (
    <BaseLayout>
      <TopLessons lessons={data.allMdx.nodes} />
      <OurTeam />
      <PricingTeirs />
    </BaseLayout>
  )
}

export const query = graphql`
  query TrendingBlogPostsQuery {
    allMdx(filter: { frontmatter: { trending: { eq: true } } }) {
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
