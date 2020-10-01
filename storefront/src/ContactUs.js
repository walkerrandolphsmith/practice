import React from "react";
import { FeedbackForm } from "./FeedbackForm";

export default () => (
  <section className=" body-font relative">
    <div className="absolute inset-0 bg-gray-300"></div>
    <div className="container px-5 py-24 mx-auto flex">
      <div className="lg:w-1/3 md:w-1/2 bg-base rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10">
        <FeedbackForm />
      </div>
    </div>
  </section>
);
