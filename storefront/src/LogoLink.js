import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlask } from "@fortawesome/free-solid-svg-icons";

export const LogoLink = ({ inHero }) => (
  <Link
    className="flex title-font font-medium items-center md:justify-start justify-center text-base-900"
    to="/"
  >
    <span className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full flex justify-center items-center">
      <FontAwesomeIcon icon={faFlask} />
    </span>
    <span className={`ml-3 text-xl ${inHero ? "text-white" : ""}`}>
      Rockstar Labs
    </span>
  </Link>
);
