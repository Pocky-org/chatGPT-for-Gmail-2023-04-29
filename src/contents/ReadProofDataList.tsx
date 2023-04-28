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
  return (
    <div className="h-60 overflow-y-auto p-6 space-y-6 text-base text-gray-500 flex">
      {data.map((value, index) => (
        <div key={index}>
          <div>{value.word}</div>
          <div>
            &lt;{value.rule}&gt;= {value.suggestion}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ReadProofDataList
