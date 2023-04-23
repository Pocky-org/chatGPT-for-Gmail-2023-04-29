//ただのテスト
// export {}
// async function callApi() {
//   const res = await fetch("https://jsonplaceholder.typicode.com/users")
//   const users = await res.json()
//   console.log(users)
// }

// callApi()

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

// const res = await yahooKosei()
// console.log("res", res)

// export {}
// yahooKosei()
// .then((result) => {
//   console.log("result", result)
// })
// .catch((error) => {
//   console.log("error", error)
// })
