import cssText from "data-text:~/src/style.css"
import type { PlasmoCSConfig } from "plasmo"
import type { PlasmoGetOverlayAnchor } from "plasmo"
import React from "react"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"]
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = () =>
  document.querySelector("ip adB")

const ModalOverlay = (props) => {
  const { showFlag, setShowModal, response } = props
  const closeModal = () => {
    setShowModal(false)
  }
  return (
    <>
      {showFlag && response ? (
        <div>
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
              <div className="bg-black text-white">
                あああああああああああああああああああああああああああああ
              </div>
              <p className="text-3xl font-bold underline">{response}</p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default ModalOverlay
