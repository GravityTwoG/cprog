import React from "react"
import { mdxComponents } from "../../src/components/mdxComponents"
import sleepImg from "./sleep1.jpg"

const { Flex } = mdxComponents

export const Intro = () => (
  <Flex className="fxww flex-childs">
    <img src={sleepImg} alt="sleep" style={{ maxWidth: "340px" }} />

    <mdxComponents.pre className="tar">
      «Не умеешь работать, иди руководить.
      <br />
      Не умеешь руководить, иди учить других.
      <br />
      Не умеешь учить – пиши книгу
      <br />
      (или руководи учебным процессом)».
      <br />
      <br />
      <strong>Слегка измененное автором ходячее изречение</strong>
    </mdxComponents.pre>
  </Flex>
)
