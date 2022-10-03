/* eslint-disable react/jsx-pascal-case */
import React from "react"
import { styled } from "@linaria/react"
import { mdxComponents as Mdx } from "../src/components/mdxComponents"
import { Pre } from "../src/components/mdxComponents/Pre"

import selfImage from "./images/Self.jpg"
import self2 from "./images/vt79-12.jpg"

export const StyledImage = styled.img`
  max-width: 300px;
  min-width: 230px;
  object-fit: cover;

  @media (max-width: 576px) {
    max-width: 100%;
  }
`

const StyledStreamlinedImage = styled(StyledImage)`
  float: left;
  margin: 0 0.5rem 0.5rem 0;
  max-width: 320px;
  @media (max-width: 576px) {
    float: none;
    max-width: 100%;
    margin: 0 0 0.5rem 0;
    display: block;
    width: 100%;
  }
`

export const Flex = styled.div`
  display: flex;
  align-content: stretch;
  flex-wrap: wrap;
  margin: 16px 0 32px;

  &.jc-center {
    justify-content: center;
  }

  & > .poem {
    flex: 1 1 290px;
    max-width: 460px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  & > .poem + img {
    width: auto;
  }
  @media (max-width: 576px) {
    & > .poem {
      max-width: 100%;
    }
    & > .poem + img {
      max-width: 100%;
      width: 100%;
    }
  }

  & > figure {
    text-align: center;
  }
`

export const IndexPage = () => {
  return (
    <div>
      <Mdx.h1>Cprog - о программировании вообще, в том числе на Си/Си++</Mdx.h1>

      <Mdx.p>
        Все материалы взяты с сайта{" "}
        <Mdx.a href="http://ermak.cs.nstu.ru/cprog/html/">
          http://ermak.cs.nstu.ru/cprog/html
        </Mdx.a>
      </Mdx.p>

      <Mdx.p>
        <strong>
          Здесь размещены методические материалы по дисциплинам "Информатика",
          "Программирование", "Технология программирования" для направления
          "Информатика и ВТ". Автор:{" "}
        </strong>
        <Mdx.a href="http://ciu.nstu.ru/kaf/persons/91/?page=182">
          <strong>Романов Евгений Леонидович</strong>
        </Mdx.a>
        <strong>
          , к.т.н, доц. кафедры Вычислительной техники, факультет Автоматики и
          вычислительной техники{" "}
        </strong>
        <Mdx.a href="http://www.nstu.ru/">
          <strong>
            Новосибирского государственного технического университета
          </strong>
        </Mdx.a>
        <strong> (НГТУ)</strong>
        <br />(
        <Mdx.a href="http://ermak.cs.nstu.ru/~romanow">неофициально</Mdx.a>) (
        <Mdx.a href="http://ermak.cs.nstu.ru/cprog.rar">cprog.rar</Mdx.a>)
      </Mdx.p>

      <Flex className="jc-center">
        <Pre className="poem">
          <b
            dangerouslySetInnerHTML={{
              __html:
                '"Спят подружки вредные<br/>   ' +
                " Безмятежным сном,<br/>" +
                " Снятся мышкам хлебные<br/>   " +
                " Крошки под столом,<br/>" +
                " Буратинам - досточки,<br/>   " +
                " Кошкам - караси,<br/>" +
                " Всем собакам - косточки,<br/>   " +
                ' Программистам - Си".',
            }}
          />
          <br />
          Евгений Романов.
          <br />
          "Колыбельная". <br />
          ("Болдинская осень", 1996 г.)
        </Pre>
        <StyledImage
          src={selfImage}
          width="300"
          height="300"
          alt="Фотография автора"
        />
      </Flex>

      <Mdx.p>
        <StyledStreamlinedImage
          src={self2}
          width="300"
          height="250"
          alt="Фотография автора"
        />
        <strong>Немного истории.</strong> Когда мне, новоиспеченному кандидату
        технических наук, в 1987 году было поручено чтение лекций по языку Си в
        течение одного семестра, я не думал, что это затянется так надолго.
        Поскольку я был, в первую очередь, инженер и программист, имевший опыт
        7-летний опыт программирования на Ассемблере, а язык Си был такой
        экзотической штучкой, которой владели несколько человек в НЭТИ. С тех
        пор классический Си превратился из сравнительно простого
        псевдо-ассемблера в "вавилонскую башню", которая надстраивается и
        перестраивается до сих пор.
      </Mdx.p>
    </div>
  )
}
