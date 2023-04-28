import cssText from "data-text:~/src/style.css"
import type { PlasmoCSConfig } from "plasmo"
import React from "react"
import { createRoot } from "react-dom/client"

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"]
}
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

type ModalProps = {
  showFlag: boolean
  ChatGptResponse: string
}

const ResModal = (arg: ModalProps) => {
  const { showFlag, ChatGptResponse } = arg
  const display = showFlag ? "block" : "none"
  console.log({
    ChatGptResponse
  })

  // const closeModal = () => {
  //   setShowModal(false)
  // }
  return (
    <>
      <div
        style={{
          display: display,
          position: "absolute",
          width: 400,
          height: 400,
          top: "50%",
          left: "50%",
          backgroundColor: "white",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          zIndex: 2147483550,
          borderRadius: "8px"
        }}>
        {/* モーダル */}

        <div className="w-[900px] h-[500px] max-w-2xl max-h-full top-0 left-0 z-50 w-full p-4  md:inset-0 h-[calc(100%-1rem)] max-h-full absolute">
          <div id="overlay" className="bg-white rounded-lg shadow">
            <div id="modalContent">
              <div className="flex items-start justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Response modal
                </h3>
                <button
                  // onClick={closeModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                  data-modal-hide="staticModal">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>

              {/* Loading... */}
              {/* {setIsLoading && <div>Loading...</div>} */}
              {/* kosei Area */}
              {/* <div className="p-6 space-y-6">
                      {response && (
                        <p className="text-base leading-relaxed text-gray-500">
                          {response}
                        </p>
                      )}
                    </div> */}

              {/* chatGPT Area */}
              {ChatGptResponse && (
                <div className="p-6 space-y-6">
                  <p className="text-base leading-relaxed text-gray-500">
                    {ChatGptResponse}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// const container = document.createElement("my-extension-root")
// document.body.after(container)
// createRoot(container).render(<ResModal showFlag={false} />)

export default ResModal
