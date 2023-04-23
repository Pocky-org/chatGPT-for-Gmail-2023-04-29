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
    (result) => {
      console.log("Background script got callback after injection")
      console.log("getGmail", result[0].result)
      // result[0].resultに値が入っているので，それを校正に渡す
      res.send("backendRes" + result[0].result)
      return result
    }
  )
}

export default handler
