import React from "react"
import { Link } from "gatsby"
import { LessonsGrid } from "./LessonsGrid"

export const TopLessons = ({ lessons }) => (
  <>
    <section class="body-font">
      <div class="container px-5 pt-24 pb-4 mx-auto">
        <LessonsGrid lessons={lessons} />
      </div>
    </section>
    <div className="flex justify-center pb-24">
      <Link to="/blog">
        <button class="flex items-center bg-blue-500 hover:bg-blue-600 text-white border-0 py-2 px-4 focus:outline-none rounded uppercase">
          See More
        </button>
      </Link>
    </div>
  </>
)
