import React, { Fragment } from "react";
import { Hero } from "./Hero";
import { UnderConstruction } from "./UnderConstruction";

export default ({ setTheme }) => (
  <Fragment>
    <Hero setTheme={setTheme} slim />
    <section className=" body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="text-2xl font-medium title-font mb-4 text-base-900 tracking-widest">
            SPONSORS
          </h1>
          <UnderConstruction />
        </div>
      </div>
    </section>
  </Fragment>
);
