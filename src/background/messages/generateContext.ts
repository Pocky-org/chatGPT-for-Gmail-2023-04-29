import type { PlasmoMessaging } from "@plasmohq/messaging"

// export type RequestBody = {
//   getGmail: () => string
// }

async function doProofreading(result, res) {
  console.log({
    chatGPT: result.text.text,
    result,
    res
  })
  try {
    const response = await fetch("http://localhost:8888/api/process-input", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        input: result.text
      })
    })
    console.log({
      afterKosei: response
    })
    if (response.ok) {
      const responseData = await response.json()
      console.log("Response from backend:", responseData)
      res.send(JSON.stringify(responseData.result.suggestions))
    } else {
      throw new Error(`HTTP error ${response.status}`)
    }
  } catch (err) {
    console.error("Error sending request to backend:", err)
    res.send("Error: " + err.message)
  }
}
export type RequestResponse = string

const handler: PlasmoMessaging.MessageHandler<
  // RequestBody,
  RequestResponse
> = async (req, res) => {
  const { tabId, body } = req
  chrome.scripting.executeScript(
    {
      target: {
        tabId: tabId // the tab you want to inject into
      },
      world: "MAIN", // MAIN to access the window object
      func: getGmailContext // function to inject
    },
    async (result) => {
      console.log("Background script got callback after injection")
      console.log("getGmail", body)
      // result[0].resultに値が入っているので，それを校正に渡す

      doProofreading(body, res)
    }
  )
}

function getGmailContext(): string {
  const replyClass = document.getElementsByClassName("Am Al editable")
  console.log("replyClass", replyClass)
  return replyClass[0].textContent
}

export default handler
