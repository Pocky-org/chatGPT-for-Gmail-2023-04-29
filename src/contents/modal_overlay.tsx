import type { PlasmoCSConfig } from "plasmo"
import type { PlasmoGetOverlayAnchor } from "plasmo"
import React from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"]
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = () =>
  document.querySelector(".gU.Up")

const ModalOverlay = (props) => {
  const closeModal = () => {
    props.setShowModal(false)
  }
  return (
    <>
      {props.showFlag && props.response ? (
        <div
          id="overlay"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            width: 400,
            height: 400,
            backgroundColor: "white",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}>
          <div id="modalContent">
            <div onClick={closeModal}>✖️</div>
            <p className="text-3xl font-bold underline">{props.response}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default ModalOverlay
