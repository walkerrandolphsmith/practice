import React from "react"
import Logo from "../assets/Logo.svg"
import { LogoLink } from "./LogoLink"
import { ThemeSwitch } from "./ThemeSwitch"

export const Hero = ({ setTheme, slim }) => (
  <>
    <section id="hero" className="flex flex-col relative w-full p-0 text-white">
      <div
        className="absolute inset-0 flex-1 w-full h-full z-0"
        style={{ maxWidth: "100vw" }}
      >
        <div
          id="hero-background"
          className="absolute inset-0 w-full h-full bg-cover bg-no-repeat bg-center"
        ></div>
        <div
          id="hero-wave"
          className="absolute bottom-0 left-0 z-50 min-w-full"
        >
          <svg
            viewBox="0 0 1695 57"
            preserveAspectRatio="none"
            fill="rgba(255,255,255,1)"
            fill-rule="evenodd"
          >
            <path d="M0 23c135.4 19 289.6 28.5 462.5 28.5C721.9 51.5 936.7 1 1212.2 1 1395.8.9 1556.7 8.3 1695 23v34H0V23z"></path>
          </svg>
        </div>
      </div>
      <div className="relative z-3 flex flex-col">
        <KHero slim={slim} />
      </div>
    </section>
    <div className="absolute top-0 left-0 right-0 w-100 bg-base-100 h-24">
      <header className=" body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <LogoLink inHero />
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 flex flex-wrap items-center text-base justify-center"></nav>
          <ThemeSwitch setTheme={setTheme} />
        </div>
      </header>
    </div>
  </>
)

export const KHero = ({ slim }) => (
  <section className={` body-font ${slim ? "mb-64" : "mb-24"}`}>
    {!slim && (
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <div
          className="relative flex justify-center items-center z-0"
          style={{ minHeight: 250, minWidth: 250 }}
        >
          <div className="absolute w-full h-full inset-0 flex justify-center items-center">
            <span id="logo-hero" className="text-white p-2">
              <Logo />
            </span>
          </div>
        </div>
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Learn by doing
          </h1>
          <p className="mb-8 leading-relaxed text-white text-lg">
            Combat the paywall barrier, learn now.
          </p>
        </div>
      </div>
    )}
  </section>
)
