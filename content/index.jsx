import styled from "@emotion/styled"
import React from "react"
import { Grid, Row, Col } from "react-flexbox-grid"
import { mdxComponents as MDXC } from "../src/components/mdxComponents"

const selfImage = require("./Self.jpg")

const StyledImage = styled.img`
  max-width: 100%;
  min-width: 200px;
  margin-top: 16px;
`

export const IndexPage = () => {
  return (
    <div>
      <MDXC.h1>
        CPROG - о программировании вообще, в том числе на Си/Си++
      </MDXC.h1>

      <span>
        Все материалы взяты с сайта{" "}
        <MDXC.a href="http://ermak.cs.nstu.ru/cprog/html/">
          http://ermak.cs.nstu.ru/cprog/html
        </MDXC.a>
      </span>

      <Grid fluid>
        <Row>
          <Col xs>
            <MDXC.p>
              <MDXC.pre>
                <b
                  dangerouslySetInnerHTML={{
                    __html:
                      '"Спят подружки вредные<br/>   Безмятежным сном,<br/>Снятся мышкам хлебные<br/>   Крошки под столом,<br/>Буратинам - досточки,<br/>   Кошкам - караси,<br/>Всем собакам - косточки,<br/>   Программистам - Си".',
                  }}
                />
                <div>
                  Евгений Романов.
                  <br />
                  "Колыбельная". <br />
                  ("Болдинская осень", 1996 г.)
                </div>
              </MDXC.pre>
            </MDXC.p>
          </Col>
          <Col xs>
            <StyledImage src={selfImage} alt="self" />
          </Col>
        </Row>
      </Grid>

      <MDXC.p>
        <strong>
          Здесь размещены методические материалы по дисциплинам "Информатика",
          "Программирование", "Технология программирования" для направления
          "Информатика и ВТ". Автор:{" "}
        </strong>
        <MDXC.a href="http://ciu.nstu.ru/kaf/persons/91/?page=182">
          <strong>Романов Евгений Леонидович</strong>
        </MDXC.a>
        <strong>
          , к.т.н, доц. кафедры Вычислительной техники, факультет Автоматики и
          вычислительной техники{" "}
        </strong>
        <MDXC.a href="http://www.nstu.ru/">
          <strong>
            Новосибирского государственного технического университета
          </strong>
        </MDXC.a>
        <strong> (НГТУ)</strong>
        <br />(
        <MDXC.a href="http://ermak.cs.nstu.ru/~romanow">неофициально</MDXC.a>) (
        <MDXC.a href="http://ermak.cs.nstu.ru/cprog.rar">cprog.rar</MDXC.a>)
      </MDXC.p>
    </div>
  )
}
