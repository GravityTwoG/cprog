import { styled } from "@linaria/react"
import React from "react"
import { mdxComponents as MDXC } from "../src/components/mdxComponents"

const selfImage = require("./images/Self.jpg")
const self2 = require("./images/vt79-12.jpg")
const pdp8 = require("./images/lera.jpg")

const StyledImage = styled.img`
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

const Flex = styled.div`
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
      <MDXC.h1>
        CPROG - о программировании вообще, в том числе на Си/Си++
      </MDXC.h1>

      <MDXC.p>
        Все материалы взяты с сайта{" "}
        <MDXC.a href="http://ermak.cs.nstu.ru/cprog/html/">
          http://ermak.cs.nstu.ru/cprog/html
        </MDXC.a>
      </MDXC.p>

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

      <Flex className="jc-center">
        <MDXC.pre className="poem">
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
        </MDXC.pre>
        <StyledImage src={selfImage} width="300" alt="self" />
      </Flex>

      <MDXC.p>
        <StyledStreamlinedImage src={self2} width="300" alt="self" />
        <strong>Немного истории.</strong> Когда мне, новоиспеченному кандидату
        технических наук, в 1987 году было поручено чтение лекций по языку Си в
        течение одного семестра, я не думал, что это затянется так надолго.
        Поскольку я был, в первую очередь, инженер и программист, имевший опыт
        7-летний опыт программирования на Ассемблере, а язык Си был такой
        экзотической штучкой, которой владели несколько человек в НЭТИ. С тех
        пор классический Си превратился из сравнительно простого
        псевдо-ассемблера в "вавилонскую башню", которая надстраивается и
        перестраивается до сих пор.
      </MDXC.p>

      <MDXC.p>
        <strong>Еще раньше.</strong> Кафедра ВТ НГТУ (НЭТИ), 1979 год,
        12-разрядная мини-ЭВМ 'Электроника-100И' (аналог первой американской
        мини-ЭВМ PDP-8), тактовая частота - 1Мгц, память - 4Кб. На пульте
        процессора по адресу 1142 команда с кодом 5341 (JMP.-1) - безусловный
        переход на одну команду назад на текущей странице (128 слов) к команде
        опроса готовности клавиатуры пишущей машинки. За пультом - ваш покорный
        слуга (автор сайта) и мне всего 20. Несколько раньше с подобного компа
        начинал широко известный в определенных кругах Билл Гейтс.
      </MDXC.p>

      <MDXC.p>
        <strong>Билл Гейтс. "Дорога в будущее":</strong>
        <br />
        Правда, и в то время (речь идет о 1968-70 годах) можно было завести
        собственный компьютер. Если Вы могли раскошелиться на 18000 долларов,
        пожалуйста - Digital Equipment Corporation (DEC) выпускала PDP-8. Хотя
        эту модель и называли "мини-компьютером", по нынешним стандартам, она
        была весьма громоздкой. Компьютер размещался на двухметровой стойке
        (площадь ее основания около половины квадратного метра), а весил 120
        килограммов. Одно время такой компьютер стоял у нас в школе, и я часто
        вертелся вокруг него. По сравнению с мэйнфреймами, с которыми легко было
        связаться по телефону, PDP-8 обладал весьма ограниченными возможностями:
        его вычислительная мощность меньше, чем у некоторых современных наручных
        часов. Но программировать их можно было так же, как и самые большие и
        дорогостоящие ЭВМ. Несмотря на все свои ограничения, PDP-8 вселял в нас
        надежду, что когда-нибудь собственные дешевые компьютеры появятся у
        миллионов людей, и с каждым годом эта вера во мне укреплялась. Вероятно,
        одна из причин - желание самому иметь персональный компьютер. ...Мы с
        Полом заинтересовались, какие программы можно сделать на 8008
        микропроцессоре. Пол связался с Intel и попросил выслать документацию.
        Слегка удивившись, когда ее действительно прислали, мы с головой
        зарылись в нее. Я разработал версию Бейсика, "ходившую" на DEC PDP-8, и
        думал, что мне удастся сделать то же самое и для крошечного чипа фирмы
        Intel. Но, изучая документацию, понял, что не стоит и пытаться. Слишком
        он прост, слишком мало в нем транзисторов.
      </MDXC.p>

      <Flex className="jc-center">
        <figure>
          <StyledImage
            src={pdp8}
            alt="PDP-8"
            loading="lazy"
            style={{ marginBottom: "4px" }}
          />
          <figcaption>
            А это та же самая PDP-8, но в другом ракурсе...
          </figcaption>
        </figure>
      </Flex>
    </div>
  )
}
