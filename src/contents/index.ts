// content_script.js
// console.log("This is content script")

const example = [
  {
    length: "1",
    note: "",
    offset: "48",
    rule: "用語言い換え",
    suggestion: "円",
    word: "\\"
  },
  {
    length: "4",
    note: "",
    offset: "8",
    rule: "ら抜き",
    suggestion: "食べられる",
    word: "食べれる"
  }
]

export type ReadPloofData = {
  length: string
  note: string
  offset: string
  rule: string
  suggestion: string
  word: string
}

function changeToReadProofData(input: ReadPloofData[]) {
  input.map((value) => {
    console.log(value.word, `<${value.rule}=> ${value.suggestion}>`)
  })
}

changeToReadProofData(example)

export {}
