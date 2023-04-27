import someCoolImage from "data-base64:~assets/pocky.png"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import React from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(".gU.Up")

// Use this to optimize unmount lookups
// export const getShadowHostId = () => "plasmo-inline-example-unique-id"

const PlasmoInline = () => {
  return (
    <button>
      <img
        style={{
          borderRadius: "50%",
          width: "30px"
        }}
        src={someCoolImage}
        alt="Some pretty cool image"
      />
    </button>
  )
}

export default PlasmoInline
