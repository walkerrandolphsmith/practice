import React from "react";
import "./ThemeSwitch.css";

export const ThemeSwitch = ({ setTheme }) => {
  return (
    <button
      aria-label="hidden"
      className="mode m-4"
      onClick={setTheme}
    ></button>
  );
};
