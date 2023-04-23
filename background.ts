// export {}
// console.log("レンダリング")

///chatGPT///////////////////////////////////////////////////////////////////////////////////////////
// const chatGPT_API_URL =
//   "https://api.openai.com/v1/engines/davinci-codex/completions"
// const your_api_key = "your_api_key"
// const prompt = "どうして地球は青いんですか？"

// async function fetchChatGPT(prompt) {
//   const response = await fetch(chatGPT_API_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${your_api_key}`
//     },
//     body: JSON.stringify({
//       prompt: prompt,
//       max_tokens: 100,
//       n: 1,
//       stop: null,
//       temperature: 1
//     })
//   })

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`)
//   }

//   const data = await response.json()
//   return data.choices[0].text.trim()
// }

// ;(async () => {
//   try {
//     const result = await fetchChatGPT(prompt)
//     console.log("ChatGPT Response:", result)
//   } catch (error) {
//     console.error("Error fetching ChatGPT:", error)
//   }
// })()

// ///yahoooo/////////////////////////////////////////////////////////////////////////////////////////
// const yahooKosei = async () => {
//   const ENDPOINT = "https://jlp.yahooapis.jp/KouseiService/V2/kousei"

//   try {
//     const data = {
//       id: "1234-1",
//       jsonrpc: "2.0",
//       method: "jlp.kouseiservice.kousei",
//       params: {
//         q: "セキュリティー,食べれる"
//       }
//     }

//     const options = {
//       headers: {
//         "Content-Type": "application/json",
//         "User-Agent":
//           "Yahoo AppID: dj00aiZpPU5vR0Z4UXFJNHFaWSZzPWNvbnN1bWVyc2VjcmV0Jng9MzE-"
//       },
//       method: "POST",
//       body: JSON.stringify(data)
//     }
//     console.log("options", options)

//     const jsonResponse = await fetch(ENDPOINT, options)
//     // console.log("jsonResponse", jsonResponse)
//     const jsonData = await jsonResponse.json()
//     console.log({
//       jsonResponse,
//       jsonData
//     })

//     return jsonData
//   } catch (error) {
//     throw new Error(error)
//   }
// }

// ;(async () => {
//   try {
//     const res = await yahooKosei()
//     console.log("res", res)
//   } catch (error) {
//     console.error("Error:", error)
//   }
// })()
// export {}

// const res = await yahooKosei()
// console.log("res", res)

// //ただのテスト
// const url = "https://api.aoikujira.com/tenki/week.php?fmt=json"

// fetch(url)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok")
//     }
//     return response.json()
//   })
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((error) => {
//     console.error("There was a problem with the fetch operation:", error)
//   })

// yahooのAPIを叩いてみる

// const BASE_URL = "https://jlp.yahooapis.jp/KouseiService/V2/kousei"
// const YAHOO_APPID = `${process.env.PLASMO_PUBLIC_YAHOO_CLIENT_ID}`

// const yahooKosei = async () => {
//   const ENDPOINT = "https://jlp.yahooapis.jp/KouseiService/V2/kousei"

//   try {
//     const data = {
//       id: "1234-1",
//       jsonrpc: "2.0",
//       method: "jlp.kouseiservice.kousei",
//       params: {
//         q: "セキュリティー,食べれる"
//       }
//     }

//     const options = {
//       headers: {
//         "Content-Type": "application/json",
//         "User-Agent":
//           "Yahoo AppID: dj00aiZpPU5vR0Z4UXFJNHFaWSZzPWNvbnN1bWVyc2VjcmV0Jng9MzE-"
//       },
//       method: "POST",
//       body: JSON.stringify(data)
//     }
//     console.log("options", options)

//     const jsonResponse = await fetch(ENDPOINT, options)
//     const jsonData = await jsonResponse.json()

//     return jsonData
//   } catch (error) {
//     throw new Error(error)
//   }
// }
// yahooKosei()
//   .then((result) => {
//     console.log("result", result)
//   })
//   .catch((error) => {
//     console.log("error", error)
//   })

// const url = "https://jlp.yahooapis.jp/KouseiService/V2/kousei"
// const method = "POST"
// const headers = {
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${process.env.PLASMO_PUBLIC_YAHOO_CLIENT_ID}` // アクセストークンを追加
//   // "User-Agent": `Yahoo AppID: ${process.env.PLASMO_PUBLIC_YAHOO_CLIENT_ID}`
// }
// console.log("headersObj", headers) // 確認のためUser-Agentヘッダーをログに出力
// const obj = {
//   id: "1234-1",
//   jsonrpc: "2.0",
//   method: "jlp.kouseiservice.kousei",
//   params: {
//     q: "セキュリティー,食べれる"
//   }
// }
// const body = JSON.stringify(obj)

// fetch(url, {
//   method,
//   headers,
//   body
// })
//   .then((response) => {
//     console.log("Status code:", response.status)
//     console.log("Status text:", response.statusText)
//     if (!response.ok) {
//       throw new Error("Network response was not ok")
//     }
//     console.log("通ってます")
//     return response.json()
//   })
//   .then((data) => {
//     console.log(data)
//   })
//   .catch((error) => {
//     console.error("There was a problem with the fetch operation:", error)
//   })

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// interface KouseiRequest {
//   id: string
//   jsonrpc: string
//   method: string
//   params: {
//     q: string
//   }
// }

// async function post(query: string): Promise<string> {
//   const requestPayload: KouseiRequest = {
//     id: "1234-1",
//     jsonrpc: "2.0",
//     method: "jlp.kouseiservice.kousei",
//     params: {
//       q: query
//     }
//   }

//   const headers = new Headers()
//   headers.append("Content-Type", "application/json")
//   headers.append("User-Agent", `Yahoo AppID: ${APPID}`)

//   const response = await fetch(URL, {
//     method: "POST",
//     headers: headers,
//     body: JSON.stringify(requestPayload)
//   })

//   const responseBody = await response.text()
//   return responseBody
// }

// ;(async () => {
//   try {
//     const response = await post("セキュリティー,食べれる")
//     console.log(response)
//   } catch (error) {
//     console.error("Error:", error)
//   }
// })()
