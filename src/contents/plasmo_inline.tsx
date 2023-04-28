import someCoolImage from "data-base64:~assets/pocky.png"
import pretzImage from "data-base64:~assets/pretz.jpeg"
import cssText from "data-text:~/src/style.css"
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import React from "react"
import { useState } from "react"
import { createRoot } from "react-dom/client"

import { sendToBackground } from "@plasmohq/messaging/"

import ResModal from "./resModal"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"]
}

/**
   * 真ん中の大きなモーダル作成
   */
function createModal(ChatGptResponse: string) {
  const container = document.createElement("div")
  document.body.after(container)
  createRoot(container).render(<ResModal showFlag={true} ChatGptResponse={ChatGptResponse} />)
}


/**
 * ボタンのアンカー
 */
export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(".gU.Up")


const PlasmoInline = () => {
  const [showModal, setShowModal] = useState(false)
  const [response, setContext] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  //校正API:
  const fetchedKoseiDataToSetContext = async (chatGptResponse: string) => {
    const tabID = await sendToBackground({
      name: "getCurrentTabID"
    })
    const res = await sendToBackground({
      name: "generateContext",
      tabId: tabID,
      body: {
        text: chatGptResponse
      }
    })
    console.log({
      'generated':res
    })
    createModal(res)
    setContext(res)
  }
  //chatGptの返答スピードが遅いので,overlayの方で管理したほうが良さそう
  const fetchedChatGptResponseToSetContext = async () => {
    setIsLoading(true)

    const tabID = await sendToBackground({
      name: "getCurrentTabID"
    })
    // console.log("tabID: ", tabID)
    // chatGPTからの返答を受け取る
    const res = await sendToBackground({
      name: "generateContextWIthChatGpt",
      tabId: tabID
    })
    setIsLoading(false)
    return res
  }

  
  return (
    <>
      {/* Chat GPTに投げる */}
      <button
        className="ml-2"
        onClick={async () => {
          openModal()
         const res =  await fetchedChatGptResponseToSetContext()
          await  fetchedKoseiDataToSetContext(res)

          // createOverlay(true)
          // createModal(ChatGptResponse)
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
        onClick={async () => {
          openModal()
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
