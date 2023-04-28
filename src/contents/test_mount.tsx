import cssText from "data-text:~/src/style.css"
import type { PlasmoCSConfig, PlasmoGetOverlayAnchor } from "plasmo"
import React from "react"

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"]
}
export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
  document.body

const PlasmoPricingExtra = (props) => {
  const { showFlag, setShowModal, response, ChatGptResponce, setIsLoading } =
    props
  const closeModal = () => {
    setShowModal(false)
  }
  return (
    <>
      {showFlag ? (
        <div className="top-0 bottom-0 right-0 left-0 flex absolute w-screen h-screen flex justify-center items-center">
          <div className="z-50 bg-white w-[700px] h-[400px] flex justify-center items-center bg-white rounded-lg shadow fixed">
            <div id="modalContent">
              {/* header */}
              <div className="flex items-start justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Response modal
                </h3>
                <button
                  onClick={closeModal}
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
              {/* content */}
              {/* Loading... */}
              {setIsLoading && <div>Loading...</div>}
              {/* kosei Area */}
              <div className="p-6 space-y-6">
                {response && (
                  <p className="text-base leading-relaxed text-gray-500">
                    {response}
                  </p>
                )}
              </div>

              {/* chatGPT Area */}
              {ChatGptResponce && (
                <div className="p-6 space-y-6">
                  <p className="text-base leading-relaxed text-gray-500">
                    {ChatGptResponce}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default PlasmoPricingExtra
