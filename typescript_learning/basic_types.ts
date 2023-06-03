const a: number = 5
const d: string[] = ['adf', 'xccv', 'sdf']

function basic_types(a: string): string | number {
    return ''
}

const test2 = (a: number): number => {
    return 2 * a
}

d.map((x): string => x.toLowerCase())

/*Параметр coords должен быть объектом,
* имеющим обязательное свойство latitude:number
* и необязательное свойство longitude?:number*/
function countCoord(coords: { latitude: number, longitude?: number }) {
    return
}

//Примеры работы с union-types
function printIt(id: number | string) {
    if (typeof id === 'number') {
        console.log(id.toString())
    } else if (typeof id === 'string') {
        id.toUpperCase()
    }
}

function getSum(a: number | number[]) {
    if (Array.isArray(a)) {
        a = a.reduce((accumulator, item) => {
            return accumulator + item
        })
    }
    return 10 + a
}

console.log(getSum([7,9,1]))

//Функции, которые не возвращают данных, возвращают тип данных void
function returnVoid():void{
    return
}

const x: undefined = undefined
const z: null = null