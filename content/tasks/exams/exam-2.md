---
title: 'Программирование  (семестр 2)'
metaDescription: 'Программирование  (семестр 2)'
metaTitle: 'Программирование  (семестр 2)'
---

## Экзаменационные вопросы (10 баллов)

1. Тип данных и переменная. Базовые и производные типы данных. Иерархия определений типов данных и вложенности компонент переменных. Контекстный способ определения типа данных в Си. Абстрактный тип данных. Спецификация typedef .

2. Модульная организация программы. Время жизни и область действия переменных. Классификация. Определение и объявление переменных. Внешние, автоматические и статические переменные. Область действия функций. Внешние и статические функции.

3. Модульное программирование. Статическое связывание. Библиотеки. Заголовочные файлы, их назначение и содержание. Файл проекта в классическом программировании.

4. Указатели. Указатель как элемент архитектуры компьютера. Синтаксис указателя в Си. Указатель и ссылка. Передача формальных параметров и результата по значению и по ссылке.

5. Адресная арифметика. Указатели и массивы. Способы работы через указатель с массивом.      

6. Динамическая память. Динамические переменные и массивы. Операторы и функции управления динамической памятью.

7. Массивы указателей. Способы формирования массивов указателей - статические, динамические, смешанные. Работа с массивами указателей.

10. Списки. Определение элемента списка. Способы формирования списков. Односвязные списки.   Двусвязные (циклические) списки.

11. Рекурсия. Рекурсивная структура данных и функция. Реализация рекурсивных функций, роль стека. Инвариант рекурсивной функции. Особенности разработки рекурсивных алгоритмов. Смысл локальных и глобальных переменных, формальных и фактических параметров в рекурсивной функции. Способы накопления результата.

12. Рекурсивные алгоритмы сортировки, трудоемкость.

13. Рекурсивные алгоритмы комбинаторного перебора.

14. Рекурсивные поисковые алгоритмы. Сокращение пространства перебора. Жадные алгоритмы. На примере алгоритма раскраски карты.

15. Деревья. Способы представления деревьев. Полный рекурсивный обход дерева (для всех способов представления).Алгоритмы, основанные на полном рекурсивном обходе дерева.

16. Двоичное дерево. Основные характеристики и алгоритмы. Балансировка дерева.

17.  Дерево, упорядоченное по вертикали. Пирамидальная сортировка.

18. Указатель на функцию. Его определение в языке и назначение. Указатель на функцию - формальный параметр. Динамическое связывание. Пример - численное интегрирование.

19. Файл. Двоичный и текстовый файл. Запись. Последовательный и произвольный доступ. Текстовый файл. Позиционирование в текстовом файле. Пример - создание "закладок" в файле.

20. Двоичный файл (ДФ). Физическая модель двоичного файла. Шестнадцатеричный дамп. Функции работы с ДФ, чтение, запись, позиционирование.

21. Последовательный двоичный файл. Понятие формата. Пример: сохранение и загрузка дерева в последовательный ДФ.

22. ДФ произвольного доступа. Распределение памяти в двоичном файле. Файлы записей фиксированной и переменной длины.    

23. Указатель в ДФ (абсолютный адрес и смещение). Использование указателей в ДФ на примере массива файловых указателей.


## Экзаменационные задачи (25 баллов)

Задачу реализовать в виде функции, получающей все данные через параметры. Все структуры данных - динамические.

>Замечания по выполняемым операциям. Объединение - результат содержит элементы из двух исходных структур данных (СД), элемент, присутствующий в обеих СД, включается в одном экземпляре. Пересечение - результат содержит элементы, одновременно присутствующие в обеих структурах данных. Разность - результат содержит элементы из первой СД, которые отсутствуют во второй.

1. Объединение двух динамических массивов указателей (ДМУ).

2. Пересечение двух динамических массивов указателей.

3. Разность двух динамических массивов указателей.

4. Объединение двух односвязных списков.

5. Пересечение двух односвязных списков.

6. Разность двух односвязных списков.

7. Объединение двух двусвязных списков.

8. Пересечение двух двусвязных списков.

9. Разность двух двусвязных списков.

10. Объединение двух циклических списков.

11. Пересечение двух циклических списков.

12. Разность двух циклических списков.

13. Сортировка односвязного списка выбором.

14. Сортировка односвязного списка вставками.

15. Сортировка двусвязного списка выбором.

16. Сортировка двусвязного списка вставками.

17. Сортировка циклического списка выбором.

18. Сортировка циклического списка вставками.

19. Элемент односвязного списка содержит массив указателей на строки. Функция создает структуру данных, читает из файла строки и заполняет ее, пока файл не кончится. (В конце последнего МУ записывается NULL-указатель).

20. Элемент двусвязного списка содержит массив указателей на строки. Функция создает структуру данных, читает из файла строки и заполняет ее, пока файл не кончится.(В конце последнего МУ записывается NULL-указатель).

21. Элемент циклического списка содержит массив указателей на строки. Функция создает структуру данных, читает из файла строки и заполняет ее, пока файл не кончится.(В конце последнего МУ записывается NULL-указатель).

22. Элемент односвязного списка содержит заголовок односвязного списка (двухуровневый список). Функция создает структуру данных, читает из файла строки и заполняет ее, пока файл не кончится. (длина списка нижнего уровня задана параметром).

23. Двухуровневый массив указателей на строки. Функция создает структуру данных, читает из файла строки и заполняет ее, пока файл не кончится. В конце каждого неполного МУ записывается NULL-указатель в качестве ограничителя.

24. Дерево со списком потомков.  Вершина дерева содержит указатель на строку. Полный рекурсивный обход дерева с сохранением адресов строк в динамическом массиве указателей.

25. Дерево со списком потомков.  Поиск вершины с максимальным количеством прямых потомков (результат - указатель на вершину).

26. Дерево с массивом указателей на потомков.  Вершина дерева содержит указатель на строку. Полный рекурсивный обход дерева с сохранением строк в динамическом массиве указателей.

27. Дерево с массивом указателей на потомков.   Поиск вершины с максимальным количеством прямых потомков (результат - указатель на вершину).

28. Дерево с массивом указателей на потомков.   Поиск ближайшей вершины со свободным местом (в МУ потомков есть свободное место) (результат - указатель на вершину).

29. Дерево с массивом указателей на потомков.   Поиск вершины, наиболее удаленной от корня (результат - указатель на вершину).

30. Двоичное дерево в массиве с вычисляемыми адресами потомков. Включение значения в двоичное дерево.

## Тестовые задания (по 3 балла за тест, но не более 10)

Содержательно сформулировать результат теста, прокомментировать отдельные действия, записать пример вызова функции на статических данных и ожидаемый результат.