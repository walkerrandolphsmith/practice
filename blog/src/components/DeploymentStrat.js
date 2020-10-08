import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faSpinner,
  faServer,
  faBoxOpen,
  faLongArrowAltRight,
  faTimes,
  faThermometerEmpty,
  faThermometerQuarter,
  faThermometerFull,
} from "@fortawesome/free-solid-svg-icons"

const lastSlideCount = 12

const Frame = ({ children, visible, width = "w-20" }) => {
  const className =
    (visible ? "opacity-100 " : "opacity-0 ") +
    width +
    " relative transition-opacity duration-500 ease-in-out"
  return <div class={className}>{children}</div>
}

const Server = ({ isHealthy, version, visible }) => {
  const indicator =
    " absolute bottom-0 left-0 rounded-full w-4 h-4 transition-colors duration-500 ease-in-out"
  const healthIndicator =
    (isHealthy ? "bg-green-500" : "bg-gray-500") + indicator

  return (
    <Frame visible={visible}>
      <div class="text-4xl">{version}</div>
      <FontAwesomeIcon icon={faServer} size="4x" />
      <div class={healthIndicator}></div>
    </Frame>
  )
}

const Artficat = ({ version, visible }) => {
  return (
    <Frame visible={visible}>
      <div class="text-4xl">{version}</div>
      <FontAwesomeIcon icon={faBoxOpen} size="4x" />
    </Frame>
  )
}

const Setup = ({ visible }) => (
  <Frame visible={visible}>
    <div style={{ height: 54 }}></div>
    <FontAwesomeIcon icon={faSpinner} spin size="4x" />
  </Frame>
)

const NextStep = ({ visible }) => (
  <Frame visible={visible}>
    <div style={{ height: 54 }}></div>
    <FontAwesomeIcon icon={faLongArrowAltRight} size="4x" />
  </Frame>
)

const Attribute = ({ children, icon, visible }) => {
  return (
    <Frame visible={visible} width="w-56">
      <div class="text-2xl">{children}</div>
      <FontAwesomeIcon icon={icon} size="2x" />
    </Frame>
  )
}

function App() {
  const [frame, setFrame] = useState(0)

  const downHandler = ({ key }) => {
    if (key === "ArrowLeft") setFrame(frame > 0 ? frame - 1 : 0)
    if (key === "ArrowRight")
      setFrame(frame === lastSlideCount ? frame : frame + 1)
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler)
    return () => {
      window.removeEventListener("keydown", downHandler)
    }
  })

  return (
    <div class="">
      <div class="flex justify-center text-center mt-32">
        <Artficat visible={frame >= 0} version="v1.0" />
        <NextStep visible={frame >= 0} />
        <Server visible={frame >= 0} isHealthy version="v1.0" />
        <NextStep visible={frame >= 1} />
        <Artficat visible={frame >= 1} version="v2.0" />
        <NextStep visible={frame >= 2} />
        <Server visible={frame >= 2} isHealthy={frame <= 2} version="v1.0" />
        <NextStep visible={frame >= 3} />
        <Setup visible={frame >= 3} />
        <NextStep visible={frame >= 4} />
        <Server visible={frame >= 4} isHealthy version="v2.0" />
      </div>
      <p class="flex justify-center text-center mt-12 text-4xl">
        {frame === 0 && "v1.0 deployed, and instance healthy"}
        {frame === 1 && "In the meantime we build v2.0"}
        {frame === 2 && "Upgrade instance with v2.0"}
        {frame === 3 && "Instance unhealthy while setup runs"}
        {frame === 4 && "Setup completes, instance healthy"}
      </p>

      <div class="flex justify-center text-center mt-12 text-4xl">
        <Attribute visible={frame >= 5} icon={faTimes}>
          Zero Downtime
        </Attribute>
        <Attribute visible={frame >= 6} icon={faTimes}>
          Real Traffic Testing
        </Attribute>
        <Attribute visible={frame >= 7} icon={faTimes}>
          Targeted Users
        </Attribute>
      </div>

      <div class="flex justify-center text-center mt-12 text-4xl">
        <Attribute visible={frame >= 8} icon={faThermometerQuarter}>
          Computing Cost
        </Attribute>
        <Attribute visible={frame >= 9} icon={faThermometerFull}>
          Rollback Duration
        </Attribute>
        <Attribute visible={frame >= 10} icon={faThermometerFull}>
          Negative Impact
        </Attribute>
        <Attribute visible={frame >= 11} icon={faThermometerEmpty}>
          Complexity
        </Attribute>
      </div>
    </div>
  )
}

export default App
