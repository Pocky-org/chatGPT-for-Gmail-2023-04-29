import cssText from "data-text:~/src/style.css"
import type { PlasmoCSConfig } from "plasmo"
import React, { useEffect, useRef, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

import ReadProofDataList from "./ReadProofDataList"
import AlertSecuritySection from "./alertSecuritySection"

export const config: PlasmoCSConfig = {
  matches: ["https://mail.google.com/*"]
}

type ModalProps = {
  showFlag: boolean
  closeModal: () => void
}

export type ReadPloofData = {
  length: string
  note: string
  offset: string
  rule: string
  suggestion: string
  word: string
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export default function Modal(arg: ModalProps) {
  const { showFlag, closeModal } = arg

  const [emailContext, setEmailContext] = useState("")
  const [emailResRequest, setEmailResRequest] = useState(
    "このメールに対する返答を書いてください。"
  )
  const [chatGPTContext, setChatGPTContext] = useState("")
  const [proofreadContext, setProofreadContext] = useState<ReadPloofData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false)
  const [isClickedProofread, setIsClickedProofread] = useState<boolean>(false)

  const scrollBottomRef = useRef(null)
  /**
   * 初回レンダリングのみ
   */
  useEffect(() => {
    ;(async () => {
      const context = await getContext()
      setEmailContext(context)
      const showAlertFlag = hasEmailContentPersonalInfo(context)
      setIsShowAlert(showAlertFlag)
    })()
  }, [])
  const textareaRef = useRef(null)
  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  return (
    <>
      <div
        className={`${
          showFlag ? "block" : "hidden"
        } fixed top-[55%] overflow-y-auto left-[58%] border border-gray-200 transform
        -translate-x-1/2 -translate-y-1/2  w-[55%] lg:w-[65%] min-w-[50%]  h-auto max-h-[70%]  bg-white z-[1000]  p-6 rounded-lg shadow-2xl`}>
        <div className="w-full">
          <div className="w-full flex items-center justify-between">
            {/* タイトル */}
            <div className="flex items-end font-bold tracking-tight text-[#2FAF9C]">
              <p className=" text-lg">Mail Butler</p>
              <p className=" ml-1 text-base">
                - write email with AI and get proofread
              </p>
            </div>
            {/* 閉じるボタン */}
            <button
              onClick={closeModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal">
              <svg
                aria-hidden="true"
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
          <div id="overlay">
            <div id="modalContent" className="gap-y-2 grid">
              {/* メール内容 */}
              {emailContext && (
                <div>
                  <div className="text-sm  text-[#666]">対象メール</div>
                  <AlertSecuritySection isShowAlert={isShowAlert} />
                  <div>
                    <textarea
                      rows={4}
                      className="font-medium w-full overflow-y-auto block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      value={emailContext}
                      onChange={(event) => setEmailContext(event.target.value)}
                    />
                  </div>
                </div>
              )}
              {/* 返信内容 */}
              <div>
                <div className="mt-2 block text-sm text-[#666]">
                  {emailContext ? (
                    // 返信
                    <p>返答する内容の趣旨を記述してください。</p>
                  ) : (
                    // 新規
                    <p>送信する内容の趣旨を記述してください。</p>
                  )}
                </div>
                {/* 返信prompt作成部分&ChatGPTgetchボタン */}
                <div className="w-full flex items-center h-[45px]">
                  <div className="w-full">
                    <textarea
                      ref={textareaRef}
                      rows={1}
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                      value={emailResRequest}
                      onChange={(event) =>
                        setEmailResRequest(event.target.value)
                      }
                    />
                  </div>
                  <div className="max-w-[15%]">
                    {isLoading ? (
                      <button
                        disabled
                        className="ml-1 px-4 py-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline w-4 h-4 mr-[2px] text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                        <p className=" whitespace-nowrap font-medium text-xs text-white">
                          取得中...
                        </p>
                      </button>
                    ) : (
                      <button
                        className="ml-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg  px-4 py-2 focus:outline-none"
                        onClick={async () => {
                          setIsLoading(true)
                          const chatGptResponse =
                            await fetchedChatGptFromContext(
                              emailContext,
                              emailResRequest
                            )
                          setChatGPTContext(chatGptResponse)
                          setIsLoading(false)
                          setTimeout(() => {
                            scrollBottomRef?.current?.scrollIntoView()
                          }, 500)
                        }}>
                        <p className=" whitespace-nowrap text-xs font-medium">
                          返信を生成
                        </p>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {chatGPTContext && (
                <div className="mt-2">
                  <div>
                    <p className="block text-sm text-[#444]">
                      返信内容（編集可）
                    </p>
                    <textarea
                      rows={10}
                      className="font-medium w-full overflow-y-auto  block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      value={chatGPTContext}
                      onChange={(event) =>
                        setChatGPTContext(event.target.value)
                      }
                    />
                  </div>
                  <div className=" mt-1 flex justify-end items-end text-sm">
                    <button
                      className="w-[15%] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-4 py-2 focus:outline-none"
                      onClick={async () => {
                        const proofreadResponse =
                          await fetchedProofreadFromContext(chatGPTContext)
                        setProofreadContext(proofreadResponse)
                        setIsClickedProofread(true)
                        setTimeout(() => {
                          scrollBottomRef?.current?.scrollIntoView()
                        }, 500)
                      }}>
                      校正する
                    </button>
                    <button
                      className="w-[15%] ml-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-4 py-2 focus:outline-none"
                      onClick={() => {
                        insertContext(chatGPTContext)
                        closeModal()
                      }}>
                      挿入する
                    </button>
                  </div>
                </div>
              )}

              {isClickedProofread ? (
                <div>
                  {proofreadContext.length ? (
                    <div>
                      <ReadProofDataList data={proofreadContext} />
                    </div>
                  ) : (
                    <p className=" text-base">
                      校正すべき箇所はありませんでした。挿入してみましょう！
                    </p>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div ref={scrollBottomRef} />
        </div>
      </div>
    </>
  )
}

function insertContext(context: string) {
  const replyClass = document.getElementsByClassName("Am Al editable")
  replyClass[0].innerHTML = context.replace(/\n/g, "<br>")
}

/**
 * 最初にメールの内容を取得
 */
async function getContext() {
  const tabID = await fetchedContextTabID()
  const contextData = getRecievedGmailContext()
  console.log({ contextData })
  return contextData
}

/**
 * メールの内容を含んだtabIDを返す
 */
async function fetchedContextTabID() {
  const tabID = await sendToBackground({
    name: "getCurrentTabID"
  })
  return tabID
}

/**
 *メールの内容を取得する
 */
function getRecievedGmailContext(): string {
  const replyClass = document.getElementsByClassName("a3s aiL ")
  const result = removeMessagePart(replyClass)
  console.log("result", result)
  return result
}

/**
 *メールで不要な部分を削除する
 */
const removeMessagePart = (input) => {
  //最初の改行を削除
  const email = input[0].textContent.replace(/^\n+/g, "")
  //最後の不要な文を削除
  const messageToRemove =
    /\.{3}\[メッセージの一部が表示されています\]\s{1,}メッセージ全体を表示/
  return email.replace(messageToRemove, "")
}
/**
 * メールのセキュリティチェック
 */
function hasEmailContentPersonalInfo(input: string): boolean {
  // emailContextの中にメールや電話番号が入っているかどうかをチェックする
  // メールアドレスの正規表現
  const emailRegex = /\S+@\S+\.\S+/

  // 電話番号の正規表現 (この例では、国際電話番号も含まれます)
  const phoneRegex =
    /(\+\d{1,3}[-\.\s]?)?\(?\d{1,4}\)?[-\.\s]?\d{1,4}[-\.\s]?\d{1,9}/

  // 文字列にメールアドレスまたは電話番号が含まれているかどうかをチェック
  return emailRegex.test(input) || phoneRegex.test(input)
}

/**
 * ChatGPTからの返答を受け取る
 */
async function fetchedChatGptFromContext(
  emailContext: string,
  emailResRequest: string
) {
  const tabID = await sendToBackground({
    name: "getCurrentTabID"
  })
  // chatGPTからの返答を受け取る
  const res = await sendToBackground({
    name: "generateContextWIthChatGpt",
    tabId: tabID,
    body: {
      email: emailContext,
      request: emailResRequest
    }
  })
  return res
}

async function fetchedProofreadFromContext(
  chatGptResponse: string
): Promise<ReadPloofData[]> {
  const tabID = await sendToBackground({
    name: "getCurrentTabID"
  })
  const res = await sendToBackground({
    name: "generateContext",
    tabId: tabID,
    body: {
      text: chatGptResponse
    }
  })
  return JSON.parse(res)
}
