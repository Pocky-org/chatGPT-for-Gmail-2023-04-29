// ReadProofDataList.tsx

import cssText from "data-text:~/src/style.css"
import React from "react"

export type ReadPloofData = {
  length: string
  note: string
  offset: string
  rule: string
  suggestion: string // 校正後
  word: string // 校正対象
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

type ReadProofDataListProps = {
  data: ReadPloofData[]
}

const ReadProofDataList: React.FC<ReadProofDataListProps> = ({ data = [] }) => {
  const length = data.length
  return (
    <>
      {length > 0 && (
        <div className="p-6 gap-x-2 text-base text-gray-500 border border-gray-200 rounded-lg shadow ">
          <div
            className={`${
              data.length > 0 ? "block" : "hidden"
            } mt-4 block text-sm text-gray-900 font-bold`}>
            ✅ 改善できる可能性のあるもの
          </div>
          {data.map((value, index) => (
            <div
              key={index}
              className="flex py-2 text-sm text-gray-900 font-semibold gap-x-1">
              <div className="mr-1">🟠</div>
              <div className="">{value.word}</div>
              <div>
                &lt;{value.rule}&gt;
                {value.suggestion && <span>➡︎ {value.suggestion}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ReadProofDataList
