//chatGPTのAPI呼び出し
import type { PlasmoMessaging } from "@plasmohq/messaging"

export type Message = {
  role: "user" | "system" | "assistant"
  content: string
}

const apiKey = `${process.env.PLASMO_PUBLIC_OPENAI_API_KEY}`

//受信したメール文
function getRecievedGmailContext(): string {
  // const replyClass = document.getElementsByClassName("Am Al editable")
  const replyClass = document.getElementsByClassName("a3s aiL ")
  console.log("replyClass", replyClass)
  return replyClass[0].textContent
}

export const chatCompletion = async (
  messages: Message[]
): Promise<Message | undefined> => {
  const body = JSON.stringify({
    messages,
    model: "gpt-3.5-turbo"
  })
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body
  })
  const data = await res.json()
  const choice = 0
  console.log("resdata", data)
  return data.choices[choice].message
}

export type RequestResponse = string

const handler: PlasmoMessaging.MessageHandler<
  // RequestBody,
  RequestResponse
> = async (req, res) => {
  console.log("req.tabId", req.tabId)

  chrome.scripting.executeScript(
    {
      target: {
        tabId: req.tabId // the tab you want to inject into
      },
      world: "MAIN", // MAIN to access the window object
      func: getRecievedGmailContext // function to inject
    },
    async (result) => {
      console.log("Background script got callback after injection")
      console.log("getGmail", result[0].result)
      const messages: Message[] = [
        {
          role: "user",
          content: `${req.body.text} ${result[0].result}`
        }
      ]
      console.log(req.body)
      console.log("messages.content", messages[0].content)
      // result[0].resultに値が入っているので，それをchatGPTに渡す
      const response = await chatCompletion(messages)
      if (response) {
        console.log("Response from backend: ", response)
        res.send(response)
      } else {
        throw new Error(`HTTP error response`)
      }
    }
  )
}

export default handler
