import React from "react"
import { useState } from "react"

import { sendToBackground } from "@plasmohq/messaging/"

function IndexPopup() {
  const [response, setContext] = useState("")

  return (
    <div>
      <button
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

      <p>res: {response}</p>
    </div>
  )
}

export default IndexPopup
