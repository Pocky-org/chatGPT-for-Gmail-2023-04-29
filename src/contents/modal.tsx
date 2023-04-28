import { sendToBackground } from '@plasmohq/messaging'
import cssText from "data-text:~/src/style.css"
import type { PlasmoCSConfig } from "plasmo"
import React, { useState } from "react"
import { createRoot } from "react-dom/client"

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"]
}


type ModalProps ={
  showFlag: boolean
  // ChatGptResponse: string
}

export default function Modal(arg : ModalProps) {
  const { showFlag } = arg
  const [chatGPTContext, setChatGPTContext] = useState('')
  const [proofreadContext, setProofreadContext] = useState('')
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
          height: '60%',
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
                  {/* <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"></path>
                  </svg> */}
                </button>
              </div>
              <button onClick={async()=>{
                const chatGptResponse = await fetchedChatGptFromContext()
                setChatGPTContext(chatGptResponse.content)
                console.log({
                  chatGptResponse,
                })
              }}>
                chatGPTのfetch
              </button>
              <div className=' w-[600px]'>
                {chatGPTContext && (
                        <textarea
                        cols={40}
                        rows={10}
                        className=" w-full overflow-y-auto p-4 block space-y-6 text-base leading-relaxed text-gray-500"
                        value={chatGPTContext}
                        onChange={event => setChatGPTContext(event.target.value)}
                        />
                      )}
              </div>
              <button onClick={async()=>{
                const proofreadResponse = await fetchedProofreadFromContext(chatGPTContext)
                setProofreadContext(proofreadResponse)
                console.log({
                  chatGPTContext,
                  proofreadResponse
                })
              }}>
                校正する
              </button>
              {proofreadContext && (
                      <p className=" h-60 overflow-y-auto p-6 space-y-6 text-base leading-relaxed text-gray-500">
                          {proofreadContext}
                      </p>
                    )}

              <button onClick={()=>{
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

function insertContext(context: string){
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

async function fetchedProofreadFromContext (chatGptResponse: string):Promise<string> {
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
  return res
}
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}