import React from "react"
import { FeedbackForm } from "./FeedbackForm"

export const Feedback = () => (
  <section className=" body-font relative">
    <div className="container px-5 py-24 mx-auto flex sm:flex-no-wrap flex-wrap">
      <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
        <div className="bg-base relative flex flex-wrap py-6"></div>
      </div>
      <div className="lg:w-1/3 md:w-1/2 bg-base flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
        <FeedbackForm />
      </div>
    </div>
  </section>
)
