import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { LogoLink } from "./LogoLink";

export default () => (
  <footer className=" body-font">
    <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-no-wrap flex-wrap flex-col">
      <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
        <LogoLink />
        <p className="mt-2 text-sm ">Combat the paywall barrier, learn now.</p>
      </div>
      <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
        <Column title="Company">
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/values">Values</FooterLink>
          <FooterLink to="/team">Team</FooterLink>
          <FooterLink to="/terms-and-conditions">Terms</FooterLink>
          <FooterLink to="/privacy-policy">Privacy</FooterLink>
        </Column>
        <Column title="Community">
          <FooterLink to="/contribute">Contribute</FooterLink>
          <FooterLink to="/sponsors">Sponsors</FooterLink>
          <FooterLink to="/partner">Partner</FooterLink>
          <FooterLink to="/roadmap">Roadmap</FooterLink>
        </Column>
        <Column title="Support">
          <FooterLink to="/help">Help Center</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
          <FooterLink to="/private-tutoring">
            Schedule Private Tutoring
          </FooterLink>
        </Column>
      </div>
    </div>
    <FootNotes />
  </footer>
);

const FooterLink = ({ to = "/", children }) => (
  <li className="my-4">
    <Link className=" hover:text-base-800 py-4" to={to}>
      {children}
    </Link>
  </li>
);

const Column = ({ title, children }) => (
  <div className="lg:w-1/4 md:w-1/2 w-full px-4">
    <h2 className="title-font font-medium text-base-900 tracking-widest text-sm mb-3">
      {title}
    </h2>
    <nav className="list-none mb-10">
      <ul>{children}</ul>
    </nav>
  </div>
);

const FootNotes = () => (
  <div className="bg-base-300">
    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <p className=" text-sm text-center sm:text-left">© 2020 rockstarlabs</p>
      <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
        <a
          className=""
          href="https://github.com/rockstarlabs-io"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit us on Github"
        >
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </span>
    </div>
  </div>
);
