import React from "react"

export const Contributor = ({ avatar, name, description }) => {
  return (
    <section>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20"></div>
        <div className="flex flex-wrap -m-4">
          <div className="p-4 lg:w-1/2">
            <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <img
                alt="team"
                className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4 cursor-pointer"
                src={avatar}
              />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-base-900">
                  {name}
                </h2>
                <h3 className=" mb-3">Software Engineer</h3>
                <p className="mb-4">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
