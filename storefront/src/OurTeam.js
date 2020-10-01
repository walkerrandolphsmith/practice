import React from "react";
import walker from "./avatars/walker.jpg";
import aguzman from "./avatars/aguzman.jpg";

export const OurTeam = () => (
  <section className=" body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="text-2xl font-medium title-font mb-4 text-base-900 tracking-widest">
          OUR TEAM
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          We are dedicated to life long learning through teaching.
        </p>
      </div>
      <div className="flex flex-wrap -m-4">
        <div className="p-4 lg:w-1/2">
          <TeamMate
            name="Walker Smith"
            role="Software Engineer"
            description="Technology enthusiast, proud Eagle Scout, and software craftsman. Dabbles in all things front end, systems design, k8s and more."
            avatar={walker}
          />
        </div>
        <div className="p-4 lg:w-1/2">
          <TeamMate
            name="Alejandro Guzman"
            role="Software Engineer"
            description="Systems Engineer and python expert. Dabbles in k8s, terraform, systems architecture, and more."
            avatar={aguzman}
          />
        </div>
      </div>
    </div>
  </section>
);

const TeamMate = ({
  name,
  role,
  description,
  avatar = "https://dummyimage.com/200x200",
}) => (
  <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
    <img
      alt="team"
      className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4 cursor-pointer"
      src={avatar}
    />
    <div className="flex-grow sm:pl-8">
      <h2 className="title-font font-medium text-lg text-base-900">{name}</h2>
      <h3 className=" mb-3">{role}</h3>
      <p className="mb-4">{description}</p>
    </div>
  </div>
);
