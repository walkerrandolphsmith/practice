import React from "react"
import { Link } from "gatsby"

export const LessonsGrid = ({ lessons }) => (
  <div class="flex flex-wrap -m-4">
    {lessons.map(({ frontmatter }) => (
      <Article {...frontmatter} />
    ))}
  </div>
)

const Article = ({
  title,
  description,
  path,
  keywords,
  thumbnail = "walker.jpg",
}) => (
  <div class="p-4 md:w-1/3">
    <div class="h-full border-2 border-base-200 rounded-lg overflow-hidden shadow-md">
      <Link to={`/blog${path}`}>
        <img
          class="lg:h-48 md:h-36 w-full object-cover object-center"
          src={require(`../images/${thumbnail}`)}
          alt="blog"
        />
        <div class="p-6">
          <h2 class="tracking-widest text-xs title-font font-medium text-base-500 mb-1 uppercase">
            {(keywords || []).join(", ")}
          </h2>
          <h1 class="title-font text-lg font-medium text-base-900 mb-3">
            {title}
          </h1>
          <p class="leading-relaxed mb-3">{description}</p>
          <div class="flex items-center flex-wrap ">
            <span class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
              Learn More
              <svg
                class="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </span>
            <span class="text-base-600 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-base-300">
              <svg
                class="w-4 h-4 mr-1"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              1.2K
            </span>
            <span class="text-base-600 inline-flex items-center leading-none text-sm">
              <svg
                class="w-4 h-4 mr-1"
                stroke="currentColor"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
              6
            </span>
          </div>
        </div>
      </Link>
    </div>
  </div>
)
