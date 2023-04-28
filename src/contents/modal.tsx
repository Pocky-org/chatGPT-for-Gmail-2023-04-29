import cssText from "data-text:~/src/style.css"
import type { PlasmoCSConfig } from "plasmo"
import React, { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import ReadProofDataList from "./ReadProofDataList"

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"]
}

type ModalProps = {
  showFlag: boolean
  // ChatGptResponse: string
}

export type ReadPloofData = {
  length: string
  note: string
  offset: string
  rule: string
  suggestion: string
  word: string
}

export default function Modal(arg: ModalProps) {
  const { showFlag } = arg
  const [chatGPTContext, setChatGPTContext] = useState("")
  const [proofreadContext, setProofreadContext] = useState<ReadPloofData[]>([])
  let display = showFlag ? "block" : "none"

  const closeModal = () => {
    const container = document.getElementById("chatGPT-for-Gmail")
    container.remove()
  }

  {
    /* <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"></path>
  </svg> */
  }
  return (
    <>
      <div
        style={{
          display: display,
          position: "absolute",
          border: "1px solid #ccc",
          width: "600px",
          height: "400px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          zIndex: 1000,
          padding: "24px",
          borderRadius: "8px"
        }}>
        <div className=" w-full">
          <div className=" w-full flex items-center justify-between">
            <div className="text-xl font-semibold text-gray-900">
              Response modal
            </div>
            <button
              onClick={closeModal}
              className="text-gray-400 flex justify-end bg-transparent w-5 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
              data-modal-hide="staticModal">
              ×
            </button>
          </div>
          <div id="overlay" className="bg-white rounded-lg shadow">
            <div id="modalContent">
              <button
                onClick={async () => {
                  const chatGptResponse = await fetchedChatGptFromContext()
                  setChatGPTContext(chatGptResponse.content)
                  console.log({
                    chatGptResponse
                  })
                }}>
                chatGPTのfetch
              </button>
              <div className=" w-[600px]">
                {chatGPTContext && (
                  <textarea
                    cols={40}
                    rows={10}
                    className=" w-full overflow-y-auto p-4 block space-y-6 text-base leading-relaxed text-gray-500"
                    value={chatGPTContext}
                    onChange={(event) => setChatGPTContext(event.target.value)}
                  />
                )}
              </div>
              <button
                onClick={async () => {
                  const proofreadResponse = await fetchedProofreadFromContext(
                    chatGPTContext
                  )

                  setProofreadContext(proofreadResponse)
                  console.log({
                    chatGPTContext,
                    proofreadResponse
                  })
                }}>
                校正する
              </button>
              {proofreadContext && (
                <ReadProofDataList data={proofreadContext} />
              )}

              <button
                onClick={() => {
                  insertContext(chatGPTContext)
                }}>
                insert
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function insertContext(context: string) {
  const replyClass = document.getElementsByClassName("Am Al editable")
  replyClass[0].textContent = context
}

/**
 * ChatGPTからの返答を受け取る
 */
async function fetchedChatGptFromContext() {
  const tabID = await sendToBackground({
    name: "getCurrentTabID"
  })
  // chatGPTからの返答を受け取る
  const res = await sendToBackground({
    name: "generateContextWIthChatGpt",
    tabId: tabID
  })
  return res
}

async function fetchedProofreadFromContext(
  chatGptResponse: string
): Promise<ReadPloofData[]> {
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
    generated: res
  })
  return JSON.parse(res)
}
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}
