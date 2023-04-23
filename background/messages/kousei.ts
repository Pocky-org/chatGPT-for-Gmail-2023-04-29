import type { PlasmoMessaging } from "@plasmohq/messaging"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("req.name", req.name)
  const endpoint = `https://jlp.yahooapis.jp/KouseiService/V2/${req.name}`
  const APPID = `${process.env.PLASMO_PUBLIC_YAHOO_CLIENT_ID}`
  const data = {
    id: "1234-1",
    jsonrpc: "2.0",
    method: "jlp.kouseiservice.kousei",
    params: {
      q: "セキュリティー,食べれる"
    }
  }

  const options = {
    headers: {
      "Content-Type": "application/json",
      "User-Agent": `Yahoo AppID: ${APPID}`
    },
    method: "POST",
    body: JSON.stringify(data)
  }
  console.log("options", options)
  const yahoo = await fetch(endpoint, options)
    .then((res) => {
      res.json()
    })
    .then((json) => console.log(json))

  res.send({
    yahoo
  })
}

export default handler
