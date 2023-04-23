import { useState } from "react"
import React from "react"

import { sendToBackground } from "@plasmohq/messaging"

function IndexPopup() {
  const [posts, setPosts] = useState([])
  const [kousei, setKousei] = useState()

  return (
    <div>
      <div
        style={{
          width: "300px",
          height: "300px"
        }}>
        <button
          onClick={async () => {
            const res = await sendToBackground({
              name: "posts"
            })
            setPosts(res.posts)
          }}>
          Get posts
        </button>

        {posts.length > 0 && (
          <div>
            {posts.map((post) => (
              <div
                key={post.id}
                style={{
                  marginTop: "20px"
                }}>
                <div>{post.title}</div>
                <div>{post.body}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* yahooooooo */}
      <div
        style={{
          width: "300px",
          height: "300px"
        }}>
        <button
          onClick={async () => {
            const res = await sendToBackground({
              name: "kousei"
            })
            setKousei(res.kousei)
          }}>
          Get Yahoo API
        </button>
        {/* 
        {posts.length > 0 && (
          <div>
            {posts.map((yahoo) => (
              <div
                key={post.id}
                style={{
                  marginTop: "20px"
                }}>
                <div>{post.title}</div>
                <div>{post.body}</div>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  )
}

export default IndexPopup

///////////////////////////////////////////////////////////////////////////////////////////
// function IndexPopup() {
//   const [inputData, setInputData] = useState<string>("")
//   const [resFromChatGPT, setResFromChatGPT] = useState<string | null>(null)

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputData(e.target.value)
//   }
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     try {
//       const response = await axios.post(
//         "https://api.openai.com/v1/engines/davinci-codex/completions",
//         {
//           prompt: inputData,
//           max_tokens: 50,
//           n: 1,
//           stop: null,
//           temperature: 0.5
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.PLASMO_PUBLIC_OPENAI_API_KEY}`
//           }
//         }
//       )
//       const responseData = response.data.choices.text
//       // const responseData = response.data.choices[0].text.trim()
//       setResFromChatGPT(responseData)
//     } catch (error) {
//       console.error("Error fetching data from ChatGPT API:", error.toString())
//       console.error("Error fetch !")
//     }
//   }

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         padding: 16
//       }}>
//       <h2>
//         Welcome to your{" "}
//         <a href="https://www.plasmo.com" target="_blank">
//           Plasmo
//         </a>{" "}
//         Extension!
//       </h2>
//       {/* <p>Ship name: {process.env.PLASMO_PUBLIC_SHIP_NAME}</p> */}

//       <input
//         onChange={handleChange}
//         value={inputData}
//         type="text"
//         placeholder="文字を入力してください"
//       />
//       {/* <div>{inputData}</div> */}
//       <button onClick={handleSubmit}>Submit</button>

//       <a href="https://docs.plasmo.com" target="_blank">
//         View Docs
//       </a>
//     </div>
//   )
// }
