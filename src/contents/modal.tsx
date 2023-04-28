import cssText from "data-text:~/src/style.css"
import type { PlasmoCSConfig } from "plasmo"
import React, { useState } from "react"
import { createRoot } from "react-dom/client"

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
function changeToReadProofData(input: ReadPloofData[]) {
  const fragment = document.createDocumentFragment()

  // 各ReadPloofDataオブジェクトに対して、DOM要素を生成します。
  input.forEach((value) => {
    // div要素を作成します。
    const div = document.createElement("div")

    // word, rule, suggestionの内容をテキストノードとして追加します。
    const wordTextNode = document.createTextNode(`${value.word} `)
    const ruleTextNode = document.createTextNode(`<${value.rule}=> `)
    const suggestionTextNode = document.createTextNode(`${value.suggestion}>`)

    // div要素にテキストノードを追加します。
    div.appendChild(wordTextNode)
    div.appendChild(ruleTextNode)
    div.appendChild(suggestionTextNode)

    // フラグメントにdiv要素を追加します。
    fragment.appendChild(div)
  })

  // DOM要素を含むフラグメントを返します。
  return fragment
}

export default function Modal(arg: ModalProps) {
  const { showFlag } = arg
  const [chatGPTContext, setChatGPTContext] = useState("")
  const [proofreadContext, setProofreadContext] = useState<ReadPloofData[]>([])
  let display = showFlag ? "block" : "none"

  const closeModal = () => {
    display = "none"
  }
  return (
    <>
      <div
        style={{
          display: display,
          position: "absolute",
          border: "1px solid #ccc",
          width: "70%",
          height: "60%",
          top: "50%",
          left: "50%",
          backgroundColor: "white",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 2147483550,
          borderRadius: "8px"
        }}>
        {/* モーダル */}

        <div className="w-[900px] h-[500px] max-w-2xl top-0 left-0 z-50 p-4  md:inset-0 max-h-full absolute">
          <div id="overlay" className="bg-white rounded-lg shadow">
            <div id="modalContent">
              <div className="flex items-start justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Response modal
                </h3>
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-gray-400 bg-transparent w-5 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  data-modal-hide="staticModal">
                  ×
                </button>
              </div>
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

                  changeToReadProofData(proofreadResponse)
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
