import someCoolImage from "data-base64:~assets/pocky.png"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import React from "react"
import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging/"

import ModalOverlay from "./modal_overlay"

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(".gU.Up")

// Use this to optimize unmount lookups
// export const getShadowHostId = () => "plasmo-inline-example-unique-id"

const PlasmoInline = () => {
  const [showModal, setShowModal] = useState(false)
  const [response, setContext] = useState("")

  const openModal = () => {
    setShowModal(true)
  }
  const fetchedKoseiDataToSetContext = async () => {
    const tabID = await sendToBackground({
      name: "getCurrentTabID"
    })
    const res = await sendToBackground({
      name: "generateContext",
      tabId: tabID
    })
    setContext(res)
  }
  return (
    <>
      {setShowModal && (
        <ModalOverlay
          showFlag={showModal}
          setShowModal={setShowModal}
          response={response}
        />
      )}

      <button
        onClick={() => {
          openModal()
          fetchedKoseiDataToSetContext()
        }}>
        <img
          style={{
            borderRadius: "50%",
            width: "30px"
          }}
          src={someCoolImage}
          alt="Some pretty cool image"
        />
      </button>
    </>
  )
}

export default PlasmoInline
