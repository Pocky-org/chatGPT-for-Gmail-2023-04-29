import React from "react"
import { useState } from "react"

import "../style.css"

import { sendToBackground } from "@plasmohq/messaging/"

function IndexPopup() {
  const [response, setContext] = useState("")
  const [responseChatGpt, setContextChatGpt] = useState("")

  return (
    <div className="">
      <div className="p-4 m-5 w-96 bg-white gap-y-2 rounded-lg shadow">
        <div className="font-bold py-2">Welcome To Pocky!!</div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={async () => {
            const queryOptions = { active: true, currentWindow: true }
            console.log("queryOptions: " + queryOptions)
            const [tab] = await chrome.tabs.query(queryOptions)
            console.log("popupのtab.id", tab.id)
            const res = await sendToBackground({
              name: "generateContext",
              tabId: tab.id
            })
            setContext(res)
          }}>
          generate
        </button>

        <p className="my-2">res: {response}</p>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={async () => {
            const queryOptions = { active: true, currentWindow: true }
            const [tab] = await chrome.tabs.query(queryOptions)
            const res = await sendToBackground({
              name: "generateContextWIthChatGpt",
              tabId: tab.id
            })
            setContextChatGpt(res)
          }}>
          generate chatGpt
        </button>

        <p className="mt-2">res: {responseChatGpt}</p>
      </div>
    </div>
  )
}

export default IndexPopup
