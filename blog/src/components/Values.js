import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faDotCircle,
  faCrown,
  faInfinity,
  faAtom,
} from "@fortawesome/free-solid-svg-icons"

export const Values = () => (
  <section className=" body-font">
    <div className="container px-5 py-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-20">
        <h1 className="text-2xl font-medium title-font mb-4 text-base-900">
          VALUES
        </h1>
        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
          Our value system guides each decision and is demonstrated in our
          conduct. We rely on radical candor to maintain thoughtful honesty.
          Through focus, inclusion, ownership, and a dedication to life long
          learning we believe we can provide the highest quality instruction.
        </p>
      </div>
      <div className="flex flex-wrap -m-4">
        <CoreValue
          name="Focus"
          description="It is best to do one thing really well."
          icon={faDotCircle}
        />
        <CoreValue
          name="Inclusion"
          description="We are better together."
          icon={faAtom}
        />
        <CoreValue
          name="Continious Learner"
          description="Empty your cup often and adjust to changing conditions."
          icon={faInfinity}
        />
        <CoreValue
          name="Ownership"
          description="Own risk. Own rewards. Ownership fuels passion"
          icon={faCrown}
        />
      </div>
    </div>
  </section>
)

const CoreValue = ({ name, icon, description }) => (
  <div className="p-4 lg:w-1/4 md:w-1/2">
    <div className="h-full flex flex-col items-center text-center">
      <div className="flex-shrink-0 rounded-lg w-full h-32 object-cover object-center mb-4 text-4xl flex justify-center items-center">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="w-full">
        <h2 className="title-font font-medium text-2xl text-base-900">
          {name}
        </h2>
        <p className="mt-2 mb-4">{description}</p>
      </div>
    </div>
  </div>
)
