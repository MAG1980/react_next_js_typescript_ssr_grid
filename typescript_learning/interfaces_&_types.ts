type coordinate = { x: number, y: number }

function print1(coords: { x: number, y: number }) {
}

//равносильно
function print2(coords: coordinate) {
}

/*Использование кастомных типов позволяет разгрузить объявление функции,
используя название кастомного типа данных*/

/*Пример объявления кастомного union-типа*/
type stringOrNumber = string | number

/*Интерфейсы работают аналогично типам*/

type point = { x: number, y: number }

//равносильно
interface IPoint {
    x: number,
    y: number
}

/*Кардинальным отличием интерфейсов от типов является возможность расширять другие интерфейсы
с помощью ключевого слова extends.*/
interface I3DPoint extends IPoint {
    z: number
}

/*interception (перехват) & для типов
является аналогом extends для интерфейсов*/
type d3Point = point & {
    z: number
}

//******************************************************
/*
Попытка добавления свойств в типы приводит к ошибке,
т.к. это равносильно повторному объявлению типа с тем же названием
*/


//Пример добавления свойств в интерфейсы
interface test {
    a: string
}

interface test {
    b: number
}

/*
Итоговый интерфейс:
interface test{
    a:string
    b:number
}
*/
//******************************************************

//Каст к типам
/*Тип может быть сконвертирован другой в тип,
который создан на его базе путём расширения.
В этом случае недостающие свойства получат значение undefined.*/

const cast = (point: IPoint) => {
    const d: I3DPoint = point as I3DPoint
}

//Каст типов можно использовать для более точного указания типа
const canvas = document.getElementById('canvas') as HTMLCanvasElement