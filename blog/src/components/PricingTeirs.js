import React from "react"
import { Link } from "gatsby"

export const PricingTeirs = () => (
  <section className=" body-font overflow-hidden">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-base-900">
          Sponsorship
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          We rely on a sponsorship program to crowdsource funding from community
          members who are most capable of monetarily contributing while
          continuing to provide high-quality content and support to those
          members who are less capable of monetarily contributing.
        </p>
      </div>
      <div className="flex flex-wrap justify-center -m-4">
        <Plan
          name="Start"
          price="Free"
          description="Available to everyone. No contribution is required to take advantage of our content."
        >
          <Feature>Access to ALL Content</Feature>
          <Feature>Request New Lessons</Feature>
        </Plan>
        <Plan
          name="BRONZE"
          teir="bronze"
          hasDetails
          description="Our company mission resonates with you and you want to show your support."
          price={
            <>
              {" "}
              <span>$1</span>
              <span className="text-lg ml-1 font-normal ">/mo</span>
            </>
          }
          isActive
        >
          <Feature>Access to ALL Content</Feature>
          <Feature>Request New Lessons</Feature>
          <Feature>Drive Roadmap Direction</Feature>
        </Plan>
        <Plan
          name="GOLD"
          teir="gold"
          hasDetails
          description="You want to contribute to our company mission and ensure it succeedes."
          price={
            <>
              {" "}
              <span>$5</span>
              <span className="text-lg ml-1 font-normal ">/mo</span>
            </>
          }
        >
          <Feature>Access to ALL Content</Feature>
          <Feature>Request New Lessons</Feature>
          <Feature>Drive Roadmap Direction</Feature>
          <Feature>Access to One-Two-Ones</Feature>
        </Plan>
      </div>
    </div>
  </section>
)

const Plan = ({
  isActive,
  name,
  description,
  price,
  children,
  hasDetails,
  teir,
}) => (
  <div className="p-4 xl:w-1/4 md:w-1/2 w-full">
    <div
      className={`h-full p-6 rounded-lg border-2 flex flex-col relative overflow-hidden ${
        isActive ? "border-blue-500" : "border-gray-300"
      }`}
    >
      {isActive && (
        <span className="bg-blue-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
          POPULAR
        </span>
      )}
      <h2 className="text-sm tracking-widest title-font mb-1 font-medium">
        {name}
      </h2>
      <h1 className="text-5xl text-base-900 pb-4 mb-4 border-b border-gray-200 leading-none">
        {price}
      </h1>
      {children}
      {hasDetails ? (
        <SelectPlan isActive={isActive} teir={teir} />
      ) : (
        <div className="mt-auto"></div>
      )}
      <p className="text-xs  mt-3">{description}</p>
    </div>
  </div>
)

const SelectPlan = ({ isActive, teir }) => (
  <Link to={`/sponsorship/${teir}`} className="mt-auto">
    <button
      className={`flex items-center text-white border-0 py-2 px-4 w-full focus:outline-none rounded ${
        isActive
          ? "bg-blue-500 hover:bg-blue-600"
          : "bg-gray-600 hover:bg-gray-700"
      }`}
    >
      Button
      <svg
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        className="w-4 h-4 ml-auto"
        viewBox="0 0 24 24"
      >
        <path d="M5 12h14M12 5l7 7-7 7"></path>
      </svg>
    </button>
  </Link>
)

const Feature = ({ children }) => (
  <p className="flex items-center  mb-2">
    <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-500 text-white rounded-full flex-shrink-0">
      <svg
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2.5"
        className="w-3 h-3"
        viewBox="0 0 24 24"
      >
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
    </span>
    {children}
  </p>
)
