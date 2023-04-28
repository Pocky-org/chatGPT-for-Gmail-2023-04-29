import someCoolImage from "data-base64:~assets/pocky.png"
import pretzImage from "data-base64:~assets/pretz.jpeg"
import cssText from "data-text:~/src/style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import React from "react"
import { useState } from "react"
import { createRoot } from "react-dom/client"

import { sendToBackground } from "@plasmohq/messaging/"

import ModalOverlay from "./modal_overlay"
// 検証
import ResModal from "./resModal"
//成功したex
import Main from "./testCreateOverlayDom"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"]
}

// function createOverlay(input: boolean) {
//   const container = document.createElement("div")
//   document.body.after(container)
//   createRoot(container).render(
//     <Main
//       translatedText={"ここにテキストが入る"}
//       originalText={"ここにテキストが入る"}
//       targetLang={"JA"}
//       showModal={input}
//     />
//   )
// }

function createModal() {
  const container = document.createElement("div")
  document.body.after(container)
  createRoot(container).render(<ResModal showFlag={true} />)
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(".gU.Up")

// Use this to optimize unmount lookups
// export const getShadowHostId = () => "plasmo-inline-example-unique-id"

const PlasmoInline = () => {
  const [showModal, setShowModal] = useState(false)
  const [response, setContext] = useState("")
  const [ChatGptResponce, setChatGptResponce] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  //校正API:
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
  //chatGptの返答スピードが遅いので,overlayの方で管理したほうが良さそう
  const fetchedChatGptResponceToSetContext = async () => {
    setIsLoading(true)
    const tabID = await sendToBackground({
      name: "getCurrentTabID"
    })
    console.log("tabID: ", tabID)
    const res = await sendToBackground({
      name: "generateContextWIthChatGpt",
      tabId: tabID
    })
    console.log("res", res)
    setChatGptResponce(res)
    setIsLoading(false)
  }
  return (
    <>
      {/* {showModal && (
        <>
          <ModalOverlay
            showFlag={showModal}
            setShowModal={setShowModal}
            response={response}
            ChatGptResponce={ChatGptResponce}
            setIsLoading={setIsLoading}
          />
        </>
      )} */}

      {/* Chat GPTに投げる */}
      <button
        className="ml-2"
        onClick={() => {
          openModal()
          // fetchedChatGptResponceToSetContext() //一旦削除
          // createOverlay(true)
          createModal()
        }}>
        <img
          className="w-7 h-7 rounded-full"
          src={pretzImage}
          alt="Some pretty cool image"
        />
      </button>

      {/* Chat GPT +文章校正に投げる */}
      <button
        className="ml-2"
        onClick={() => {
          openModal()
          fetchedKoseiDataToSetContext()
        }}>
        <img
          className="w-7 h-7 rounded-full"
          src={someCoolImage}
          alt="Some pretty cool image"
        />
      </button>
    </>
  )
}

export default PlasmoInline
