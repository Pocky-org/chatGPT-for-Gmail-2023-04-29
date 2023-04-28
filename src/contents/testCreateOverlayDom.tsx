import type { PlasmoCSConfig } from "plasmo"
import React from "react"
import { createRoot } from "react-dom/client"

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"]
}

const Main = ({
  translatedText,
  originalText,
  targetLang,
  showModal
}: {
  translatedText: string
  originalText: string
  targetLang: string
  showModal: boolean
}) => {
  const display = showModal ? "block" : "none"
  return (
    <>
      <div
        style={{
          display: display,
          position: "absolute",
          width: "100%",
          left: "0px",
          top: "0px",
          zIndex: 2147483550
        }}>
        <div
          style={{
            position: "absolute",
            left: "10px", // 自由に変えて良い
            top: "10px", // 自由に変えて良い
            zIndex: 2147483550
          }}>
          <div>{translatedText}</div>
          <div>{originalText}</div>
          <div>{targetLang}</div>
        </div>
      </div>
    </>
  )
}

const container = document.createElement("my-extension-root")
document.body.after(container)
createRoot(container).render(
  <Main
    translatedText={"ここに翻訳したテキストが入る"}
    originalText={"ここに翻訳前のテキストが入る"}
    targetLang={"JA"}
    showModal={false}
  />
)

export default Main
