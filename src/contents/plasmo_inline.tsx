import pretzImage from "data-base64:~assets/pretz.jpeg"
import cssText from "data-text:~/src/style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import React from "react"
import { useState } from "react"
import { createRoot } from "react-dom/client"

import Modal from "./modal"

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"]
}

/**
 * 真ん中の大きなモーダル作成
 */
function createModal() {
  const container = document.createElement("div")
  container.id ="chatGPT-for-Gmail"
  document.body.after(container)
  createRoot(container).render(<Modal showFlag={true} />)
}


/**
 * ボタンのアンカー
 */
export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(".gU.Up")


export default function  PlasmoInline () {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  return (
    <>
      <button
        className="ml-2"
        onClick={async () => {
          openModal()
          createModal()
          // createOverlay(true)
          // createModal(ChatGptResponse)
        }}>
        <img
          className="w-7 h-7 rounded-full"
          src={pretzImage}
          alt="Some pretty cool image"
        />
      </button>
    </>
  )
}


export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
