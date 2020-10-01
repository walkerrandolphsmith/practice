import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Hero } from "./Hero";

export default ({ setTheme }) => (
  <Fragment>
    <Hero setTheme={setTheme} slim />
    <section className=" body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="text-2xl font-medium title-font mb-4 text-base-900 tracking-widest">
            LESSONS
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            <ul>
              <li>
                <Link
                  className=" hover:text-base-800 py-4"
                  to="/lessons/deployment-strategies/recreate"
                >
                  Deployment Strategies - Recreate
                </Link>
              </li>
            </ul>
          </p>
        </div>
      </div>
    </section>
  </Fragment>
);
