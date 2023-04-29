import chatGptImage from "data-base64:~assets/chatgpt.jpeg"
// import pretzImage from "data-base64:~assets/pretz.jpeg"
import cssText from "data-text:~/src/style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import React from "react"
import { useState } from "react"

import Modal from "./modal"

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"]
}

/**
 * ボタンのアンカー
 */
export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(".gU.Up")

export default function PlasmoInline() {
  const [showModal, setShowModal] = useState(false)

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <button
        className="ml-2"
        onClick={async () => {
          setShowModal(true)
        }}>
        <img
          className="w-7 h-7 rounded-full"
          src={chatGptImage}
          alt="Some pretty cool image"
        />
      </button>
      {showModal ? (
        <Modal showFlag={showModal} closeModal={closeModal} />
      ) : (
        <></>
      )}
    </>
  )
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
