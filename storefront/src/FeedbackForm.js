import React, { Fragment } from "react";

export const FeedbackForm = () => (
  <Fragment>
    <h2 className="text-base-900 text-lg mb-1 font-medium title-font">
      Feedback
    </h2>
    <p className="leading-relaxed mb-5 ">
      Let us know how we're doing, request new content, or ask about private
      tutoring!
    </p>
    <input
      id="feedback-form-email"
      name="feedback-form-email"
      className="bg-base rounded border border-gray-400 focus:outline-none focus:border-blue-500 text-base px-4 py-2 mb-4"
      placeholder="Email"
      type="email"
    />
    <label className="sr-only" htmlFor="feedback-form-email" />
    <textarea
      id="feedback-form-message"
      name="feedback-form-message"
      className="bg-base rounded border border-gray-400 focus:outline-none h-32 focus:border-blue-500 text-base px-4 py-2 mb-4 resize-none"
      placeholder="Message"
    ></textarea>
    <label className="sr-only" htmlFor="feedback-form-message" />
    <button className="text-white bg-indigo-500 hover:bg-indigo-600 border-0 py-2 px-6 focus:outline-none rounded text-lg">
      Send
    </button>
  </Fragment>
);

//bg-indigo-500 hover:bg-indigo-600
