import React from "react";
import { Link } from "react-router-dom";
import walker from "./avatars/walker.jpg";

export default () => (
  <section className=" body-font overflow-hidden">
    <div className="container px-5 py-24 pb-64 mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-base-900">
          Lessons
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          Trending lessons
        </p>
      </div>
      <div className="flex flex-wrap -m-12">
        <div className="p-12 md:w-1/2 flex flex-col items-start">
          <Link
            className=" hover:text-base-800 py-4"
            to="/lessons/deployment-strategies/recreate"
          >
            Deployment Strategies - Recreate!
          </Link>
        </div>
        <Lesson
          category="Systems"
          title="Stateful Workloads"
          lessonHref="https://github.com/walkerrandolphsmith/practice/tree/master/18-stateful-workload"
          author={
            <Link className="inline-flex items-center" to="/team">
              <img
                alt="blog"
                src={walker}
                className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
              />
              <span className="flex-grow flex flex-col pl-4">
                <span className="title-font font-medium text-base-900">
                  Walker Smith
                </span>
                <span className=" text-sm">Software Engineer</span>
              </span>
            </Link>
          }
        >
          Live-edge letterpress cliche, salvia fanny pack humblebrag narwhal
          portland. VHS man braid palo santo hoodie brunch trust fund. Bitters
          hashtag waistcoat fashion axe chia unicorn. Plaid fixie chambray 90's,
          slow-carb etsy tumeric.
        </Lesson>
      </div>
    </div>
  </section>
);

const Lesson = ({ category, title, children, author, lessonHref }) => (
  <div className="p-12 md:w-1/2 flex flex-col items-start">
    <span className="inline-block py-1 px-3 rounded bg-blue-100 text-blue-700 text-sm font-medium tracking-widest">
      {category}
    </span>
    <h2 className="sm:text-3xl text-2xl title-font font-medium text-base-900 mt-4 mb-4">
      {title}
    </h2>
    <p className="leading-relaxed mb-8">{children}</p>
    <div className="flex items-center flex-wrap pb-4 mb-4 border-b-2 border-gray-200 mt-auto w-full">
      <a className="text-blue-700 inline-flex items-center" href={lessonHref}>
        Learn More
        <svg
          className="w-4 h-4 ml-2"
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
      </a>
    </div>
    {author}
  </div>
);
