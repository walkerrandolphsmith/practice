import React, { Fragment } from "react";
import { Hero } from "./Hero";
import { OurTeam } from "./OurTeam";
const PricingTeirs = React.lazy(() => import("./PricingTeirs"));
const TopLessons = React.lazy(() => import("./TopLessons"));
const ContactUs = React.lazy(() => import("./ContactUs"));
const Footer = React.lazy(() => import("./Footer"));

export default ({ setTheme }) => (
  <Fragment>
    <Hero setTheme={setTheme} />
    <OurTeam />
    <TopLessons />
    <PricingTeirs />
    <ContactUs />
    <Footer />
  </Fragment>
);
