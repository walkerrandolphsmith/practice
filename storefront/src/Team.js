import React, { Fragment } from "react";
import { Hero } from "./Hero";
import { OurTeam } from "./OurTeam";

export default ({ setTheme }) => (
  <Fragment>
    <Hero setTheme={setTheme} slim />
    <OurTeam />
  </Fragment>
);
