const remarkPlugins = [
  {
    resolve: `gatsby-remark-images`,
    options: {
      maxWidth: 590,
    },
  },
  "gatsby-remark-prismjs",
  {
    resolve: `gatsby-remark-classes`,
    options: {
      classMap: {
        "heading[depth=1]":
          "text-2xl font-medium title-font mb-4 text-base-900 tracking-widest",
        "heading[depth=2]": "text-base-900 text-lg mb-1 font-medium title-font",
        "heading[depth=3]": "text-lg",
        paragraph: "leading-relaxed text-base",
      },
    },
  },
]
module.exports = {
  pathPrefix: `/`,
  siteMetadata: {
    title: "RockstarLabs",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "gatsby-starter-default",
        short_name: "starter",
        start_url: "/",
        background_color: "#663399",
        theme_color: "#663399",
        display: "minimal-ui",
        icon: "src/images/logo192.png",
      },
    },
    "gatsby-plugin-offline",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/, // See below to configure properly
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `routes`,
        path: `${__dirname}/src/routes/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: remarkPlugins,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: remarkPlugins,
      },
    },
  ],
}
