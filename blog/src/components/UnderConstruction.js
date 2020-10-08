import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDraftingCompass } from "@fortawesome/free-solid-svg-icons"

export const UnderConstruction = () => (
  <div className="flex flex-col text-center w-full mb-20">
    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
      This is still under construction. Thanks for your patience.
    </p>
    <p
      className="lg:w-2/3 mx-auto leading-relaxed text-base"
      style={{ fontSize: "5rem" }}
    >
      <FontAwesomeIcon icon={faDraftingCompass} />
    </p>
  </div>
)
