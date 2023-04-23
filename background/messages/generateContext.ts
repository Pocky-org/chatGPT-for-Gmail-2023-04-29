import axios from "axios"

import type { PlasmoMessaging } from "@plasmohq/messaging"

// export type RequestBody = {
//   getGmail: () => string
// }

function getGmailContext(): string {
  const replyClass = document.getElementsByClassName("Am Al editable")
  console.log("replyClass", replyClass)
  return replyClass[0].textContent
}

export type RequestResponse = string

const handler: PlasmoMessaging.MessageHandler<
  // RequestBody,
  RequestResponse
> = async (req, res) => {
  chrome.scripting.executeScript(
    {
      target: {
        tabId: req.tabId // the tab you want to inject into
      },
      world: "MAIN", // MAIN to access the window object
      func: getGmailContext // function to inject
    },
    async (result) => {
      console.log("Background script got callback after injection")
      console.log("getGmail", result[0].result)
      // result[0].resultに値が入っているので，それを校正に渡す
      try {
        const response = await fetch(
          "http://localhost:8080/api/process-input",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              input: result[0].result
            })
          }
        )
        if (response.ok) {
          const responseData = await response.json()
          console.log("Response from backend:", responseData)
          res.send("backendRes" + responseData)
        } else {
          throw new Error(`HTTP error ${response.status}`)
        }
      } catch (err) {
        console.error("Error sending request to backend:", err)
        res.send("Error: " + err.message)
      }
    }
  )
}

export default handler
